using backend.Models;

namespace backend.Dto
{
    public class NoRFRCommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public ContentUserDto User { get; set; }
        public List<NoRFRCommentReplyDto>? Replies { get; set; }
        public CommentInteractions? CommentInteractions { get; set; }
    }
}
