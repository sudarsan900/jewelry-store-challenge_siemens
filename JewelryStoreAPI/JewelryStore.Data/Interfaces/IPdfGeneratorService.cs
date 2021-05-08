using JewelryStore.Models.EstimationModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace JewelryStore.Data.Interfaces
{
    public interface IPdfGeneratorService
    {
        /// <summary>
        /// Interface to printToFile click download PDF
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        byte[] PrintToFile(PrintToFileRequest request);
    }
}
