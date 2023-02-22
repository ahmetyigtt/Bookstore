using Bookstore.Data;
using Bookstore.Models;
using Bookstore.Models.ViewModels;
using BookStore.Data;

namespace Bookstore.Services
{
    public class AddressService
    {

        private readonly AddressRepository _repository;

        public AddressService(AddressRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<City>> GetCityList()
        {
            List<City> list = _repository.GetCities();

            return (list);
        }

        public async Task<List<Town>> GetTownList(int id)
        {
            List<Town> list = _repository.GetTowns(id);

            return (list);
        }







    }
}
