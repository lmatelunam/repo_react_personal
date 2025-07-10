using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.BLL.Interfaces
{
    public interface IUsuarioBLL
    {
        List<Usuario> ObtenerUsuarios();
        Usuario ObtenerUsuarioPorId(int usuarioId);
        int CrearUsuario(Usuario usuario);
        void ActualizarUsuario(Usuario usuario);
        void EliminarUsuario(int usuarioId);
        Usuario AutenticarUsuario(string nombreUsuario);
    }
}
