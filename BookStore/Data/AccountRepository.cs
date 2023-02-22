using Bookstore.Models;
using Bookstore.Utils;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.Data
{
    public class AccountRepository
    {
        private readonly BookShopContext _dbContext;

        public AccountRepository(BookShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetUserByEmail(string email)
        {

            return _dbContext.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public void Truncate()
        {
            _dbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE cart RESTART IDENTITY;");
            _dbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE favorites RESTART IDENTITY;");
            _dbContext.SaveChanges();
        }








    }
}
