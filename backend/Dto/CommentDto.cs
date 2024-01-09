using backend.Models;

namespace backend.Dto
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public User User { get; set; }
        public ThreadComponent Thread { get; set; }
    }
}
