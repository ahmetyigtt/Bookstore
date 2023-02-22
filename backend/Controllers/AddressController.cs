using Bookstore.Models;
using Bookstore.Services;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AddressService _addressService;

        public AddressController(AddressService addressService)
        {
            _addressService = addressService;
        }


        [HttpGet]
        [Route("GetCityList")]
        public async Task<IActionResult> GetCityList()
        {
            List<City> list;
            try
            {
                list = await _addressService.GetCityList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(list);

        }

        [HttpGet]
        [Route("GetTownList")]
        public async Task<IActionResult> GetCityList(int id)
        {
            List<Town> list;
            try
            {
                list = await _addressService.GetTownList(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(list);

        }





    }
}
