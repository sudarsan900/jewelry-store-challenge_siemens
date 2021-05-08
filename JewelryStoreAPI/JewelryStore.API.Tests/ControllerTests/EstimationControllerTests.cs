
using JewelryStore.API.Controllers;
using JewelryStore.Data.Interfaces;
using JewelryStore.Models.EstimationModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStore.API.Tests.ControllerTests
{
    public class EstimationControllerTests
    {
        [Fact]
        public async Task ShouldReturn_DiscountValue_For_Privileged()
        {
            //Arrange
            var role = "Privileged";
            var discount = 2;

            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Role, role),
                        new Claim(ClaimTypes.NameIdentifier, "1")
                    },"mock"));
            var estimationService = new Mock<IEstimationService>();
            estimationService.Setup(o => o.GetDiscount(
                It.IsAny<int>(), role))
                .ReturnsAsync(new DiscountResponseModel()
                {
                    Discount = discount,
                    Status = true,
                    HttpStatusCode = 200,
                });
            var pdfGeneratorService = new Mock<IPdfGeneratorService>();
            var controller = new EstimationController(estimationService.Object, pdfGeneratorService.Object);
            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            //Act
            var result = (ObjectResult) await controller.GetDiscount();

            //Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<DiscountResponseModel>(result.Value);
            var val = result.Value as DiscountResponseModel;
            Assert.NotNull(val);
            Assert.Equal(discount, val.Discount);
        }


        [Fact]
        public async Task ShouldNotReturn_DiscountValue_For_Regular()
        {
            //Arrange
            var role = "Normal";
            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Role, role),
                        new Claim(ClaimTypes.NameIdentifier, "1")
                    }, "mock"));
            var estimationService = new Mock<IEstimationService>();
            estimationService.Setup(o => o.GetDiscount(
                It.IsAny<int>(), role))
                .ReturnsAsync(new DiscountResponseModel()
                {
                    Status = true,
                    HttpStatusCode = 200,
                });
            var pdfGeneratorService = new Mock<IPdfGeneratorService>();
            var controller = new EstimationController(estimationService.Object, pdfGeneratorService.Object);
            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            //Act
            var result = (ObjectResult)await controller.GetDiscount();

            //Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<DiscountResponseModel>(result.Value);
            var val = result.Value as DiscountResponseModel;
            Assert.NotNull(val);
            Assert.Equal(0, val.Discount);
        }

        //[Fact]
        //public void PrintToFile_Should_Generate_PDF()
        //{
        //    //Arrange
        //    var request = new PrintToFileRequest()
        //    {
        //        GoldPrice = 5000,
        //        Weight = 1,
        //        Discount = 0,
        //        TotalPrice = 5000
        //    };

        //    //Act
        //    var result = PDFGenerator.PrintToFile(request);

        //    //Assert
        //    Assert.NotNull(result);
        //    Assert.NotEmpty(result);
        //}

        [Fact]
        public void PrintToFile_Should_Print_PDF()
        {
            var request = new PrintToFileRequest()
            {
                GoldPrice = 5000,
                Weight = 1,
                Discount = 0,
                TotalPrice = 5000
            };
            //Arrange
            var estimationService = new Mock<IEstimationService>();
            var pdfGeneratorService = new Mock<IPdfGeneratorService>();
            var controller = new EstimationController(estimationService.Object, pdfGeneratorService.Object);

            //Act
            var result = (FileContentResult) controller.PrintToFile(request);

            //Assert
            Assert.NotNull(result);
            Assert.Equal("application/pdf", result.ContentType);
        }

        [Fact]
        public void PrintToFile_Should_Throw_Exception()
        {
            //Arrange
            var estimationService = new Mock<IEstimationService>();
            var pdfGeneratorService = new Mock<IPdfGeneratorService>();
            pdfGeneratorService.Setup(repo => repo.PrintToFile(null))
            .Throws(new NullReferenceException());
            var controller = new EstimationController(estimationService.Object, pdfGeneratorService.Object);

            //Act
            var result = (StatusCodeResult) controller.PrintToFile(null);


            //Assert
            Assert.Equal(500, result.StatusCode);

        }
    }
}
