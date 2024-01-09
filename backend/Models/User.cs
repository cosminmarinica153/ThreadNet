namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime RegisterDate { get; set; }
        public short IsVerified { get; set; }
        public string AuthToken { get; set; }
        public short AuthKey { get; set; }
        public ICollection<Follower> Followers { get; set; }
        public ICollection<FavouriteCategory> FavouriteCategories { get; set; }
        public ICollection<FavouriteThread> FavouriteThreads { get; set; }
        public ICollection<ThreadComponent> Threads { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<CommentReply> CommentReplies { get; set; }
        public ICollection<VoteThread> VotedThreads { get; set; }
        public ICollection<VoteComment> VotedComments { get; set; }
        public ICollection<VoteCommentReply> VotedCommnentReplies { get; set; }
    }
}
