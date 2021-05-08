
using JewelryStore.Models.LoginModels;
using System.Threading.Tasks;

namespace JewelryStore.Data.Interfaces
{
    public interface ILoginService
    {
        Task<LoginResponse> ValidateUser(LoginRequest loginRequest);
    }
}
