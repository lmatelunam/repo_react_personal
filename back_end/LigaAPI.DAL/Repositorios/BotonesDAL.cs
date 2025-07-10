using LigaAPI.DAL.Interfaces;
using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace LigaAPI.DAL.Repositorios
{
    public class BotonesDAL : IBotonesDAL
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["LigaDb"].ConnectionString;

        public List<Boton> ObtenerBotones()
        {
            var lista = new List<Boton>();

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_ObtenerBotones", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new Boton
                        {
                            BotonId = Convert.ToInt32(reader["boton_id"]),
                            NombreBoton = reader["nombre_boton"].ToString(),
                            Descripcion = reader["descripcion"].ToString()
                        });
                    }
                }
            }

            return lista;
        }

        public Boton ObtenerBotonPorId(int botonId)
        {
            Boton boton = null;

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_ObtenerBotonPorId", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@boton_id", botonId);
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        boton = new Boton
                        {
                            BotonId = Convert.ToInt32(reader["boton_id"]),
                            NombreBoton = reader["nombre_boton"].ToString(),
                            Descripcion = reader["descripcion"].ToString()
                        };
                    }
                }
            }

            return boton;
        }

        public int CrearBoton(Boton boton)
        {
            int nuevoId = 0;

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_CrearBoton", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre_boton", boton.NombreBoton);
                cmd.Parameters.AddWithValue("@descripcion", boton.Descripcion ?? (object)DBNull.Value);

                conn.Open();
                nuevoId = Convert.ToInt32(cmd.ExecuteScalar());
            }

            return nuevoId;
        }

        public void ActualizarBoton(Boton boton)
        {
            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_ActualizarBoton", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@boton_id", boton.BotonId);
                cmd.Parameters.AddWithValue("@nombre_boton", boton.NombreBoton);
                cmd.Parameters.AddWithValue("@descripcion", boton.Descripcion ?? (object)DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarBoton(int botonId)
        {
            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_EliminarBoton", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@boton_id", botonId);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
