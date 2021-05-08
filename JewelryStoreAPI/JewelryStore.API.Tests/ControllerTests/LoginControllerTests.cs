using System.Threading.Tasks;
using JewelryStore.API.Controllers;
using JewelryStore.Data.Interfaces;
using JewelryStore.Models.LoginModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace JewelryStore.API.Tests.ControllerTests
{
    public class LoginControllerTests
    {
        [Fact]
        public async Task Authentication_Should_Succeed()
        {
            //Arrange
            var loginRequest = new LoginRequest()
            {
                UserName = "normal@gmail.com",
                Password = "123"
            };

            var loginResponse = new LoginResponse()
            {
                Email = "normal@gmail.com",
                HttpStatusCode = 200,
                FirstName = "Normal",
                LastName = "User"
            };

            var loginServiceMock = new Mock<ILoginService>();
            loginServiceMock.Setup(x => x.ValidateUser(loginRequest)).
                ReturnsAsync(loginResponse);

            var configServiceMock = new Mock<IConfiguration>();
            var controller=  new LoginController(loginServiceMock.Object, configServiceMock.Object);

            //Act
            var result = (ObjectResult) await controller.Login(loginRequest);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<LoginResponse>(result.Value);
            var val = result.Value as LoginResponse;
            Assert.NotNull(val);
            Assert.Equal(loginRequest.UserName, val.Email);
        }
    }
}
