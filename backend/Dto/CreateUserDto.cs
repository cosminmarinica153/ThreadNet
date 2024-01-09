using Microsoft.CodeAnalysis.CodeFixes;

namespace backend.Dto
{
    public class CreateUserDto
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime RegisterDate { get; set; }
        public short IsVerified { get; set; }
        public string AuthToken { get; set; }
        public int AuthKey { get; set; }
    }
}
