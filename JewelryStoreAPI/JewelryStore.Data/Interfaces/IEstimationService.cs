using System;
using System.Threading.Tasks;
using JewelryStore.Models.EstimationModels;
using JewelryStore.Models.LoginModels;

namespace JewelryStore.Data.Interfaces
{
    public interface IEstimationService
    {

        /// <summary>
        /// Interface - If the user role is Privileged get discount value
        /// </summary>
        /// <returns></returns>
        Task<DiscountResponseModel> GetDiscount(int userId, string userRole);
    }
}
