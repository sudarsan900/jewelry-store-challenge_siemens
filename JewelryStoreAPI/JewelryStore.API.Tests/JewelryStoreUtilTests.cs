using JewelryStore.Util;
using System;
using System.Text;
using Xunit;

namespace JewelryStore.API.Tests
{
    public class JewelryStoreUtilTests
    {
        [Fact]
        public void EncryptionHelper_Should_Generate_Salt()
        {
            //Arrange
            var size = 10;

            //Act
            var result = EncryptionHelper.CreateSalt(size);

            //Assert
            Assert.NotNull(result);
            Assert.NotEmpty(result);
        }


        [Fact]
        public void EncryptionHelper_Should_Generate_Password_Hash()
        {
            //Arrange
            var size = 10;
            var pass = Encoding.UTF8.GetBytes("TestPassword");
            var salt = EncryptionHelper.CreateSalt(size);

            //Act
            var result = EncryptionHelper.GenerateSaltHash(pass, salt);

            //Assert
            Assert.NotNull(result);
            Assert.NotEmpty(result);
        }

        [Fact]
        public void EncryptionHelper_Should_Generate_Null()
        {
            //Arrange

            //Act
            var result = EncryptionHelper.GenerateSaltHash(null, null);

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public void EncryptionHelper_ShouldMatch_PasswordHash()
        {
            //Arrange
            var size = 10;
            var pass = Encoding.UTF8.GetBytes("TestPassword");
            var salt = EncryptionHelper.CreateSalt(size);
            var passHash1 = EncryptionHelper.GenerateSaltHash(pass, salt);
            var passHash2 = EncryptionHelper.GenerateSaltHash(pass, salt);

            //Act
            var result = EncryptionHelper.CompareByteArrays(passHash1, passHash2);

            //Assert
            Assert.True(result);
        }

        [Fact]
        public void EncryptionHelper_Should_MatchPassword()
        {
            //Arrange
            var size = 10;
            var pass = Encoding.UTF8.GetBytes("TestPassword");
            var salt = EncryptionHelper.CreateSalt(size);

            //Act
            var result = EncryptionHelper.GenerateSaltHash(pass, salt);

            //Assert
            Assert.NotNull(result);
            Assert.NotEmpty(result);
        }
    }
}
