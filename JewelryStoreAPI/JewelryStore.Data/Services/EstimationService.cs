using System;
using System.Linq;
using System.Threading.Tasks;
using JewelryStore.Data.Interfaces;
using JewelryStore.Data.Mappings;
using JewelryStore.Models.Enums;
using JewelryStore.Models.EstimationModels;
using JewelryStore.Models.SettingsModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace JewelryStore.Data.Services
{
    public class EstimationService : IEstimationService
    {
        private readonly JewelryStoreDBContext _context;
        public EstimationService(JewelryStoreDBContext context)
        {
            _context = context;
        }

        public async Task<DiscountResponseModel> GetDiscount(int userId, string userRole)
        {
            DiscountResponseModel response = new DiscountResponseModel();
            try
            {
                // get discounts only for Privileged users
                if (userRole == nameof(UserRoles.Privileged))
                {
                    // read discount value from db
                    SettingsValue discount = await _context.SettingsValue.Where(o => o.SettingsId == (int)AppSettings.PrivilegeDiscount).FirstOrDefaultAsync();
                    if (discount != null)
                    {
                        response.Discount = Convert.ToInt32(discount.Value);
                    }
                    response.Message = "Success";

                }
                else
                {
                    response.Message = "Discount is available only for Privileged";
                }
                response.Status = true;
                response.HttpStatusCode = StatusCodes.Status200OK;
            }
            catch (Exception ex)
            {
                response.Message = "Oop`s something went wrog";
                response.HttpStatusCode = StatusCodes.Status500InternalServerError;
            }
            return response;
        }
    }
}
