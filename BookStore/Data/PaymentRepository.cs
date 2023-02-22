using Bookstore.Models;
using Bookstore.Utils;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.Data
{
    public class PaymentRepository
    {

        private readonly BookShopContext _dbContext;

        public PaymentRepository(BookShopContext dbContext)
        {
            _dbContext = dbContext;
        }


        public int Sum()
        {
           return _dbContext.Carts.Sum(b => b.TotalPrice);
        }

        public Creditcard GetCreditCard(string creditCardNumber)
        {
            return _dbContext.Creditcards.FirstOrDefault(c => c.Number == creditCardNumber);
        }

        public void AddOrder(Order order)
        {
           _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();
        }

        public void AddOrderItems(List<Orderitem> itemList)
        {
            _dbContext.Orderitems.AddRange(itemList);
            _dbContext.SaveChanges();
        }

        public int GetLastOrderID()
        {
           var order= _dbContext.Orders.OrderByDescending(o => o.Id).FirstOrDefault();

            if (order == null)
                return 0;

            return order.Id;
        }


        public void TruncateCart()
        {
            _dbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE cart RESTART IDENTITY;");
            _dbContext.SaveChanges();
        }













    }
}
