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
    public class BotonesBLL : IBotonesBLL
    {
        private readonly IBotonesDAL _botonesDAL;

        public BotonesBLL()
        {
            // Instanciación directa (sin DI)
            _botonesDAL = new BotonesDAL();
        }

        public List<Boton> ObtenerBotones()
        {
            return _botonesDAL.ObtenerBotones();
        }

        public Boton ObtenerBotonPorId(int botonId)
        {
            return _botonesDAL.ObtenerBotonPorId(botonId);
        }

        public int CrearBoton(Boton boton)
        {
            // Aquí puedes validar antes de crear si quieres
            return _botonesDAL.CrearBoton(boton);
        }

        public void ActualizarBoton(Boton boton)
        {
            _botonesDAL.ActualizarBoton(boton);
        }

        public void EliminarBoton(int botonId)
        {
            _botonesDAL.EliminarBoton(botonId);
        }
    }
}
