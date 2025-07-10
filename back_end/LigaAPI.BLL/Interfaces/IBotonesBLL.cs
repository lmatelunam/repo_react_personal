using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.BLL.Interfaces
{
    public interface IBotonesBLL
    {
        List<Boton> ObtenerBotones();
        Boton ObtenerBotonPorId(int botonId);
        int CrearBoton(Boton boton);
        void ActualizarBoton(Boton boton);
        void EliminarBoton(int botonId);
    }
}
