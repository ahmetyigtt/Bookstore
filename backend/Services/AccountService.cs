using Bookstore.Data;
using Bookstore.Models;
using Bookstore.Models.ViewModels;

namespace Bookstore.Services
{
    public class AccountService
    {
        private readonly AccountRepository _repository;

        public AccountService(AccountRepository repository)
        {
            _repository = repository;
        }

        public async Task<UserLoginResponseVM> Login(UserLoginVM userLoginVM)
        {
            var user = _repository.GetUserByEmail(userLoginVM.Email);

            if (user == null)
            {
                throw new InvalidOperationException("This mail does not belong to an account");
            }

            else if (user.Password != userLoginVM.Password)
            {
                throw new InvalidOperationException("Invalid password");
            }

            var resultuser = new UserLoginResponseVM { UserName = user.Firstname + " " + user.Lastname, Email = user.Email };
            return (resultuser);
        }

        public async Task Register(UserRegisterVM userRegisterVM)
        {
            User user = _repository.GetUserByEmail(userRegisterVM.Email);

            if (user == null)
            {
                var newUser = new User
                {
                    Firstname = userRegisterVM.Firstname,
                    Lastname = userRegisterVM.Lastname,
                    Email = userRegisterVM.Email,
                    Telephone = userRegisterVM.Telephone,
                    Password = userRegisterVM.Password

                };

                _repository.AddUser(newUser);

            }
            else
            {
                throw new InvalidOperationException("You have already an account");
            }

        }

        public async Task Logout()
        {
            _repository.Truncate();

        }

        public async Task<UserInfoVM> GetUserByEmail(string email)
        {
            var user = _repository.GetUserByEmail(email);

            if (user == null)
            {
                throw new InvalidOperationException("User Not Found");
            }
            var userInfo = new UserInfoVM { FirstName = user.Firstname, LastName = user.Lastname, Email = user.Email, Telephone = user.Telephone };
            return (userInfo);
        }





    }
}
