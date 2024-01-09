using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories  { get; set; }
        public DbSet<ThreadComponent> Threads { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentReply> CommentReplies { get; set; }
        public DbSet<Follower> Followers { get; set; }
        public DbSet<FavouriteCategory> FavouriteCategories { get; set; }
        public DbSet<FavouriteThread> FavouriteThreads { get; set; }
        public DbSet<VoteThread> VoteThread { get; set; }
        public DbSet<VoteComment> VoteComment { get; set; }
        public DbSet<VoteCommentReply> VoteCommentReply { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Followers
            modelBuilder.Entity<Follower>()
                .HasKey(f => new {f.UserId, f.FollowerId});
            modelBuilder.Entity<Follower>()
                .HasOne(f => f.User)
                .WithMany(f => f.Followers)
                .HasForeignKey(f => f.FollowerId);

            // Many To Many Relationships

            // Favourite Categories
            modelBuilder.Entity<FavouriteCategory>()
                .HasKey(fc => new {fc.UserId, fc.CategoryId});
            modelBuilder.Entity<FavouriteCategory>()
                .HasOne(u => u.User)
                .WithMany(fc => fc.FavouriteCategories)
                .HasForeignKey(c => c.CategoryId);
            modelBuilder.Entity<FavouriteCategory>()
                .HasOne(c => c.Category)
                .WithMany(fc => fc.FavouriteCategories)
                .HasForeignKey(u => u.UserId);

            // Favourite Threads
            modelBuilder.Entity<FavouriteThread>()
                .HasKey(ft => new {ft.UserId, ft.ThreadId});
            modelBuilder.Entity<FavouriteThread>()
                .HasOne(u => u.User)
                .WithMany(ft => ft.FavouriteThreads)
                .HasForeignKey(t => t.ThreadId);
            modelBuilder.Entity<FavouriteThread>()
                .HasOne(t => t.Thread)
                .WithMany(ft => ft.FavouriteThreads)
                .HasForeignKey(u => u.UserId);

            // Vote Threads
            modelBuilder.Entity<VoteThread>()
                .HasKey(ft => new { ft.UserId, ft.ThreadId });
            modelBuilder.Entity<VoteThread>()
                .HasOne(u => u.User)
                .WithMany(ft => ft.VotedThreads)
                .HasForeignKey(t => t.ThreadId);
            modelBuilder.Entity<VoteThread>()
                .HasOne(t => t.Thread)
                .WithMany(ft => ft.VoteThreads)
                .HasForeignKey(u => u.UserId);

            // Vote Comments
            modelBuilder.Entity<VoteComment>()
                .HasKey(ft => new { ft.UserId, ft.CommentId });
            modelBuilder.Entity<VoteComment>()
                .HasOne(u => u.User)
                .WithMany(ft => ft.VotedComments)
                .HasForeignKey(t => t.CommentId);
            modelBuilder.Entity<VoteComment>()
                .HasOne(t => t.Comment)
                .WithMany(ft => ft.VoteComments)
                .HasForeignKey(u => u.UserId);

            // Vote CommentReplies
            modelBuilder.Entity<VoteCommentReply>()
                .HasKey(ft => new { ft.UserId, ft.CommentReplyId });
            modelBuilder.Entity<VoteCommentReply>()
                .HasOne(u => u.User)
                .WithMany(ft => ft.VotedCommnentReplies)
                .HasForeignKey(t => t.CommentReplyId);
            modelBuilder.Entity<VoteCommentReply>()
                .HasOne(t => t.CommentReply)
                .WithMany(ft => ft.VoteCommentReplies)
                .HasForeignKey(u => u.UserId);

        }
    }
}
