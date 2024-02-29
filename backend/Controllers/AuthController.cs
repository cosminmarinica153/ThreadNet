using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthRepository authRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public AuthController(IAuthRepository authRepository, IUserRepository userRepository,IMapper mapper)
        {
            this.authRepository = authRepository;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Login([FromBody] LoginDto credentials)
        {
            if (credentials == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!authRepository.AuthLogin(credentials))
                return NotFound("User not found");

            var user = userRepository.GetByUsername(credentials.Username);

            return Ok(user);
        }
    }
}
