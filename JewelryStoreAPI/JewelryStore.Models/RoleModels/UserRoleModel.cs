using System;
using System.ComponentModel.DataAnnotations;

namespace JewelryStore.Models.RoleModels
{
    public class UserRole
    {
        [Key]
        public int UID { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
    }
}
