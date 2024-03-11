using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        // GET REQUESTS

        [HttpGet("getAll")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserDto>))]
        public IActionResult GetAll()
        {
            var users = mapper.Map<List<UserDto>>(userRepository.GetAll());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("getOne{id}")]
        [ProducesResponseType(200, Type = typeof(UserDto))]
        [ProducesResponseType(400)]
        public IActionResult GetOne(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var user = mapper.Map<UserDto>(userRepository.GetOne(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet("getFollowers{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetFollowers(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var followers = mapper.Map<List<UserDto>>(userRepository.GetFollowers(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(followers);
        }

        [HttpGet("getFollowing{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetFollowing(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var following = mapper.Map<List<UserDto>>(userRepository.GetFollowing(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(following);
        }

        [HttpGet("getFavouriteCategories{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CategoryDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetFavouriteCategories(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var categories = mapper.Map<List<CategoryDto>>(userRepository.GetFavouriteCategories(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(categories);
        }

        [HttpGet("getFavouriteThreads{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ThreadDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetFavouriteThreads(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var threads = mapper.Map<List<ThreadDto>>(userRepository.GetFavouriteThreads(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(threads);
        }

        [HttpGet("getThreads{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ThreadDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetThreads(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var threads = mapper.Map<List<ThreadDto>>(userRepository.GetThreads(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(threads);
        }

        [HttpGet("getComments{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserCommentDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetComments(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var comments = userRepository.GetComments(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(comments);
        }

        [HttpGet("getInteractions{id}")]
        [ProducesResponseType(200, Type = typeof(UserInteractions))]
        [ProducesResponseType(400)]
        public IActionResult GetInteractions(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            var interactions = userRepository.GetInteractions(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(interactions);
        }

        [HttpGet("getProfileScore{id}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(400)]
        public IActionResult GetProfileScore(int id)
        {
            if (!userRepository.Exists(id))
                return NotFound();

            int score = userRepository.GetProfileScore(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(score);
        }

        // POST REQUESTS

        [HttpPost("createUser")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] CreateUserDto userCreate)
        {
            if (userCreate == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userMap = mapper.Map<User>(userCreate);

            if (!userRepository.CheckUniqueUsername(userMap.Username))
                return NotFound();

            if (!userRepository.CreateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong when creating user");
                return StatusCode(500, ModelState);
            }

            return Ok("User created succesfully");
        }

        [HttpPost("createFollower")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateFollower([FromBody] FollowerDto followerCreate)
        {
            if (followerCreate == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var followerMap = mapper.Map<Follower>(followerCreate);

            if (!userRepository.CreateFollower(followerMap))
            {
                ModelState.AddModelError("", "Something went wrong when adding follower");
                return StatusCode(500, ModelState);
            }

            return Ok("Follower created succesfully");
        }

        [HttpPost("createFavouriteCategory")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateFavouriteCategory([FromBody] FavouriteCategoyDto createFavouriteCategory)
        {
            if (createFavouriteCategory == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var favouriteCategoryMap = mapper.Map<FavouriteCategory>(createFavouriteCategory);

            if (!userRepository.CreateFavouriteCategory(favouriteCategoryMap))
            {
                ModelState.AddModelError("", "Something went wrong when adding category to favourites");
                return StatusCode(500, ModelState);
            }

            return Ok("Favourite Category created succesfully");
        }

        [HttpPost("createFavouriteThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateFavouriteThread([FromBody] FavouriteThreadDto createFavouriteThread)
        {
            if (createFavouriteThread == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var favouriteThreadMap = mapper.Map<FavouriteThread>(createFavouriteThread);

            if (!userRepository.CreateFavouriteThread(favouriteThreadMap))
            {
                ModelState.AddModelError("", "Something went wrong when adding thread to favourites");
                return StatusCode(500, ModelState);
            }

            return Ok("Favourite Thread created succesfully");
        }

        [HttpPost("createVoteThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateVoteThread([FromBody] VoteDto createVoteThread)
        {
            if (createVoteThread == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voteThreadMap = mapper.Map<VoteThread>(createVoteThread);

            if (!userRepository.CreateVoteThread(voteThreadMap))
            {
                ModelState.AddModelError("", "Something went wrong when adding vote to thread");
                return StatusCode(500, ModelState);
            }

            return Ok("Vote Thread created succesfully");
        }

        [HttpPost("createVoteComment")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateVoteComment([FromBody] VoteDto createVoteComment)
        {
            if (createVoteComment == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voteCommentMap = mapper.Map<VoteComment>(createVoteComment);

            if (!userRepository.CreateVoteComment(voteCommentMap))
            {
                ModelState.AddModelError("", "Something went wrong went adding vote to comment");
                return StatusCode(500, ModelState);
            }

            return Ok("Vote Comment created succesfully");
        }

        [HttpPost("createVoteCommentReply")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateVoteCommentReply([FromBody] VoteDto createVoteCommentReply)
        {
            if (createVoteCommentReply == null)
                return BadRequest(ModelState);

            // Handle already exists error

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voteCommentReplyMap = mapper.Map<VoteCommentReply>(createVoteCommentReply);

            if (!userRepository.CreateVoteCommentReply(voteCommentReplyMap))
            {
                ModelState.AddModelError("", "Something went wrong when adding vote to comment reply");
                return StatusCode(500, ModelState);
            }

            return Ok("Vote CommentReply created succesfully");
        }

        // PUT REQUESTS

        [HttpPut("updateUser")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateUser([FromBody] UserDto updatedUser)
        {
            if (updatedUser == null || updatedUser.Id <= 0 || updatedUser.Username == null || updatedUser.Email == null
                                    || updatedUser.Password == null || updatedUser.AuthToken == null)
                return BadRequest(ModelState);

            if (!userRepository.Exists(updatedUser.Id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = mapper.Map<User>(updatedUser);

            if (!userRepository.UpdateUser(user))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update user");
                return StatusCode(500, ModelState);
            }

            return Ok("User updated succesfully");
        }

        [HttpPut("updateVoteThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateVoteThread([FromBody] VoteDto updatedVoteThread)
        {
            if (updatedVoteThread == null || updatedVoteThread.UserId <= 0 || updatedVoteThread.ContentId <= 0 || updatedVoteThread.VoteType == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voteThread = mapper.Map<VoteThread>(updatedVoteThread);

            if (!userRepository.UpdateVoteThread(voteThread))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update Vote Thread");
                return StatusCode(500, ModelState);
            }

            return Ok("Vote Thread updated succesfully");
        }

        [HttpPut("updateVoteComment")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateVoteComment([FromBody] VoteDto updatedVoteComment)
        {
            if (updatedVoteComment == null || updatedVoteComment.UserId <= 0 || updatedVoteComment.ContentId <= 0
                                           || updatedVoteComment.VoteType == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voteComment = mapper.Map<VoteComment>(updatedVoteComment);

            if (!userRepository.UpdateVoteComment(voteComment))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update Vote Comment");
                return StatusCode(500, ModelState);
            }

            return Ok("Vote Comment updated succesfully");
        }

        [HttpPut("updateVoteCommentReply")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult UpdateVoteCommentReply([FromBody] VoteDto updatedVoteCommentReply)
        {
            if (updatedVoteCommentReply == null || updatedVoteCommentReply.UserId <= 0 || updatedVoteCommentReply.ContentId <= 0
                                                || updatedVoteCommentReply.VoteType == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voteCommentReply = mapper.Map<VoteCommentReply>(updatedVoteCommentReply);

            if (!userRepository.UpdateVoteCommentReply(voteCommentReply))
            {
                ModelState.AddModelError("", "Something went wrong while trying to update Vote Comment Reply");
                return StatusCode(500, ModelState);
            }

            return Ok("Vote Comment Reply updated succesfully");
        }

        // DELETE REQUESTS

        [HttpDelete("deleteUser{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteUser(int id)
        {
            if (id <= 0)
                return BadRequest(ModelState);

            if (!userRepository.Exists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = userRepository.GetOne(id);

            if (!userRepository.DeleteUser(user))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete user");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted User");
        }

        [HttpDelete("deleteFollower")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteFollower([FromBody] FollowerDto follower)
        {
            if (follower == null || follower.UserId <= 0 || follower.FollowerId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(follower.UserId, follower.FollowerId, "follower"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var deleteFollower = mapper.Map<Follower>(userRepository.GetFeature(follower.UserId, follower.FollowerId, "follower"));
            deleteFollower.UserId = follower.UserId;
            deleteFollower.FollowerId = follower.FollowerId;

            if (!userRepository.DeleteFollower(deleteFollower))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete follower");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted Follower");
        }

        [HttpDelete("deleteFollowing")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteFollowing([FromBody] FollowingDto following)
        {
            if (following == null || following.UserId <= 0 || following.FollowingId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(following.UserId, following.FollowingId, "following"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var deleteFollowing = mapper.Map<Follower>(userRepository.GetFeature(following.UserId, following.FollowingId, "following"));
            deleteFollowing.UserId = following.UserId;
            deleteFollowing.FollowerId = following.FollowingId;

            if (!userRepository.DeleteFollowing(deleteFollowing))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete following");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted Following");
        }

        [HttpDelete("deleteVoteThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteVoteThread([FromBody] DeleteVoteDto voteThread)
        {
            if (voteThread == null || voteThread.UserId <= 0 || voteThread.ContentId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(voteThread.UserId, voteThread.ContentId, "voteThread"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vote = mapper.Map<VoteThread>(userRepository.GetFeature(voteThread.UserId, voteThread.ContentId, "voteThread"));
            vote.UserId = voteThread.UserId;
            vote.ThreadId = voteThread.ContentId;

            if (!userRepository.DeleteVoteThread(vote))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete thread vote");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted Vote Thread");
        }

        [HttpDelete("deleteVoteComment")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteVoteComment([FromBody] DeleteVoteDto voteComment)
        {
            if (voteComment == null || voteComment.UserId <= 0 || voteComment.ContentId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(voteComment.UserId, voteComment.ContentId, "voteComment"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vote = mapper.Map<VoteComment>(userRepository.GetFeature(voteComment.UserId, voteComment.ContentId, "voteComment"));
            vote.UserId = voteComment.UserId;
            vote.CommentId = voteComment.ContentId;

            if (!userRepository.DeleteVoteComment(vote))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete comment vote");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted Vote Comment");
        }

        [HttpDelete("deleteVoteCommentReply")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteVoteCommentReply([FromBody] DeleteVoteDto voteCommentReply)
        {
            if (voteCommentReply == null || voteCommentReply.UserId <= 0 || voteCommentReply.ContentId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(voteCommentReply.UserId, voteCommentReply.ContentId, "voteCommentReply"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vote = mapper.Map<VoteCommentReply>(userRepository.GetFeature(voteCommentReply.UserId, voteCommentReply.ContentId, "voteCommentReply"));
            vote.UserId = voteCommentReply.UserId;
            vote.CommentReplyId = voteCommentReply.ContentId;

            if (!userRepository.DeleteVoteCommentReply(vote))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete comment reply vote");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted Vote Comment Reply");
        }

        [HttpDelete("deleteFavouriteCategory")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteFavouriteCategory([FromBody] FavouriteCategoyDto favouriteCategory)
        {
            if (favouriteCategory == null || favouriteCategory.UserId <= 0 || favouriteCategory.CategoryId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(favouriteCategory.UserId, favouriteCategory.CategoryId, "favouriteCategory"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vote = mapper.Map<FavouriteCategory>(userRepository.GetFeature(favouriteCategory.UserId, favouriteCategory.CategoryId, "favouriteCategory"));
            vote.UserId = favouriteCategory.UserId;
            vote.CategoryId = favouriteCategory.CategoryId;

            if (!userRepository.DeleteFavouriteCategory(vote))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete favourite category");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted favourite category");
        }

        [HttpDelete("deleteFavouriteThread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteFavouriteThread([FromBody] FavouriteThreadDto favouriteThread)
        {
            if (favouriteThread == null || favouriteThread.UserId <= 0 || favouriteThread.ThreadId <= 0)
                return BadRequest(ModelState);

            if (!userRepository.FeatureExists(favouriteThread.UserId, favouriteThread.ThreadId, "favouriteThread"))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vote = mapper.Map<FavouriteThread>(userRepository.GetFeature(favouriteThread.UserId, favouriteThread.ThreadId, "favouriteThread"));
            vote.UserId = favouriteThread.UserId;
            vote.ThreadId = favouriteThread.ThreadId;

            if (!userRepository.DeleteFavouriteThread(vote))
            {
                ModelState.AddModelError("", "Something went wrong while trying to delete favourite thread");
                return StatusCode(500, ModelState);
            }

            return Ok("Succesfully deleted favourite thread");
        }

    }
}
