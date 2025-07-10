using LigaAPI.DAL.Interfaces;
using LigaAPI.Entidades.Modelos;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.DAL.Repositorios
{
    public class UsuarioDAL : IUsuarioDAL
    {
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["LigaDb"].ConnectionString; 

        public List<Usuario> ObtenerUsuarios()
        {
            var lista = new List<Usuario>();

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_ObtenerUsuarios", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lista.Add(new Usuario
                        {
                            UsuarioId = Convert.ToInt32(reader["usuario_id"]),
                            NombreUsuario = reader["nombre_usuario"].ToString(),
                            PerfilId = Convert.ToInt32(reader["perfil_id"]),
                            NombrePerfil = reader["nombre_perfil"].ToString(),
                            Estado = reader["estado"].ToString(),
                            FechaCreacion = Convert.ToDateTime(reader["fecha_creacion"]),
                            ImagenUrl = reader["ImagenUrl"].ToString()
                        });
                    }
                }
            }

            return lista;
        }

        public Usuario ObtenerUsuarioPorId(int usuarioId)
        {
            Usuario usuario = null;

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_ObtenerUsuarioPorId", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@usuario_id", usuarioId);
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        usuario = new Usuario
                        {
                            UsuarioId = Convert.ToInt32(reader["usuario_id"]),
                            NombreUsuario = reader["nombre_usuario"].ToString(),
                            PerfilId = Convert.ToInt32(reader["perfil_id"]),
                            NombrePerfil = reader["nombre_perfil"].ToString(),
                            Estado = reader["estado"].ToString(),
                            FechaCreacion = Convert.ToDateTime(reader["fecha_creacion"]),
                            ImagenUrl = reader["ImagenUrl"].ToString()
                        };
                    }
                }
            }

            return usuario;
        }

        public int CrearUsuario(Usuario usuario)
        {
            int nuevoId = 0;

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_CrearUsuario", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre_usuario", usuario.NombreUsuario);
                cmd.Parameters.AddWithValue("@password_hash", usuario.PasswordHash);
                cmd.Parameters.AddWithValue("@perfil_id", usuario.PerfilId);
                cmd.Parameters.AddWithValue("@imagen_url", (object)usuario.ImagenUrl ?? DBNull.Value);

                conn.Open();
                nuevoId = Convert.ToInt32(cmd.ExecuteScalar());
            }

            return nuevoId;
        }

        public void ActualizarUsuario(Usuario usuario)
        {
            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_ActualizarUsuario", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@usuario_id", usuario.UsuarioId);
                cmd.Parameters.AddWithValue("@nombre_usuario", usuario.NombreUsuario);
                cmd.Parameters.AddWithValue("@password_hash", usuario.PasswordHash);
                cmd.Parameters.AddWithValue("@perfil_id", usuario.PerfilId);
                cmd.Parameters.AddWithValue("@estado", usuario.Estado);
                cmd.Parameters.AddWithValue("@imagen_url", (object)usuario.ImagenUrl ?? DBNull.Value);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void EliminarUsuario(int usuarioId)
        {
            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_EliminarUsuario", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@usuario_id", usuarioId);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public Usuario AutenticarUsuario(string nombreUsuario)
        {
            Usuario usuario = null;

            using (var conn = new SqlConnection(connectionString))
            using (var cmd = new SqlCommand("sp_AutenticarUsuario", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre_usuario", nombreUsuario);
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        usuario = new Usuario
                        {
                            UsuarioId = Convert.ToInt32(reader["usuario_id"]),
                            NombreUsuario = reader["nombre_usuario"].ToString(),
                            PasswordHash = reader["password_hash"].ToString(),
                            PerfilId = Convert.ToInt32(reader["perfil_id"]),
                            Estado = reader["estado"].ToString(),
                            ImagenUrl = reader["ImagenUrl"].ToString()
                        };
                    }
                }
            }

            return usuario;
        }
    }
}
