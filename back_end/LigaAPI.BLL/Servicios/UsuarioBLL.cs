using LigaAPI.BLL.Interfaces;
using LigaAPI.DAL.Interfaces;
using LigaAPI.DAL.Repositorios;
using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.BLL.Servicios
{
    public class UsuarioBLL : IUsuarioBLL
    {
        private readonly IUsuarioDAL _usuarioDAL;

        public UsuarioBLL()
        {
            // No usamos DI por Unity, así que instanciamos directamente:
            _usuarioDAL = new UsuarioDAL();
        }

        public List<Usuario> ObtenerUsuarios()
        {
            return _usuarioDAL.ObtenerUsuarios();
        }

        public Usuario ObtenerUsuarioPorId(int usuarioId)
        {
            return _usuarioDAL.ObtenerUsuarioPorId(usuarioId);
        }

        public int CrearUsuario(Usuario usuario)
        {
            // Aquí podrías aplicar reglas de validación si fuera necesario
            return _usuarioDAL.CrearUsuario(usuario);
        }

        public void ActualizarUsuario(Usuario usuario)
        {
            _usuarioDAL.ActualizarUsuario(usuario);
        }

        public void EliminarUsuario(int usuarioId)
        {
            _usuarioDAL.EliminarUsuario(usuarioId);
        }

        public Usuario AutenticarUsuario(string nombreUsuario)
        {
            return _usuarioDAL.AutenticarUsuario(nombreUsuario);
        }
    }
}
