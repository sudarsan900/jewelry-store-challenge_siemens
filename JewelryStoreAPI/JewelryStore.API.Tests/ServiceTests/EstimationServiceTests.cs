using JewelryStore.Data.Mappings;
using JewelryStore.Data.Services;
using JewelryStore.Models.SettingsModels;
using JewelryStore.Models.UserModels;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace JewelryStore.API.Tests.ServiceTests
{
    public class EstimationServiceTests
    {
        [Fact]
        public async Task ShouldReturn_Discount()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<JewelryStoreDBContext>()
            .UseInMemoryDatabase(databaseName: "JewelryStoreDB1")
            .Options;

           
            // Insert seed data into the database using one instance of the context
            using (var context = new JewelryStoreDBContext(options))
            {
                context.Users.Add(new User()
                {
                    UserId = 1,
                    FirstName = "Privileged",
                    LastName = "User",
                    Email = It.IsAny<string>(),
                    PasswordHash = It.IsAny<byte[]>(),
                    PasswordSalt = It.IsAny<byte[]>()
                });

                context.SettingsValue.Add(new SettingsValue() { 
                    UID=1,
                    SettingsId=1,
                    Value="2"
                });

                context.SaveChanges();
            }
            var service = new EstimationService(new JewelryStoreDBContext(options));

            // Act
            var result = await service.GetDiscount(1, "Privileged");

            Assert.Equal(2, result.Discount);

        }

        [Fact]
        public async Task ShouldNotReturn_Discount_If_Not_Privileged()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<JewelryStoreDBContext>()
            .UseInMemoryDatabase(databaseName: "JewelryStoreDB2")
            .Options;


            // Insert seed data into the database using one instance of the context
            using (var context = new JewelryStoreDBContext(options))
            {
                context.Users.Add(new User()
                {
                    UserId = 1,
                    FirstName = "Normal",
                    LastName = "User",
                    Email = It.IsAny<string>(),
                    PasswordHash = It.IsAny<byte[]>(),
                    PasswordSalt = It.IsAny<byte[]>()
                });

                context.SettingsValue.Add(new SettingsValue()
                {
                    UID = 1,
                    SettingsId = 1,
                    Value = "2"
                });

                context.SaveChanges();
            }
            var service = new EstimationService(new JewelryStoreDBContext(options));

            // Act
            var result = await service.GetDiscount(1, "Normal");
            Assert.Equal(0, result.Discount);
        }
    }
}
