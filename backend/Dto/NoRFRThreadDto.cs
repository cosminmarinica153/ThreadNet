using backend.Models;

namespace backend.Dto
{
    public class NoRFRThreadDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public ContentUserDto User { get; set; }
        public List<NoRFRCommentDto>? Comments { get; set; }
        public ThreadInteractions? ThreadInteractions { get; set; }
    }
}
