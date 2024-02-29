using backend.Dto;

namespace backend.Interfaces
{
    public interface IAuthRepository
    {
        bool AuthLogin(LoginDto credentials);

        bool CheckUniqueUsername(string username);
        bool CheckUniqueCategory(string categoryName);
    }
}
