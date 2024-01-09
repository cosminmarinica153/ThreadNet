namespace backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public User User { get; set; }
        public ThreadComponent Thread { get; set; }
        public ICollection<VoteComment> VoteComments { get; set; }

    }
}
