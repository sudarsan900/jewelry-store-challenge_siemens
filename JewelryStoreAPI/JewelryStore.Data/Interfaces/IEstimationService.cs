using System;
using System.Threading.Tasks;
using JewelryStore.Models.EstimationModels;
using JewelryStore.Models.LoginModels;

namespace JewelryStore.Data.Interfaces
{
    public interface IEstimationService
    {
        Task<DiscountResponseModel> GetDiscount(int userId, string userRole);
    }
}
