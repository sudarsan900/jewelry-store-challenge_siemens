using JewelryStore.Models.RoleModels;
using JewelryStore.Models.SettingsModels;
using JewelryStore.Models.UserModels;
using Microsoft.EntityFrameworkCore;

namespace JewelryStore.Data.Mappings
{
    public partial class JewelryStoreDBContext : DbContext
    {
        public JewelryStoreDBContext(DbContextOptions<JewelryStoreDBContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<SettingsValue> SettingsValue { get; set; }
    }
}
