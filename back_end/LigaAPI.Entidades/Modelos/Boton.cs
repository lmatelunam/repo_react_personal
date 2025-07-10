using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LigaAPI.Entidades.Modelos
{
    [Table("Botones")]  // opcional, si el nombre en DB es Botones
    public class Boton
    {
            [Key]
            [Column("boton_id")]
            public int BotonId { get; set; }

            [Required]
            [Column("nombre_boton")]
            [StringLength(50)]
            public string NombreBoton { get; set; }

            [Column("descripcion")]
            [StringLength(200)]
            public string Descripcion { get; set; }
    }
}
