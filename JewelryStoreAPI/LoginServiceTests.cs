using System;
using JewelryStore.Data.Services;

namespace JewelryStore.API.Tests.Services
{
    public class LoginServiceTests
    {
        private readonly LoginService _service;
        public LoginServiceTests()
        {
            _service = new LoginService();
        }
    }
}
