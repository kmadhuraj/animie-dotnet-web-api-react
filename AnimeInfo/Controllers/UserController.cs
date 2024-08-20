using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AnimeInfo.Model;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using AnimeInfo.DTOs;
using AnimeInfo.Services.AnimiesServices;
using AutoMapper;
namespace AnimeInfo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        
        private IAnimieInterface _animieInterface;
        private readonly IMapper _mapper;
        public UserController(IAnimieInterface animieInterface, IMapper mapper)
        {
            _animieInterface = animieInterface;
            _mapper = mapper;

        } 
        
        //[AllowAnonymous]
        //[HttpPost("Login")]
        //public IActionResult Login(AdminLoginDto adminDto)
        //{
        //    var admin = _mapper.Map<AdminLogin>(adminDto);

        //    IActionResult responese = Unauthorized();
        //    var _user = _animieInterface.AuthenticateAdmin(admin);
        //    if (_user != null)
        //    {
        //        var token= _animieInterface.GenerateToken(_user);
        //        responese = Ok(new { token = token });
        //    }
        //    return responese;
        //}
        
        [HttpPost("Login")]
        public IActionResult LoginUser(UserLoginDto userDto)
        { 
            //                     destination   source
            var user=_mapper.Map<UserCredentials>(userDto);
            IActionResult responese = Unauthorized();
            var _user=_animieInterface.Authenticate(userDto.Email,userDto.Password);
            if (_user != null )
            {
                var userLoginToken = _animieInterface.GenerateToken(_user);
                responese = Ok(new { tokenObject = userLoginToken });
                return responese;
                //var result = _animieInterface.CreateUserAsync(_user.Email, _user.Password, _user.IsAdmin);
            }
            return NotFound("user is null");
            
            }

        [HttpPost("UserRegistration")]
        public IActionResult UserRegistration(UserCredentialDto userCred)
        {
            var user = _mapper.Map<UserCredentials>(userCred);
            var response= _animieInterface.RegisterUser(user);
            return Ok(response);
        }
    }
}
