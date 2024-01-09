namespace backend.Models
{
    public class Follower
    {
        public int UserId { get; set; }
        public int FollowerId { get; set; }
        public User User { get; set; }
        public User UserFollower { get; set; }
    }
}
