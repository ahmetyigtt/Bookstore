using Bookstore.Data;
using Bookstore.Models;
using Bookstore.Models.ViewModels;
using System.Globalization;

namespace Bookstore.Services
{
    public class PaymentService
    {
        private readonly PaymentRepository _paymentRepository;
        private readonly AccountRepository _accountRepository;
        private readonly CartRepository _cartRepository;

        public PaymentService(PaymentRepository paymentRepository, AccountRepository accountRepository, CartRepository cartRepository)
        {
            _paymentRepository = paymentRepository;
            _accountRepository = accountRepository;
            _cartRepository = cartRepository;
        }

        public async Task<int> GetTotalPrice()
        {
            return _paymentRepository.Sum();
        }

        public async Task CompletePayment(PaymentInfoVM paymentInfoVM) 
        {
            Creditcard creditcard = _paymentRepository.GetCreditCard(paymentInfoVM.Number);
            

            if (creditcard == null)
            {
                throw new InvalidOperationException("Invalid Credit Card Number");
            }
            else
            {
                CultureInfo culture = new CultureInfo("en-US", false);
                if (!(paymentInfoVM.Cvc==creditcard.Cvc&& paymentInfoVM.Expiry==creditcard.Expiry && paymentInfoVM.Name.ToLower(culture) == creditcard.Name.ToLower(culture)) )
                {
                    throw new InvalidOperationException("Check Credit Card Info");
                }
                else
                {

                   int userId= _accountRepository.GetUserByEmail(paymentInfoVM.Email).Id;
                   int totalprice = _paymentRepository.Sum();

                    var newOrder = new Order
                    {
                        UserId = userId,
                        TotalPrice = totalprice,
                        Date = DateTime.UtcNow,
                        AddressText = paymentInfoVM.AddressText,
                        CityId = paymentInfoVM.CıtyId,
                        TownId = paymentInfoVM.TownId,
                        Zip = paymentInfoVM.Zip

                    };
                    _paymentRepository.AddOrder(newOrder);

                    int orderID = _paymentRepository.GetLastOrderID();

                    var list = _cartRepository.GetCartItemList();
                    List<Orderitem> orderitems = new List<Orderitem>();
                    foreach (Cart item in list )
                    {
                        orderitems.Add(new Orderitem { OrderId = orderID, BookId = item.BookId, Quantity = item.Quantity, TotalPrice = item.TotalPrice });
                    }

                    _paymentRepository.AddOrderItems(orderitems);
                    _paymentRepository.TruncateCart();


                }
                   
            }














        }








    }
}
