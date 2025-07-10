using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.DAL.Interfaces
{
    public interface IPerfilDAL
    {
        List<Perfil> ObtenerPerfiles();
        Perfil ObtenerPerfilPorId(int id);
        int CrearPerfil(Perfil perfil);
        void ActualizarPerfil(Perfil perfil);
        void EliminarPerfil(int id);
    }
}
