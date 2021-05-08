using JewelryStore.API.Filters;
using JewelryStore.Data.Interfaces;
using JewelryStore.Data.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics.CodeAnalysis;

namespace JewelryStore.API.App_Start
{
    [ExcludeFromCodeCoverage]
    internal static class RegisterServiceConfig
    {
        internal static void RegisterDependency(this IServiceCollection services)
        {
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IEstimationService, EstimationService>();
            services.AddSingleton<IPdfGeneratorService, PdfGeneratorService>();


            // Register Filter Attributes
            services.AddScoped<ModelValidationAttribute>();
        }
    }
}
