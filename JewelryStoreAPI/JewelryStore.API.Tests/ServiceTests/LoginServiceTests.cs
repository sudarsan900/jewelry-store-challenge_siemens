using JewelryStore.Data.Mappings;
using JewelryStore.Data.Services;
using JewelryStore.Models.LoginModels;
using JewelryStore.Models.RoleModels;
using JewelryStore.Models.UserModels;
using JewelryStore.Util;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStore.API.Tests.ServiceTests
{
    public class LoginServiceTests
    {
        [Fact]
        public async Task ShouldReturn_UserInfo()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<JewelryStoreDBContext>()
            .UseInMemoryDatabase(databaseName: "JewelryStoreDB3")
            .Options;

            var size = 10;
            var password = "TestPassword";
            var username = "normal@gmail.com";
            var salt = EncryptionHelper.CreateSalt(size);
            var pass = EncryptionHelper.GenerateSaltHash(Encoding.UTF8.GetBytes(password), salt);

            // Insert seed data into the database using one instance of the context
            using (var context = new JewelryStoreDBContext(options))
            {
                context.Users.Add(new User()
                {
                    UserId = 1,
                    FirstName = "Normal",
                    LastName = "User",
                    Email = username,
                    PasswordHash = pass,
                    PasswordSalt = salt
                });

                context.Roles.Add(new Role()
                {
                    RoleId = 1,
                    RoleDescription = "Normal"
                });

                context.UserRoles.Add(new UserRole()
                {
                    RoleId = 1,
                    UserId = 1
                });
                context.SaveChanges();
            }
            var service = new LoginService(new JewelryStoreDBContext(options));

            // Act
            var loginResp = await service.ValidateUser(new LoginRequest()
            {
                Password = password,
                UserName = username
            });

            Assert.NotNull(loginResp);
            Assert.True(loginResp.Status);
            Assert.Equal(username, loginResp.Email);

        }
    }
}
