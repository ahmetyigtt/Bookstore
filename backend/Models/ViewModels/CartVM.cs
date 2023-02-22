namespace Bookstore.Models.ViewModels
{
    public class CartVM
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Image { get; set; } = null!;

        public int Price { get; set; }

        public int Quantity { get; set; }

    }
}
