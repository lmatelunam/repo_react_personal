using System.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LigaAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web

            // Habilitar CORS para la URL de tu React dev server
            var corsOrigin = ConfigurationManager.AppSettings["CorsOrigin"];
            var cors = new EnableCorsAttribute(corsOrigin, "*", "*");
            config.EnableCors(cors);

            // Rutas de API web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
