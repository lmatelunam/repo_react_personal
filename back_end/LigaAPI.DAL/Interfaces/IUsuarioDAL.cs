using LigaAPI.Entidades.Modelos;
using System.Collections.Generic;

namespace LigaAPI.DAL.Interfaces
{
    public interface IUsuarioDAL
    {
        List<Usuario> ObtenerUsuarios();
        Usuario ObtenerUsuarioPorId(int usuarioId);
        int CrearUsuario(Usuario usuario);
        void ActualizarUsuario(Usuario usuario);
        void EliminarUsuario(int usuarioId);
        Usuario AutenticarUsuario(string nombreUsuario);
    }
}
