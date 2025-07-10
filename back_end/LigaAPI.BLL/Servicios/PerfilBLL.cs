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
    public class PerfilBLL : IPerfilBLL
    {
        private readonly IPerfilDAL _perfilDAL;

        public PerfilBLL()
        {
            _perfilDAL = new PerfilDAL();
        }

        public List<Perfil> ObtenerPerfiles()
        {
            return _perfilDAL.ObtenerPerfiles();
        }

        public Perfil ObtenerPerfilPorId(int id)
        {
            return _perfilDAL.ObtenerPerfilPorId(id);
        }

        public int CrearPerfil(Perfil perfil)
        {
            return _perfilDAL.CrearPerfil(perfil);
        }

        public void ActualizarPerfil(Perfil perfil)
        {
            _perfilDAL.ActualizarPerfil(perfil);
        }

        public void EliminarPerfil(int id)
        {
            _perfilDAL.EliminarPerfil(id);
        }
    }
}
