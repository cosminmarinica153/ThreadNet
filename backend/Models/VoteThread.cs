namespace backend.Models
{
    public class VoteThread
    {
        public int UserId { get; set; }
        public int ThreadId { get; set; }
        public User User { get; set; }
        public ThreadComponent Thread { get; set; }
        public string VoteType { get; set; }

    }
}
