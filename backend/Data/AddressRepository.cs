using Bookstore.Models;
using Bookstore.Utils;

namespace BookStore.Data
{

    public class AddressRepository
    {
        
        private readonly BookShopContext _context;
        public AddressRepository(BookShopContext context)
        {
            _context = context;
        }

        public  List<City> GetCities()
        {
            var list = _context.Cities.ToList();

            return list;
        }

        public List<Town> GetTowns(int id)
        {
            var list = _context.Towns.Where(t => t.CityId == id).ToList();

            return list;
        }
        
    

    }
}
