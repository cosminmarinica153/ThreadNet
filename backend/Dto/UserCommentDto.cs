using backend.Models;

namespace backend.Dto
{
    public class UserCommentDto
    {
        public int Id { get; set; }
        public ThreadComponent Thread { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public UserCommentInteractions Interactions { get; set; }
        public string Type { get; set; }
    }
}
