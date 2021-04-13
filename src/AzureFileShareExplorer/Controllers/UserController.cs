using AzureFileShareExplorer.Extensions;
using AzureFileShareExplorer.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AzureFileShareExplorer.Controllers
{
    [Route("user")]
    public class UserController : Controller
    {
        [HttpGet("info")]
        public ActionResult<UserModel> GetUserInfo()
        {
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
