namespace Bookstore.Models.ViewModels
{
    public class PaymentInfoVM
    {

        public string Name { get; set; }
        public string Number { get; set; }
        public string Expiry { get; set; }
        public string Cvc { get; set; }

        public string Email { get; set; }

        public string AddressText { get; set; }
        public int CıtyId { get; set; }
        public int TownId { get; set; }
        public int Zip { get; set; }




    }
}
