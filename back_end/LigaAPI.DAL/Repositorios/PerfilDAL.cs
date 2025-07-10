using LigaAPI.DAL.Interfaces;
using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.DAL.Repositorios
{
    public class PerfilDAL : IPerfilDAL
    {
        private readonly string connectionString;

        public PerfilDAL()
        {
            connectionString = ConfigurationManager.ConnectionStrings["LigaDb"].ConnectionString;
        }

        public List<Perfil> ObtenerPerfiles()
        {
            var lista = new List<Perfil>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("SELECT perfil_id, nombre_perfil, descripcion FROM Perfiles", conn))
            {
                conn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        lista.Add(new Perfil
                        {
                            PerfilId = Convert.ToInt32(dr["perfil_id"]),
                            NombrePerfil = dr["nombre_perfil"].ToString(),
                            Descripcion = dr["descripcion"].ToString()
                        });
                    }
                }
            }

            return lista;
        }

        public Perfil ObtenerPerfilPorId(int id)
        {
            Perfil perfil = null;

            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("SELECT perfil_id, nombre_perfil, descripcion FROM Perfiles WHERE perfil_id = @id", conn))
            {
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.Read())
                    {
                        perfil = new Perfil
                        {
                            PerfilId = Convert.ToInt32(dr["perfil_id"]),
                            NombrePerfil = dr["nombre_perfil"].ToString(),
                            Descripcion = dr["descripcion"].ToString()
                        };
                    }
                }
            }

            return perfil;
        }

        public int CrearPerfil(Perfil perfil)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("INSERT INTO Perfiles (nombre_perfil, descripcion) VALUES (@nombre, @descripcion); SELECT SCOPE_IDENTITY();", conn))
            {
                cmd.Parameters.AddWithValue("@nombre", perfil.NombrePerfil);
                cmd.Parameters.AddWithValue("@descripcion", (object)perfil.Descripcion ?? DBNull.Value);
                conn.Open();
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public void ActualizarPerfil(Perfil perfil)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("UPDATE Perfiles SET nombre_perfil = @nombre, descripcion = @descripcion WHERE perfil_id = @id", conn))
            {
                cmd.Parameters.AddWithValue("@id", perfil.PerfilId);
                cmd.Parameters.AddWithValue("@nombre", perfil.NombrePerfil);
                cmd.Parameters.AddWithValue("@descripcion", (object)perfil.Descripcion ?? DBNull.Value);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarPerfil(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Perfiles WHERE perfil_id = @id", conn))
            {
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
