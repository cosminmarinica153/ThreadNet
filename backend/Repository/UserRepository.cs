using AutoMapper;
using backend.Data;
using backend.Dto;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.Build.Framework;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IThreadRepository threadRepository;
        private readonly ICommentRepository commentRepository;
        private readonly ICommentReplyRepository replyRepository;

        public UserRepository(DataContext context, IMapper mapper, IThreadRepository threadRepository,
                              ICommentRepository commentRepository, ICommentReplyRepository replyRepository)
        {
            this.context = context;
            this.mapper = mapper;
            this.threadRepository = threadRepository;
            this.commentRepository = commentRepository;
            this.replyRepository = replyRepository;
        }

        public ICollection<User> GetAll()
        {
            return context.Users.OrderBy(u => u.Id).ToList();
        }

        public User GetOne(int id)
        {
            return context.Users.Find(id);
        }

        public ICollection<User> GetFollowers(int id)
        {
            var followingIds = context.Followers.Where(f => f.UserId == id).ToList();

            List<User> following = new List<User>();

            foreach (var pair in followingIds)
                following.Add(context.Users.Find(pair.FollowerId));

            return following;
        }

        public ICollection<User> GetFollowing(int id)
        {
            var followersIds = context.Followers.Where(f => f.FollowerId == id).ToList();

            List<User> followers = new List<User>();

            foreach (var pair in followersIds)
                followers.Add(context.Users.Find(pair.UserId));

            return followers;
        }

        public ICollection<Category> GetFavouriteCategories(int id)
        {
            var categoryIds = context.FavouriteCategories.Where(fc => fc.UserId == id).ToList();

            List<Category> categories = new List<Category>();

            foreach (var pair in categoryIds)
                categories.Add(context.Categories.Find(pair.CategoryId));

            return categories;
        }

        public ICollection<ThreadComponent> GetFavouriteThreads(int id)
        {
            var threadIds = context.FavouriteThreads.Where(ft => ft.UserId == id).ToList();

            List<ThreadComponent> threads = new List<ThreadComponent>();

            foreach (var pair in threadIds)
            {
                var thread = context.Threads.Where(t => t.Id == pair.ThreadId).Include(t => t.User).FirstOrDefault();

                threads.Add(thread);
            }


            return threads;
        }

        public ICollection<ThreadComponent> GetThreads(int id)
        {
            return context.Threads.Where(t => t.User.Id == id).Include(t => t.User).ToList();
        }

        public ICollection<UserCommentDto> GetComments(int id)
        {
            var comments = mapper.Map<List<UserCommentDto>>(context.Comments.Where(c => c.User.Id == id)
                                                                            .Include(c => c.Thread)
                                                                            .ToList());
            var commentReplies = mapper.Map<List<UserCommentDto>>(context.CommentReplies.Where(cr => cr.User.Id == id)
                                                                                        .Include(cr => cr.Comment)
                                                                                        .ToList());

            foreach (var comment in comments)
            {
                comment.Interactions = mapper.Map<UserCommentInteractions>(commentRepository.GetInteractions(comment.Id));
                comment.Type = "comment";
            }

            foreach (var reply in commentReplies)
            {
                reply.Interactions = mapper.Map<UserCommentInteractions>(replyRepository.GetInteractions(reply.Id));
                reply.Type = "reply";
            }

            var userComments = comments.Concat(commentReplies).ToList();

            return userComments;
        }

        public UserInteractions GetInteractions(int id)
        {
            int favouriteCategories = context.FavouriteCategories.Where(fc => fc.UserId == id).Count();

            int favouriteThreads = context.FavouriteThreads.Where(ft => ft.UserId == id).Count();
            int createdThreads = context.Threads.Where(t => t.User.Id == id).Count();
            int upVotedThreads = context.VoteThread.Where(vt => vt.UserId == id && vt.VoteType == "upVote").Count();
            int downVotedThreads = context.VoteThread.Where(vt => vt.UserId == id && vt.VoteType == "downVote").Count();

            int createdComments = context.Comments.Where(c => c.User.Id == id).Count() 
                                + context.CommentReplies.Where(cr => cr.User.Id == id).Count();
            int upVotedComments = context.VoteComment.Where(vc => vc.UserId == id && vc.VoteType == "upVote").Count()
                                + context.VoteCommentReply.Where(vcr => vcr.UserId == id && vcr.VoteType == "upVote").Count();
            int downVotedComments = context.VoteComment.Where(vc => vc.UserId == id && vc.VoteType == "downVote").Count()
                                  + context.VoteCommentReply.Where(vc => vc.UserId == id && vc.VoteType == "downVote").Count();

            int followerCount = context.Followers.Where(f => f.UserId == id).Count();
            int followingCount = context.Followers.Where(f => f.FollowerId == id).Count();

            UserInteractions interactions = new UserInteractions(favouriteCategories, favouriteThreads, createdThreads, upVotedThreads,
                                                                downVotedThreads, createdComments, upVotedComments, downVotedComments,
                                                                followerCount, followingCount);

            return interactions;
        }

        public UserContentInteractions GetContentInteractions(int id)
        {
            var favouriteCategories = context.FavouriteCategories.Where(fc => fc.UserId == id)
                                                                 .Select(fc => fc.CategoryId).ToList();
            var favouriteThreads = context.FavouriteThreads.Where(ft => ft.UserId == id)
                                                                 .Select(ft => ft.ThreadId).ToList();

            var following = context.Followers.Where(f => f.FollowerId == id)
                                             .Select(f => f.UserId).ToList();

            var upVotedThreads = context.VoteThread.Where(vt => vt.UserId == id && vt.VoteType == "upVote")
                                                   .Select(vt => vt.ThreadId).ToList();
            var downVotedThreads = context.VoteThread.Where(vt => vt.UserId == id && vt.VoteType == "downVote")
                                                   .Select(vt => vt.ThreadId).ToList();

            var upVotedComments = context.VoteComment.Where(vt => vt.UserId == id && vt.VoteType == "upVote")
                                                     .Select(vt => vt.CommentId).ToList();
            var downVotedComments = context.VoteComment.Where(vt => vt.UserId == id && vt.VoteType == "downVote")
                                                       .Select(vt => vt.CommentId).ToList();

            var upVotedReplies = context.VoteCommentReply.Where(vt => vt.UserId == id && vt.VoteType == "upVote")
                                                         .Select(vt => vt.CommentReplyId).ToList();
            var downVotedReplies = context.VoteCommentReply.Where(vt => vt.UserId == id && vt.VoteType == "downVote")
                                                           .Select(vt => vt.CommentReplyId).ToList();

            UserContentInteractions interactions = new UserContentInteractions(favouriteCategories, favouriteThreads, following,
                                                                               upVotedThreads, downVotedThreads, upVotedComments,
                                                                               downVotedComments, upVotedReplies, downVotedReplies);

            return interactions;
        }

        public int GetProfileScore(int id)
        {
            int score = 0;

            int followerCount = context.Followers.Where(f => f.FollowerId == id).Count();
            score += followerCount * ScoreTable.userFollower;

            var userThreads = context.Threads.Where(t => t.User.Id == id);
            var userComments = context.Comments.Where(c => c.User.Id == id);
            var userCommentReplies = context.CommentReplies.Where(cr => cr.User.Id == id);

            int userThreadFavourite = 0;
            int userThreadUpVoted = 0;
            int userThreadDownVoted = 0;

            foreach (var userThread in userThreads)
            {
                if (context.FavouriteThreads.Where(ft => ft.ThreadId == userThread.Id).Any())
                    userThreadFavourite++;
                if (context.VoteThread.Where(ft => ft.ThreadId == userThread.Id && ft.VoteType == "upVote").Any())
                    userThreadUpVoted++;
                if (context.VoteThread.Where(ft => ft.ThreadId == userThread.Id && ft.VoteType == "downVote").Any())
                    userThreadDownVoted++;
            }
                
            score += userThreadFavourite * ScoreTable.userThreadFavourite;
            score += userThreadUpVoted * ScoreTable.userThreadUpVote;
            score += userThreadDownVoted * ScoreTable.userThreadDownVote;

            int userCommentUpVoted = 0;
            int userCommentDownVoted = 0;

            foreach (var userComment in userComments)
            {
                if (context.VoteComment.Where(vc => vc.CommentId == userComment.Id && vc.VoteType == "upVote").Any())
                    userCommentUpVoted++;
                if (context.VoteComment.Where(vc => vc.CommentId == userComment.Id && vc.VoteType == "downVote").Any())
                    userCommentDownVoted++;
            }
            foreach (var userComment in userCommentReplies)
            {
                if (context.VoteCommentReply.Where(vcr => vcr.CommentReplyId == userComment.Id && vcr.VoteType == "upVote").Any())
                    userCommentUpVoted++;
                if (context.VoteCommentReply.Where(vcr => vcr.CommentReplyId == userComment.Id && vcr.VoteType == "downVote").Any())
                    userCommentDownVoted++;
            }

            score += userCommentUpVoted * ScoreTable.userCommentUpVote;
            score += userCommentDownVoted * ScoreTable.userCommentDownVote;

            int userUpVotes = context.VoteThread.Where(vt => vt.UserId == id && vt.VoteType == "upVote").Count()
                            + context.VoteComment.Where(vc => vc.UserId == id && vc.VoteType == "upVote").Count()
                            + context.VoteCommentReply.Where(vcr => vcr.UserId == id && vcr.VoteType == "upVote").Count();

            score += userUpVotes * ScoreTable.userUpVote;

            return score;
        }

        public bool CreateUser(User user)
        {
            context.Users.Add(user);
            return Save();
        }

        public bool CreateFollower(Follower follower)
        {
            context.Followers.Add(follower);
            return Save();
        }

        public bool CreateFavouriteCategory(FavouriteCategory favouriteCategory)
        {
            context.FavouriteCategories.Add(favouriteCategory);
            return Save();
        }

        public bool CreateFavouriteThread(FavouriteThread favouriteThread)
        {
            context.FavouriteThreads.Add(favouriteThread);
            return Save();
        }

        public bool CreateVoteThread(VoteThread voteThread)
        {
            context.VoteThread.Add(voteThread);
            return Save();
        }

        public bool CreateVoteComment(VoteComment voteComment)
        {
            context.VoteComment.Add(voteComment);
            return Save();
        }

        public bool CreateVoteCommentReply(VoteCommentReply voteReply)
        {
            context.VoteCommentReply.Add(voteReply);
            return Save();
        }
        
        public bool UpdateUser(User user)
        {
            context.Users.Update(user);
            return Save();
        }

        public bool UpdateVoteThread(VoteThread voteThread)
        {
            context.VoteThread.Update(voteThread);
            return Save();
        }

        public bool UpdateVoteComment(VoteComment voteComment)
        {
            context.VoteComment.Update(voteComment);
            return Save();
        }

        public bool UpdateVoteCommentReply(VoteCommentReply voteCommentReply)
        {
            context.VoteCommentReply.Update(voteCommentReply);
            return Save();
        }

        public bool DeleteUser(User user)
        {
            // Delete User Threads => Delete Thread Comments => Delete Comment CommentReplies
            var userThreads = context.Threads.Where(t => t.User == user).ToList();
            foreach (var thread in userThreads)
                if (!threadRepository.DeleteThread(thread))
                    return false;

            var userComments = context.Comments.Where(c => c.User == user).ToList();
            foreach (var comment in userComments)
                if (!commentRepository.DeleteComment(comment))
                    return false;

            var userReplies = context.CommentReplies.Where(cr => cr.User == user).ToList();
            foreach (var reply in userReplies)
                if (!replyRepository.DeleteCommentReply(reply))
                    return false;

            // Delete User Interactions
            var voteThreads = context.VoteThread.Where(vt => vt.UserId == user.Id).ToList();
            foreach (var vote in voteThreads)
                if (!DeleteVoteThread(vote))
                    return false;

            var voteComment = context.VoteComment.Where(vc => vc.UserId == user.Id).ToList();
            foreach (var vote in voteComment)
                if (!DeleteVoteComment(vote))
                    return false;

            var voteCommentReply = context.VoteCommentReply.Where(vcr => vcr.UserId == user.Id).ToList();
            foreach (var vote in voteCommentReply)
                if (!DeleteVoteCommentReply(vote))
                    return false;

            var favouriteCategories = context.FavouriteCategories.Where(fc => fc.UserId == user.Id).ToList();
            foreach (var favouriteCategory in favouriteCategories)
                if (!DeleteFavouriteCategory(favouriteCategory))
                    return false;

            var favouriteThreads = context.FavouriteThreads.Where(ft => ft.UserId == user.Id).ToList();
            foreach (var favouriteThead in favouriteThreads)
                if (!DeleteFavouriteThread(favouriteThead))
                    return false;

            var followers = context.Followers.Where(f => f.UserId == user.Id).ToList();
            foreach(var follower in followers)
                if (!DeleteFollower(follower))
                    return false;

            var followings = context.Followers.Where(f => f.FollowerId == user.Id).ToList();
            foreach (var following in followings)
                if (!DeleteFollower(following))
                    return false;

            // If every thread the user created and all interactions are deleted successfully, the user will be deleted
            context.Users.Remove(user);

            return Save();
        }

        public UserCreatedContent GetCreatedContent(int id)
        {
            var threads = context.Threads.Where(t => t.User.Id == id).Select(t => t.Id).ToList();

            var comments = context.Comments.Where(c => c.User.Id == id).Select(c => c.Id).ToList();

            var replies = context.CommentReplies.Where(cr => cr.User.Id == id).Select(cr => cr.Id).ToList();

            var createdContent = new UserCreatedContent(threads, comments, replies);

            return createdContent;
        }

        public bool DeleteFollower(Follower follower)
        {
            var existingFollower = context.Followers.Local.FirstOrDefault(f => f.UserId == follower.UserId &&
                                                                               f.FollowerId == follower.FollowerId);

            if (existingFollower != null)
                context.Followers.Remove(existingFollower);
            else
                context.Followers.Remove(follower);

            return Save();
        }

        public bool DeleteFollowing(Follower following)
        {
            var existingFollowing = context.Followers.Local.FirstOrDefault(f => f.UserId == following.FollowerId &&
                                                                                f.FollowerId == following.UserId);

            if (existingFollowing != null)
                context.Followers.Remove(existingFollowing);
            else
                context.Followers.Remove(following);

            return Save();
        }

        public bool DeleteFavouriteCategory(FavouriteCategory favouriteCategory)
        {
            var existingFavouriteCategory = context.FavouriteCategories.Local.FirstOrDefault(fc => fc.UserId == favouriteCategory.UserId &&
                                                                                                   fc.CategoryId == favouriteCategory.CategoryId);

            if (existingFavouriteCategory != null)
                context.FavouriteCategories.Remove(existingFavouriteCategory);
            else
                context.FavouriteCategories.Remove(favouriteCategory);

            return Save();
        }

        public bool DeleteFavouriteThread(FavouriteThread favouriteThread)
        {
            var existingFavouriteThread = context.FavouriteThreads.Local.FirstOrDefault(ft => ft.UserId == favouriteThread.UserId &&
                                                                                              ft.ThreadId == favouriteThread.ThreadId);

            if (existingFavouriteThread != null)
                context.FavouriteThreads.Remove(existingFavouriteThread);
            else
                context.FavouriteThreads.Remove(favouriteThread);

            return Save();
        }

        public bool DeleteVoteThread(VoteThread voteThread)
        {
            var existingVoteThread = context.VoteThread.Local.FirstOrDefault(vt => vt.UserId == voteThread.UserId &&
                                                                                   vt.ThreadId == voteThread.ThreadId);

            if (existingVoteThread != null)
                context.VoteThread.Remove(existingVoteThread);
            else
                context.VoteThread.Remove(voteThread);

            return Save();
        }

        public bool DeleteVoteComment(VoteComment voteComment)
        {
            var existingVoteComment = context.VoteComment.Local.FirstOrDefault(vc => vc.UserId == voteComment.UserId &&
                                                                                     vc.CommentId == voteComment.CommentId);

            if (existingVoteComment != null)
                context.VoteComment.Remove(existingVoteComment);
            else
                context.VoteComment.Remove(voteComment);

            return Save();
        }

        public bool DeleteVoteCommentReply(VoteCommentReply voteCommentReply)
        {
            var existingVoteCommentReply = context.VoteCommentReply.Local.FirstOrDefault(vcr => vcr.UserId == voteCommentReply.UserId &&
                                                                                                vcr.CommentReplyId == voteCommentReply.CommentReplyId);

            if (existingVoteCommentReply != null)
                context.VoteCommentReply.Remove(existingVoteCommentReply);
            else
                context.VoteCommentReply.Remove(voteCommentReply);

            return Save();
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Exists(int id)
        {
            return context.Users.Where(u => u.Id == id).Any();
        }

        public bool FeatureExists(int userId, int featureId,string type)
        {
            switch(type)
            {
                case "follower":
                    return context.Followers.Where(f => f.UserId == userId && f.FollowerId == featureId).Any();
                case "following":
                    return context.Followers.Where(f => f.UserId == featureId && f.FollowerId == userId).Any();
                case "voteThread":
                    return context.VoteThread.Where(vt => vt.UserId == userId && vt.ThreadId == featureId).Any();
                case "voteComment":
                    return context.VoteComment.Where(vc => vc.UserId == userId && vc.CommentId == featureId).Any();
                case "voteCommentReply":
                    return context.VoteCommentReply.Where(vcr => vcr.UserId == userId && vcr.CommentReplyId == featureId).Any();
                case "favouriteCategory":
                    return context.FavouriteCategories.Where(fc => fc.UserId == userId && fc.CategoryId == featureId).Any();
                case "favouriteThread":
                    return context.FavouriteThreads.Where(ft => ft.UserId == userId && ft.ThreadId == featureId).Any();
                default:
                    return false;
            }
        }

        public object GetFeature(int userId, int featureId, string type)
        {
            switch (type)
            {
                case "follower":
                    return context.Followers.Where(f => f.UserId == userId && f.FollowerId == featureId).FirstOrDefault();
                case "following":
                    return context.Followers.Where(f => f.UserId == featureId && f.FollowerId == userId).FirstOrDefault();
                case "voteThread":
                    return context.VoteThread.Where(vt => vt.UserId == userId && vt.ThreadId == featureId).FirstOrDefault();
                case "voteComment":
                    return context.VoteComment.Where(vc => vc.UserId == userId && vc.CommentId == featureId).FirstOrDefault();
                case "voteCommentReply":
                    return context.VoteCommentReply.Where(vcr => vcr.UserId == userId && vcr.CommentReplyId == featureId).FirstOrDefault();
                case "favouriteCategory":
                    return context.FavouriteCategories.Where(fc => fc.UserId == userId && fc.CategoryId == featureId).FirstOrDefault();
                case "favouriteThread":
                    return context.FavouriteThreads.Where(ft => ft.UserId == userId && ft.ThreadId == featureId).FirstOrDefault();
                default:
                    return null;
            }
        }

        public User GetByUsername(string username)
        {
            return context.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public bool CheckUniqueUsername(string username)
        {
            var user = context.Users.Where(u => u.Username == username).FirstOrDefault();
            
            return user == null;
        }
    }
}
