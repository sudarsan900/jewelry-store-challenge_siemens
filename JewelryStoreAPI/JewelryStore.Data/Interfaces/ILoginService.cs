
using JewelryStore.Models.LoginModels;
using System.Threading.Tasks;

namespace JewelryStore.Data.Interfaces
{
    public interface ILoginService
    {

        /// <summary>
        /// Interface to authenticate an user if user pass a valid credential
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        Task<LoginResponse> ValidateUser(LoginRequest loginRequest);
    }
}
