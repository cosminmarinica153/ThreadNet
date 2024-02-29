using AutoMapper;
using backend.Dto;
using backend.Interfaces;
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

            var user = mapper.Map<UserDto>(userRepository.GetByUsername(credentials.Username));

            return Ok(user);
        }

        [HttpPost("uniqueUsername")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CheckUniqueUsername([FromBody] string username)
        {
            if(username == null)
                return BadRequest(ModelState);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!authRepository.CheckUniqueUsername(username))
                return Ok(false);

            return Ok(true);
        }

        [HttpPost("uniqueCategoryName")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CheckUniqueCategoryName([FromBody] string categoryName)
        {
            if(categoryName == null)
                return BadRequest(ModelState);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!authRepository.CheckUniqueCategory(categoryName))
                return Ok(false);

            return Ok(true);
        }
    }
}
