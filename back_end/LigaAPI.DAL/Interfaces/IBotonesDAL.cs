using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.DAL.Interfaces
{
    public interface IBotonesDAL
    {
        List<Boton> ObtenerBotones();
        Boton ObtenerBotonPorId(int botonId);
        int CrearBoton(Boton boton);
        void ActualizarBoton(Boton boton);
        void EliminarBoton(int botonId);
    }
}
