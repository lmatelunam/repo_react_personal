using System.Web.Http;
using WebActivatorEx;
using Swashbuckle.Application;

[assembly: PreApplicationStartMethod(typeof(LigaAPI.App_Start.SwaggerConfig), "Register")]

namespace LigaAPI.App_Start
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "LigaAPI");
                })
                .EnableSwaggerUi();
        }
    }
}
