using backend.Models;

namespace backend.Dto
{
    public class CommentReplyDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public User User { get; set; }
        public Comment Comment { get; set; }
    }
}
