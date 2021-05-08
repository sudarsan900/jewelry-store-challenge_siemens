using JewelryStore.Data.Interfaces;
using JewelryStore.Models.LoginModels;
using JewelryStore.Util;
using System.Text;
using System.Threading.Tasks;
using JewelryStore.Data.Mappings;
using JewelryStore.Models.UserModels;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace JewelryStore.Data.Services
{
    public class LoginService : ILoginService
    {
        private readonly JewelryStoreDBContext _context;
        public LoginService(JewelryStoreDBContext context)
        {
            _context = context;
        }
        public async Task<LoginResponse> ValidateUser(LoginRequest loginRequest)
        {
            LoginResponse response = new LoginResponse();
            try
            {
                User user = await _context.Users.Where(o => o.Email == loginRequest.UserName).FirstOrDefaultAsync();
                // validate user
                if (user == null)
                {
                    response.Message = "User not found";
                    return response;
                }

                // validate Password
                var hash = EncryptionHelper.GenerateSaltHash(Encoding.UTF8.GetBytes(loginRequest.Password), user.PasswordSalt);
                if (EncryptionHelper.CompareByteArrays(hash, user.PasswordHash))
                {
                    // get role
                    var role = await _context.UserRoles
                        .Join(
                        _context.Roles, ur => ur.RoleId, r => r.RoleId, (ur, r) =>
                         new
                        {
                            ur.UserId,
                            ur.RoleId,
                            r.RoleDescription
                        })
                        .Where(o => o.UserId == user.UserId).FirstOrDefaultAsync();
                    // validate role
                    if (role == null)
                    {
                        response.Message = "Role is not assigned to the User";
                        return response;
                    }
                    // return success response
                    response.Status = true;
                    response.Message = "Login Success";
                    response.HttpStatusCode = StatusCodes.Status200OK;
                    response.UserId = user.UserId;
                    response.FirstName = user.FirstName;
                    response.LastName = user.LastName;
                    response.Email = user.Email;
                    response.Role = role.RoleDescription;
                }
                else
                {
                    response.Message = "Not a valid Password";
                }
            }
            catch(Exception ex)
            {
                response.Message = "Oop`s something went wrog";
                response.HttpStatusCode = StatusCodes.Status500InternalServerError;
            }

            return response;
        }
    }
}
