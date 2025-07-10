using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.Entidades.Modelos
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set; }
        public string PasswordHash { get; set; }
        public int PerfilId { get; set; }
        public string NombrePerfil { get; set; } // viene del JOIN con Perfiles
        public string Estado { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public string ImagenUrl { get; set; }
    }
}
