using AzureFileShareExplorer.Extensions;
using AzureFileShareExplorer.Models;
using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace AzureFileShareExplorer.Controllers
{
    [Route("user")]
    public class UserController : Controller
    {
        private readonly IOptionsMonitor<AzureAdSettings> _azureAdSettings;

        private AzureAdSettings AzureAdSettings => _azureAdSettings.CurrentValue;

        public UserController(IOptionsMonitor<AzureAdSettings> azureAdSettings)
        {
            _azureAdSettings = azureAdSettings;
        }

        [HttpGet("info")]
        public ActionResult<UserModel> GetUserInfo()
        {
            if (!AzureAdSettings.Enabled)
            {
                return Ok(new UserModel { IsAuthenticated = true });
            }

            if (!User.IsAuthenticated())
            {
                return Ok(new UserModel { IsAuthenticated = false });
            }

            return Ok(new UserModel
            {
                IsAuthenticated = true,
                Name = User.GetDisplayName()
            });
        }

        [HttpGet("challenge")]
        public IActionResult Challenge(string returnUrl)
        {
            if (!AzureAdSettings.Enabled)
            {
                return BadRequest("No authentication scheme has been provided.");
            }

            return Challenge(new AuthenticationProperties
            {
                RedirectUri = returnUrl ?? "~/"
            });
        }

        [HttpGet("signout")]
        public async Task<IActionResult> EndSession()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }
    }
}
