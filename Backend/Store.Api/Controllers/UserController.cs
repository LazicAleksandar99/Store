using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Store.Api.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
    }
}
