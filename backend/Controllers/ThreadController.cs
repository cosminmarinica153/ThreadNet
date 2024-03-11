using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadController : Controller
    {
        private readonly IThreadRepository threadRepository;
        private readonly IMapper mapper;

        public ThreadController(IThreadRepository threadRepository, IMapper mapper)
        {
            this.threadRepository = threadRepository;
            this.mapper = mapper;
        }

        [HttpGet("getAll")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ThreadDto>))]
        public IActionResult GetAll()
        {
            var threads = mapper.Map<List<ThreadDto>>(threadRepository.GetAll());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(threads);
        }

        [HttpGet("getOne{id}")]
        [ProducesResponseType(200, Type = typeof(ThreadDto))]
        [ProducesResponseType(400)]
        public IActionResult GetOne(int id)
        {
            if (!threadRepository.Exists(id))
                return NotFound();

            var thread = mapper.Map<ThreadDto>(threadRepository.GetOne(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(thread);
        }

        [HttpGet("getComments{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CommentDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetComments(int id)
        {
            if (!threadRepository.Exists(id))
                return NotFound();

            var comments = mapper.Map<List<CommentDto>>(threadRepository.GetComments(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comments);
        }

        [HttpGet("getDiscussionParticipants{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetDiscussionParticipants(int id)
        {
            if (!threadRepository.Exists(id))
                return NotFound();

            var participants = mapper.Map<List<UserDto>>(threadRepository.GetDiscussionParticipants(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(participants);
        }

        [HttpGet("getPopularityScore{id}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(400)]
        public IActionResult GetPopularityScore(int id)
        {
            if (!threadRepository.Exists(id))
                return NotFound();

            var score = threadRepository.GetPopularityScore(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(score);
        }

        [HttpGet("getInteractions{id}")]
        [ProducesResponseType(200, Type = typeof(ThreadInteractions))]
        [ProducesResponseType(400)]
        public IActionResult GetInteractions(int id)
        {
            if (!threadRepository.Exists(id))
                return NotFound();

            var interactions = threadRepository.GetInteractions(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(interactions);
        }

        [HttpPost("createThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateThread([FromBody] CreateThreadDto createThread)
        {
            if (createThread == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var threadMap = mapper.Map<ThreadComponent>(createThread);

            if (!threadRepository.CreateThread(threadMap, createThread.userId, createThread.categoryId))
            {
                ModelState.AddModelError("", "Something went wrong when creating thread");
                return StatusCode(500, ModelState);
            }

            var lastThread = mapper.Map<ThreadDto>(threadRepository.GetLastThread());

            var response = new ThreadResponseDto
            {
                Id = lastThread.Id,
                UserId = lastThread.User.Id,
                CategoryId = lastThread.Category.Id,
                Title = lastThread.Title,
                Content = lastThread.Content,
                UploadDate = lastThread.UploadDate,
                IsEdited = lastThread.IsEdited
            };

            return Ok(response);
        }

        [HttpPut("updateThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateThread([FromBody] UpdateThreadDto updatedThread)
        {
            if (updatedThread == null || updatedThread.Id <= 0 || updatedThread.Title == null || updatedThread.Content == null)
                return BadRequest(ModelState);

            if (!threadRepository.Exists(updatedThread.Id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var thread = threadRepository.GetOne(updatedThread.Id);

            thread.Title = updatedThread.Title;
            thread.Content = updatedThread.Content;
            thread.IsEdited = 1;

            if (!threadRepository.UpdateThread(thread))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update thread");
                return StatusCode(500, ModelState);
            }

            return Ok("Thread updated succesfully");
        }

        [HttpDelete("deleteThread{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteThread(int id)
        {
            if (id <= 0)
                return BadRequest(ModelState);

            if (!threadRepository.Exists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var thread = threadRepository.GetOne(id);

            if(!threadRepository.DeleteThread(thread))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete thread");
                return StatusCode(500, ModelState);
            }

            return Ok("Thread deleted succesfully");
        }
    }
}
