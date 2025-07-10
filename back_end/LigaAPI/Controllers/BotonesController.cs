using LigaAPI.BLL.Interfaces;
using LigaAPI.BLL.Servicios;
using LigaAPI.Entidades.Modelos;
using System;
using System.Web.Http;

namespace LigaAPI.Controllers
{
    [RoutePrefix("api/botones")]
    public class BotonesController : ApiController
    {
        private readonly IBotonesBLL _botonesBLL;

        public BotonesController()
        {
            // Instanciación directa (sin Unity)
            _botonesBLL = new BotonesBLL();
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerBotones()
        {
            try
            {
                var botones = _botonesBLL.ObtenerBotones();
                return Ok(botones);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult ObtenerBotonPorId(int id)
        {
            try
            {
                var boton = _botonesBLL.ObtenerBotonPorId(id);
                if (boton == null) return NotFound();
                return Ok(boton);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CrearBoton([FromBody] Boton boton)
        {
            try
            {
                if (boton == null) return BadRequest("Datos inválidos");

                var nuevoId = _botonesBLL.CrearBoton(boton);
                return Ok(new { boton_id = nuevoId });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult ActualizarBoton(int id, [FromBody] Boton boton)
        {
            try
            {
                if (boton == null || boton.BotonId != id)
                    return BadRequest("Datos no válidos");

                _botonesBLL.ActualizarBoton(boton);
                return Ok("Botón actualizado");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult EliminarBoton(int id)
        {
            try
            {
                _botonesBLL.EliminarBoton(id);
                return Ok("Botón eliminado");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}