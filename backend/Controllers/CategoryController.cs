using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController: Controller
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IThreadRepository threadRepository;
        private readonly IMapper mapper;

        public CategoryController(ICategoryRepository categoryRepository, IThreadRepository threadRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.threadRepository = threadRepository;
            this.mapper = mapper;
        }

        [HttpGet("getAll")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CategoryDto>))]
        public IActionResult GetAll()
        {
            var categories = mapper.Map<List<CategoryDto>>(categoryRepository.GetAll());

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(categories);
        }

        [HttpGet("getOne{id}")]
        [ProducesResponseType(200, Type = typeof(CategoryDto))]
        [ProducesResponseType(400)]
        public IActionResult GetOne(int id)
        {
            if(!categoryRepository.Exists(id))
                return NotFound();

            var category = mapper.Map<CategoryDto>(categoryRepository.GetOne(id));

            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            return Ok(category);
        }

        [HttpGet("getThreads{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<NoRFRThreadDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetThreads(int id)
        {
            if (!categoryRepository.Exists(id))
                return NotFound();

            var threads = mapper.Map<List<NoRFRThreadDto>>(categoryRepository.GetThreads(id));

            foreach(var thread in threads)
            {
                thread.ThreadInteractions = threadRepository.GetInteractions(thread.Id);
            }

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(threads);
        }

        [HttpGet("getPopularityScore{id}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(400)]
        public IActionResult GetPopularityScore(int id)
        {
            if (!categoryRepository.Exists(id))
                return NotFound();

            var score = categoryRepository.GetPopularityScore(id);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(score);
        }

        [HttpGet("getTopCategories{count}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CategoryDto>))]
        public IActionResult GetTopCategories(int count)
        {
            var categories = mapper.Map<List<CategoryDto>>(categoryRepository.GetTopCategories(count));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(categories);
        }

        [HttpPost("createCategory")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] CreateCategoryDto categoryCreate)
        {
            if (categoryCreate == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryMap = mapper.Map<Category>(categoryCreate);

            if (!categoryRepository.CheckUniqueName(categoryMap.Name))
                return NotFound();

            if (!categoryRepository.CreateCategory(categoryMap))
            {
                ModelState.AddModelError("", "Something went wrong when creating category");
                return StatusCode(500, ModelState);
            }

            var category = mapper.Map<CategoryDto>(categoryRepository.GetLastCategory());

            return Ok(category);
        }
    }

}
