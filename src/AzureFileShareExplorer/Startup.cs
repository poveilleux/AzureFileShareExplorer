using AzureFileShareExplorer.Authorization;
using AzureFileShareExplorer.Extensions;
using AzureFileShareExplorer.Services;
using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AzureFileShareExplorer
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;

            // Display PII when debugging.
            IdentityModelEventSource.ShowPII = Debugger.IsAttached;

            // Does not apply claim mappings.
            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IStartupFilter, ConfigurationValidator>();

            services.ConfigureAndValidate<StorageSettings>(_configuration, StorageSettings.Name);
            services.ConfigureAndValidate<AuthorizationSettings>(_configuration, AuthorizationSettings.Name);
            services.ConfigureAndValidate<OpenIdConnectSettings>(_configuration, OpenIdConnectSettings.Name);

            AddAuthenticationServices(services);
            services.AddAuthorization(options =>
                {
                    options.DefaultPolicy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .AddRequirements(new HasClaimRequirement())
                        .Build();
                })
                .AddTransient<IAuthorizationHandler, HasClaimHandler>();

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddHealthChecks()
                .AddCheck<FileShareHealthCheck>("file_share_check");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder rootApp)
        {
            var applicationPath = _configuration.GetValue<string>(ValueSettings.ApplicationPath);
            rootApp.Map(applicationPath, app =>
            {
                app.UseForwardedHeaders(new ForwardedHeadersOptions
                {
                    ForwardedHeaders = ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedHost
                });

                app.UseAuthentication();

                if (_environment.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Error");
                    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                    app.UseHsts();
                }

                app.UseRouting();
                app.UseAuthorization();
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapHealthChecks("/healthz");
                    endpoints.MapControllers();
                });

                // Prevents users to access the SPA without proper authentication.
                app.Use(async (context, next) =>
                {
                    if (!context.User.IsAuthenticated())
                    {
                        await context.ChallengeAsync();
                        return;
                    }

                    var policyProvider = context.RequestServices.GetRequiredService<IAuthorizationPolicyProvider>();
                    var authorizationService = context.RequestServices.GetRequiredService<IAuthorizationService>();

                    AuthorizationPolicy defaultPolicy = await policyProvider.GetDefaultPolicyAsync();
                    AuthorizationResult authorizeResult = await authorizationService.AuthorizeAsync(context.User, defaultPolicy);
                    if (authorizeResult.Succeeded)
                    {
                        await next();
                        return;
                    }

                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("Forbidden.");
                });

                app.UseStaticFiles();
                app.UseSpaStaticFiles();

                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";

                    if (_environment.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });
            });
        }

        private void AddAuthenticationServices(IServiceCollection services)
        {
            IConfigurationSection openIdSection = _configuration.GetSection(OpenIdConnectSettings.Name);

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddOpenIdConnect(options =>
            {
                openIdSection.Bind(options);

                options.Events.OnTokenValidated = context =>
                {
                    context.Properties.IsPersistent = true;
                    context.Properties.ExpiresUtc = context.SecurityToken.ValidTo;

                    return Task.CompletedTask;
                };
            });
        }
    }
}
