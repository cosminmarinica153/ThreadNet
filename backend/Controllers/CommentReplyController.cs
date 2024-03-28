using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentReplyController: Controller
    {
        private readonly ICommentReplyRepository replyRepository;
        private readonly IMapper mapper;

        public CommentReplyController(ICommentReplyRepository replyRepository, IMapper mapper)
        {
            this.replyRepository = replyRepository;
            this.mapper = mapper;
        }

        [HttpGet("getAll")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CommentReplyDto>))]
        public IActionResult GetAll()
        {
            var commentReplies = mapper.Map<List<CommentReplyDto>>(replyRepository.GetAll());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(commentReplies);
        }

        [HttpGet("getOne{id}")]
        [ProducesResponseType(200, Type = typeof(CommentReplyDto))]
        [ProducesResponseType(400)]
        public IActionResult GetOne(int id)
        {
            if (!replyRepository.Exists(id))
                return NotFound();

            var reply = mapper.Map<CommentReplyDto>(replyRepository.GetOne(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(reply);
        }

        [HttpGet("getInteractions{id}")]
        [ProducesResponseType(200, Type = typeof(CommentReplyInteractions))]
        [ProducesResponseType(400)]
        public IActionResult GetInteractions(int id)
        {
            if (!replyRepository.Exists(id))
                return NotFound();

            var interactions = replyRepository.GetInteractions(id);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(interactions);
        }

        [HttpPost("createCommentReply")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCommentReply([FromBody] CreateCommentReplyDto commentReplyCreate)
        {
            if (commentReplyCreate == null || commentReplyCreate.userId <= 0 || commentReplyCreate.commentId <= 0)
                return BadRequest(ModelState);

            // Handle already exists error

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            commentReplyCreate.IsEdited = 0;

            var commentReplyMap = mapper.Map<CommentReply>(commentReplyCreate);

            if(!replyRepository.CreateCommentReply(commentReplyMap, commentReplyCreate.userId, commentReplyCreate.commentId))
            {
                ModelState.AddModelError("", "Something went wrong when creating comment reply");
                return StatusCode(500, ModelState);
            }

            var lastCommentReply = mapper.Map<NoRFRCommentReplyDto>(replyRepository.GetLastCommentReply());

            lastCommentReply.CommentReplyInteractions = replyRepository.GetInteractions(lastCommentReply.Id);

            return Ok(lastCommentReply);
        }

        [HttpPut("updateCommentReply")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateCommentReply([FromBody] UpdateReplyDto updatedReply)
        {
            if (updatedReply == null || updatedReply.Id <= 0 || updatedReply.Content == null)
                return BadRequest(ModelState);

            if (!replyRepository.Exists(updatedReply.Id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reply = replyRepository.GetOne(updatedReply.Id);

            reply.Content = updatedReply.Content;
            reply.IsEdited = 1;

            if (!replyRepository.UpdateCommentReply(reply))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update comment reply");
                return StatusCode(500, ModelState);
            }

            return Ok("Comment Reply updated succesfully");
        }

        [HttpDelete("deleteCommentReply{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteCommentReply(int id)
        {
            if(id <= 0)
                return BadRequest(ModelState);

            if(!replyRepository.Exists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reply = replyRepository.GetOne(id);

            if (!replyRepository.DeleteCommentReply(reply))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete comment reply");
                return StatusCode(500, ModelState);
            }

            return Ok("Comment Reply deleted succesfully");
        }
    }
}
