using System;

namespace JewelryStore.Models.UserModels
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool IsTempPassword { get; set; }
        public int LoginFailureAttempts { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ? ModifiedDate { get; set; }
    }
}
