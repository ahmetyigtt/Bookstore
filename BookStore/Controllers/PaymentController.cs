using Bookstore.Models.ViewModels;
using Bookstore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{

    

    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentService _paymentService;

        public PaymentController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }


        [HttpGet]
        [Route("GetPaymentTotal")]
        public async Task<IActionResult> GetTotal()
        {
            int totalprice = await _paymentService.GetTotalPrice();
            return Ok(totalprice);
        }

        [HttpPost]
        [Route("ComplatePayment")]
        public async Task<IActionResult> ComplatePayment(PaymentInfoVM paymentInfoVM)
        {

            try
            {
                await _paymentService.CompletePayment(paymentInfoVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok("Payment successful");

        }
  

        }
      
}
