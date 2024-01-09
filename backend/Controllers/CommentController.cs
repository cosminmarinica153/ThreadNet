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
    public class CommentController : Controller
    {
        private readonly ICommentRepository commentRepository;
        private readonly IMapper mapper;

        public CommentController(ICommentRepository commentRepository, IMapper mapper)
        {
            this.commentRepository = commentRepository;
            this.mapper = mapper;
        }

        [HttpGet("getAll")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CommentDto>))]
        public IActionResult GetAll()
        {
            var comments = mapper.Map<List<CommentDto>>(commentRepository.GetAll());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comments);
        }

        [HttpGet("getOne{id}")]
        [ProducesResponseType(200, Type = typeof(CommentDto))]
        [ProducesResponseType(400)]
        public IActionResult GetOne(int id)
        {
            if (!commentRepository.Exists(id))
                return NotFound();

            var comment = mapper.Map<CommentDto>(commentRepository.GetOne(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comment);
        }

        [HttpGet("getReplies{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CommentReplyDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetReplies(int id)
        {
            if (!commentRepository.Exists(id))
                return NotFound();

            var replies = mapper.Map<List<CommentReplyDto>>(commentRepository.GetReplies(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(replies);
        }

        [HttpGet("getInteractions{id}")]
        [ProducesResponseType(200, Type = typeof(CommentInteractions))]
        [ProducesResponseType(400)]
        public IActionResult GetInteractions(int id)
        {
            if (!commentRepository.Exists(id))
                return NotFound();

            var interactions = commentRepository.GetInteractions(id).ToJson();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(interactions);
        }

        [HttpPost("createComment")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateComment([FromBody] CreateCommentDto commentCreate)
        {
            if(commentCreate == null || commentCreate.userId <= 0 || commentCreate.threadId <= 0)
                return BadRequest(ModelState);

            // Handle already exists error

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentMap = mapper.Map<Comment>(commentCreate);

            if(!commentRepository.CreateComment(commentMap, commentCreate.userId, commentCreate.threadId))
            {
                ModelState.AddModelError("", "Something went wrong when creating comment");
                return StatusCode(500, ModelState);
            }

            return Ok("Comment created succesfully");
        }

        [HttpPut("updateComment")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateComment([FromBody] UpdateReplyDto updatedComment)
        {
            if (updatedComment == null || updatedComment.Id <= 0 || updatedComment.Content == null)
                return BadRequest(ModelState);

            if(!commentRepository.Exists(updatedComment.Id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = commentRepository.GetOne(updatedComment.Id);

            comment.Content = updatedComment.Content;
            comment.IsEdited = 1;

            if(!commentRepository.UpdateComment(comment))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update comment");
                return StatusCode(500, ModelState);
            }

            return Ok("Comment updated succesfully");
        }

        [HttpDelete("deleteComment{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteComment(int id) 
        {
            if (id <= 0)
                return BadRequest(ModelState);

            if(!commentRepository.Exists(id))
                return NotFound();

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = commentRepository.GetOne(id);

            if (!commentRepository.DeleteComment(comment))
            {
                ModelState.AddModelError("", "Something went wrong when deleting comment");
                return StatusCode(500, ModelState);
            }

            return Ok("Comment deleted succesfully");
        }

    }
}
