using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics.CodeAnalysis;

namespace JewelryStore.API.Filters
{

    [ExcludeFromCodeCoverage]
    public class ModelValidationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context != null && !context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState); // returns 400 with error
            }
        }
    }
}
