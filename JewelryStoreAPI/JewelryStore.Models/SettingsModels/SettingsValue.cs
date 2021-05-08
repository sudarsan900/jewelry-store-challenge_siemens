using System.ComponentModel.DataAnnotations;

namespace JewelryStore.Models.SettingsModels
{
    public class SettingsValue
    {
        [Key]
        public int UID { get; set; }
        public int SettingsId { get; set; }
        public string Value { get; set; }
    }
}
