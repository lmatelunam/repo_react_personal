using LigaAPI.BLL.Interfaces;
using LigaAPI.BLL.Servicios;
using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace LigaAPI.Controllers
{
    [RoutePrefix("api/perfiles")]
    public class PerfilesController : ApiController
    {
        private readonly IPerfilBLL _perfilBLL;

        public PerfilesController()
        {
            _perfilBLL = new PerfilBLL();
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerPerfiles()
        {
            try
            {
                var perfiles = _perfilBLL.ObtenerPerfiles();
                return Ok(perfiles);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult ObtenerPerfilPorId(int id)
        {
            try
            {
                var perfil = _perfilBLL.ObtenerPerfilPorId(id);
                if (perfil == null) return NotFound();
                return Ok(perfil);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CrearPerfil([FromBody] Perfil perfil)
        {
            try
            {
                if (perfil == null) return BadRequest("Datos inválidos");

                var nuevoId = _perfilBLL.CrearPerfil(perfil);
                return Ok(new { perfil_id = nuevoId });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult ActualizarPerfil(int id, [FromBody] Perfil perfil)
        {
            try
            {
                if (perfil == null || perfil.PerfilId != id)
                    return BadRequest("Datos no válidos");

                _perfilBLL.ActualizarPerfil(perfil);
                return Ok("Perfil actualizado");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult EliminarPerfil(int id)
        {
            try
            {
                _perfilBLL.EliminarPerfil(id);
                return Ok("Perfil eliminado");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}