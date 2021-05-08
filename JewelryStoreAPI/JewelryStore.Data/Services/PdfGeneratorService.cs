using JewelryStore.Data.Interfaces;
using JewelryStore.Models.EstimationModels;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using System.IO;

namespace JewelryStore.Data.Services
{
    public class PdfGeneratorService : IPdfGeneratorService
    {
        public byte[] PrintToFile(PrintToFileRequest request)
        {
            MemoryStream stream = new MemoryStream();
            PdfDocument document = new PdfDocument();
            document.Info.Title = "Estimation";

            // Create an empty page
            PdfPage page = document.AddPage();

            // Get an XGraphics object for drawing
            XGraphics gfx = XGraphics.FromPdfPage(page);

            // Create a font
            XFont font = new XFont("Verdana", 18, XFontStyle.Regular);

            int marginsTop = 50;

            // Draw the text
            gfx.DrawString("Gold Price (per gram):", font, XBrushes.DarkSlateGray, 30, marginsTop);
            gfx.DrawString(request.GoldPrice.ToString(), font, XBrushes.DarkSlateGray, 250, marginsTop);

            marginsTop += 35;
            gfx.DrawString("Weight (grams):", font, XBrushes.DarkSlateGray, 30, marginsTop);
            gfx.DrawString(request.Weight.ToString(), font, XBrushes.DarkSlateGray, 250, marginsTop);

            if (request.Discount > 0)
            {
                marginsTop += 35;
                gfx.DrawString("Discount %:", font, XBrushes.DarkSlateGray, 30, marginsTop);
                gfx.DrawString(string.Format("{0} %", request.Discount.ToString()), font, XBrushes.DarkSlateGray, 250, marginsTop);
            }

            marginsTop += 35;
            gfx.DrawString("Total Price:", font, XBrushes.DarkSlateGray, 30, marginsTop);
            gfx.DrawString(request.TotalPrice.ToString(), font, XBrushes.DarkSlateGray, 250, marginsTop);

            document.Save(stream, false);
            byte[] bytes = stream.ToArray();
            return bytes;
        }
    }
}
