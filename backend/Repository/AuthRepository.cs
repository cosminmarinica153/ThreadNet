using backend.Data;
using backend.Dto;
using backend.Interfaces;

namespace backend.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;

        public AuthRepository(DataContext context)
        {
            this.context = context;
        }

        public bool AuthLogin(LoginDto credentials)
        {
            var user = context.Users.Where(u => u.Username == credentials.Username &&
                                           u.Password == credentials.Password).FirstOrDefault();

            if(user == null)
                return false;

            return true;
        }
        public bool CheckUniqueUsername(string username)
        {
            var user = context.Users.Where(u => u.Username == username).FirstOrDefault();

            if(user == null)
                return true;

            return false;
        }

        public bool CheckUniqueCategory(string categoryName)
        {
            var category = context.Categories.Where(c => c.Name == categoryName).FirstOrDefault();

            if(category == null)
                return true;

            return false;
        }

    }
}
