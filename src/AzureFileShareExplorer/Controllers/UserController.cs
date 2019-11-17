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
            if (!User.Identity.IsAuthenticated)
            {
                return Ok(new UserModel { IsAuthenticated = false });
            }

            return new UserModel
            {
                IsAuthenticated = true,
                Name = User.Identity.Name
            };
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
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }
    }
}
