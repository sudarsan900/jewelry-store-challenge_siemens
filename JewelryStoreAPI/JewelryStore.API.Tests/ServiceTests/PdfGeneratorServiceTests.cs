using JewelryStore.Data.Services;
using JewelryStore.Models.EstimationModels;
using Xunit;

namespace JewelryStore.API.Tests.ServiceTests
{
    public class PdfGeneratorServiceTests
    {
        [Fact]
        public void Should_Generate_PDF()
        {
            // Arrange
            var request = new PrintToFileRequest()
            {
                GoldPrice = 10,
                Weight = 10,
                Discount = 2,
                TotalPrice = 98
            };
            var service = new PdfGeneratorService();

            // Act
            var pdfByte = service.PrintToFile(request);

            // Assert
            Assert.NotNull(pdfByte);
            Assert.NotEmpty(pdfByte);
        }
    }
}
