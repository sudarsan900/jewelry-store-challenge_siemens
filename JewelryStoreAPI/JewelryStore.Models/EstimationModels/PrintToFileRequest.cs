using System;
using System.ComponentModel.DataAnnotations;

namespace JewelryStore.Models.EstimationModels
{
    public class PrintToFileRequest
    {
        [Required]
        public decimal GoldPrice { get; set; }

        [Required]
        public decimal Weight { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }
        public int? Discount { get; set; }
    }
}
