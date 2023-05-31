using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Api.Request.UserRequest;
using Store.Core.Common.Interfaces.Services;
using Store.Core.DTOs.OrderDTOs;
using Store.Core.DTOs.UserDTOs;
using System.Threading.Channels;

namespace Store.Api.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginUserRequest loginUser)
        {
            var login = _mapper.Map<LoginUserDTO>(loginUser);
            var response = await _userService.Login(login);

            if (response == null)
                return BadRequest("Invalid credentials");
            return Ok(response);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterUserRequest newUser)
        {
            if (newUser.Birthday.Date > DateTime.Now.Date)
                return BadRequest("Date is older than current date");

            var register = _mapper.Map<RegisterUserDTO>(newUser);
            if (!await _userService.Register(register))
                return BadRequest("Invalid input");
            return Ok();
        }


        [HttpGet("details/{id}")]
        [Authorize(Roles = "Customer,Salesman,Administrator")]
        public async Task<IActionResult> Details(int id)
        {
            if (id < 1)
                return BadRequest("Invalid ID provided");
            var result = await _userService.GetUserDetails(id);
            if (result == null)
                return BadRequest("User not found");
            return Ok(result);
        }

        [HttpPatch("update")]
        [Authorize(Roles = "Customer, Salesman, Administrator")]
        public async Task<IActionResult> Update(UpdateUserRequest updated)
        {

            if (updated.Birthday.Date > DateTime.Now.Date)
                return BadRequest("Date is older than current date");

            var user = _mapper.Map<UpdatedUserDTO>(updated);
            if (!await _userService.Update(user))
                return BadRequest("Invalid inputs");
            return Ok();
        }

        [HttpPatch("verify/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> VerifyOrDeny(int id,VerifyOrDenyUserRequest status)
        {
            if (id <= 0)
                return BadRequest("Invalid user id");
            if (!await _userService.VerifyOrDeny(id, status.Action))
                return BadRequest("No users found with this id");
            return Ok();
        }

        [HttpGet("salesman")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSellers()
        {
            return Ok(await _userService.GetSalesman());
        }
    }
}
