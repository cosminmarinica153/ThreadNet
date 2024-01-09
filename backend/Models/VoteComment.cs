namespace backend.Models
{
    public class VoteComment
    {
        public int UserId { get; set; }
        public int CommentId{ get; set; }
        public User User { get; set; }
        public Comment Comment { get; set; }
        public string VoteType { get; set; }
    }
}
