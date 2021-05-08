using JewelryStore.API.Filters;
using JewelryStore.Data.Interfaces;
using JewelryStore.Models.EstimationModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JewelryStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EstimationController : ControllerBase
    {
        private readonly IEstimationService _estimationService;
        private readonly IPdfGeneratorService _pdfGeneratorService;
        public EstimationController(IEstimationService estimationService, IPdfGeneratorService pdfGeneratorService)
        {
            _estimationService = estimationService;
            _pdfGeneratorService = pdfGeneratorService;
        }

        [HttpGet("getDiscount")]
        [ProducesResponseType(typeof(DiscountResponseModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<IActionResult> GetDiscount()
        {
            string userRole = (User.Identity as ClaimsIdentity).FindFirst(ClaimTypes.Role).Value;
            string userId = (User.Identity as ClaimsIdentity).FindFirst(ClaimTypes.NameIdentifier).Value;
            DiscountResponseModel response = await _estimationService.GetDiscount(Convert.ToInt32(userId), userRole);
            return StatusCode(response.HttpStatusCode, response);
        }


        [HttpPost("printToFile")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public IActionResult PrintToFile(PrintToFileRequest request)
        {
            try
            {
                string fileName = "Estimation.pdf";
                var mimeType = "application/pdf";
                byte[] pdf = _pdfGeneratorService.PrintToFile(request);
                return File(pdf, mimeType, fileName);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}