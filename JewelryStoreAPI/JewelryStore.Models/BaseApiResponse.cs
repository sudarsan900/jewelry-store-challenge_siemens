using System.Collections.Generic;

namespace JewelryStore.Models
{
    public class BaseApiResponse
    {
        public BaseApiResponse()
        {
            HttpStatusCode = 400; // Default Bad Request
        }
        public bool Status { get; set; }
        public int StatusId { get; set; }
        public string StatusCode { get; set; }
        public int HttpStatusCode { get; set; }
        public string Message { get; set; }
        public List<string> Messages { get; set; }
    }
}
