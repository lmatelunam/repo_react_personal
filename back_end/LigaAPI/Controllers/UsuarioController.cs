using LigaAPI.BLL.Interfaces;
using LigaAPI.BLL.Servicios;
using LigaAPI.Entidades.Modelos;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LigaAPI.Controllers
{

    [RoutePrefix("api/usuarios")]
    public class UsuarioController : ApiController
    {
        private readonly IUsuarioBLL _usuarioBLL;

        public UsuarioController()
        {       
            // Instanciación directa (sin Unity)
            _usuarioBLL = new UsuarioBLL();
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerUsuarios()
        {
            try
            {
                var usuarios = _usuarioBLL.ObtenerUsuarios();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult ObtenerUsuarioPorId(int id)
        {
            try
            {
                var usuario = _usuarioBLL.ObtenerUsuarioPorId(id);
                if (usuario == null) return NotFound();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CrearUsuario([FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null) return BadRequest("Datos inválidos");

                var nuevoId = _usuarioBLL.CrearUsuario(usuario);
                return Ok(new { usuario_id = nuevoId });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult ActualizarUsuario(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null || usuario.UsuarioId != id)
                    return BadRequest("Datos no válidos");

                _usuarioBLL.ActualizarUsuario(usuario);
                return Ok("Usuario actualizado");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult EliminarUsuario(int id)
        {
            try
            {
                _usuarioBLL.EliminarUsuario(id);
                return Ok("Usuario eliminado");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("autenticar")]
        public IHttpActionResult Autenticar([FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null || string.IsNullOrWhiteSpace(usuario.NombreUsuario))
                    return BadRequest("Nombre de usuario requerido");

                var resultado = _usuarioBLL.AutenticarUsuario(usuario.NombreUsuario);
                if (resultado == null) return Unauthorized();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("guardarUsuarioImagen")]
        public async Task<IHttpActionResult> GuardarUsuarioImagen()
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                    return BadRequest("La solicitud no contiene multipart/form-data");

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                string imagenUrl = null;

                // Procesar imagen
                foreach (var content in provider.Contents)
                {
                    if (content.Headers.ContentDisposition.Name.Trim('"') == "imagen" &&
                        content.Headers.ContentDisposition.FileName != null)
                    {
                        var buffer = await content.ReadAsByteArrayAsync();
                        var fileName = Guid.NewGuid().ToString() +
                                       Path.GetExtension(content.Headers.ContentDisposition.FileName.Trim('"'));

                        var uploadsPath = HttpContext.Current.Server.MapPath("~/uploads/");
                        if (!Directory.Exists(uploadsPath))
                            Directory.CreateDirectory(uploadsPath);

                        var fullPath = Path.Combine(uploadsPath, fileName);
                        File.WriteAllBytes(fullPath, buffer);

                        imagenUrl = "/uploads/" + fileName;
                    }
                }

                // Procesar campos
                string nombreUsuario = null;
                string password = null;
                string estado = "activo";
                int perfilId = 0;

                foreach (var content in provider.Contents)
                {
                    if (content.Headers.ContentDisposition.DispositionType != "form-data" ||
                        content.Headers.ContentDisposition.FileName != null)
                        continue; // saltar archivos

                    var key = content.Headers.ContentDisposition.Name.Trim('"');
                    var value = await content.ReadAsStringAsync();

                    switch (key)
                    {
                        case "NombreUsuario":
                            nombreUsuario = value;
                            break;
                        case "Password":
                            password = value;
                            break;
                        case "PerfilId":
                            int.TryParse(value, out perfilId);
                            break;
                        case "Estado":
                            estado = value;
                            break;
                    }
                }

                if (string.IsNullOrWhiteSpace(nombreUsuario) || string.IsNullOrWhiteSpace(password))
                    return BadRequest("NombreUsuario y Password son obligatorios.");

                // Construcción del objeto Usuario
                var usuario = new Usuario
                {
                    NombreUsuario = nombreUsuario,
                    PasswordHash = password,
                    PerfilId = perfilId,
                    Estado = estado,
                    ImagenUrl = imagenUrl
                };

                // Guardar en BD con BLL + SP
                int nuevoId = _usuarioBLL.CrearUsuario(usuario); // llama a tu DAL que ejecuta `sp_CrearUsuario`

                return Ok(new { usuario_id = nuevoId, imagen = usuario.ImagenUrl });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("actualizarUsuarioImagen/{id:int}")]
        public async Task<IHttpActionResult> ActualizarUsuarioImagen(int id)
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                    return BadRequest("La solicitud no contiene datos multipart/form-data");

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                string imagenUrl = null;

                // Procesar archivo imagen
                foreach (var content in provider.Contents)
                {
                    if (content.Headers.ContentDisposition.Name.Trim('"') == "imagen" &&
                        content.Headers.ContentDisposition.FileName != null)
                    {
                        var buffer = await content.ReadAsByteArrayAsync();
                        var fileName = Guid.NewGuid().ToString() +
                                       Path.GetExtension(content.Headers.ContentDisposition.FileName.Trim('"'));

                        var uploadsPath = HttpContext.Current.Server.MapPath("~/uploads/");
                        if (!Directory.Exists(uploadsPath))
                            Directory.CreateDirectory(uploadsPath);

                        var fullPath = Path.Combine(uploadsPath, fileName);
                        File.WriteAllBytes(fullPath, buffer);

                        imagenUrl = "/uploads/" + fileName;
                    }
                }

                // Procesar campos del formulario
                string nombreUsuario = null;
                string password = null;
                string estado = "activo";
                int perfilId = 0;

                foreach (var content in provider.Contents)
                {
                    if (content.Headers.ContentDisposition.DispositionType != "form-data" ||
                        content.Headers.ContentDisposition.FileName != null)
                        continue;

                    var key = content.Headers.ContentDisposition.Name.Trim('"');
                    var value = await content.ReadAsStringAsync();

                    switch (key)
                    {
                        case "NombreUsuario":
                            nombreUsuario = value;
                            break;
                        case "Password":
                            password = value;
                            break;
                        case "PerfilId":
                            int.TryParse(value, out perfilId);
                            break;
                        case "Estado":
                            estado = value;
                            break;
                    }
                }

                if (string.IsNullOrWhiteSpace(nombreUsuario) || string.IsNullOrWhiteSpace(password))
                    return BadRequest("NombreUsuario y Password son obligatorios.");

                // Construcción del objeto Usuario
                var usuario = new Usuario
                {
                    UsuarioId = id,
                    NombreUsuario = nombreUsuario,
                    PasswordHash = password,
                    PerfilId = perfilId,
                    Estado = estado,
                    ImagenUrl = imagenUrl
                };

                // Llamar a la capa BLL/DAL que ejecuta sp_ActualizarUsuario
                _usuarioBLL.ActualizarUsuario(usuario);

                return Ok("Usuario actualizado con imagen correctamente.");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



    }
}