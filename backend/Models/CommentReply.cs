namespace backend.Models
{
    public class CommentReply
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public User User { get; set; }
        public Comment Comment { get; set; }
        public ICollection<VoteCommentReply> VoteCommentReplies { get; set; }
    }
}
