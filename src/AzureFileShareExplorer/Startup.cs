﻿using AzureFileShareExplorer.Extensions;
using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;

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
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IStartupFilter, ConfigurationValidator>();

            services.ConfigureAndValidate<StorageSettings>(_configuration, StorageSettings.Name);

            AddAuthenticationServices(services);

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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseAuthentication();
            app.UseAuthorization();

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
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // TODO: Extract to middleware.
            app.Use(async (ctx, next) =>
            {
                if (!ctx.User.Identity.IsAuthenticated)
                {
                    await ctx.ChallengeAsync();
                }
                else
                {
                    await next();
                }
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
        }

        private void AddAuthenticationServices(IServiceCollection services)
        {
            var azureAdSettings = _configuration.GetSection(AzureAdSettings.Name).Get<AzureAdSettings>();

            if (!azureAdSettings.Enabled)
                return;

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddOpenIdConnect(options =>
            {
                options.ClientId = azureAdSettings.ClientId;
                options.ClientSecret = azureAdSettings.ClientSecret;

                options.Authority = azureAdSettings.Authority;
                options.ResponseType = azureAdSettings.ResponseType;

                options.GetClaimsFromUserInfoEndpoint = azureAdSettings.GetClaimsFromUserInfoEndpoint;

                if (azureAdSettings.ValidIssuers.Any())
                {
                    options.TokenValidationParameters.ValidIssuers = azureAdSettings.ValidIssuers;
                }
            });
        }
    }
}
