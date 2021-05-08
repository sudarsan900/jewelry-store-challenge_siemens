using JewelryStore.Models.EstimationModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace JewelryStore.Data.Interfaces
{
    public interface IPdfGeneratorService
    {
        byte[] PrintToFile(PrintToFileRequest request);
    }
}
