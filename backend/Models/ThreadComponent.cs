namespace backend.Models
{
    public class ThreadComponent
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime UploadDate { get; set; }
        public short IsEdited { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
        public ICollection<FavouriteThread> FavouriteThreads { get; set; }
        public ICollection<VoteThread> VoteThreads { get; set; }

    }
}
