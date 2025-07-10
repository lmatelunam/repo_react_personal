import { useEffect, useState } from "react";
import { obtenerPerfiles, 
         obtenerPermisos, 
         obtenerPermisosPorPerfil, 
         actualizarPermisosPerfil 
      } from "../../services/permisosService";
import DropdownList from "../../components/atoms/DropdownList";
import Checkbox from "../../components/atoms/Checkbox";
import Button from "../../components/atoms/Button";
import MensajeInformativo from "../../components/atoms/MensajeInformativo";
import ContainerCard from "../../components/particulas/ContainerCard"; 

const AdministrarPermisosPorPerfil = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const perfilesData = await obtenerPerfiles();
      console.log('perfilesData: ', perfilesData);
      const permisosData = await obtenerPermisos();
      setPerfiles(perfilesData);
      setPermisos(permisosData);
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    const cargarPermisosPerfil = async () => {
      if (perfilSeleccionado) {
        const permisosAsignados = await obtenerPermisosPorPerfil(perfilSeleccionado);
        setPermisosSeleccionados(permisosAsignados.map(p => p.permiso_id));
      }
    };
    cargarPermisosPerfil();
  }, [perfilSeleccionado]);

  const togglePermiso = (permisoId) => {
    setPermisosSeleccionados(prev =>
      prev.includes(permisoId)
        ? prev.filter(id => id !== permisoId)
        : [...prev, permisoId]
    );
  };

  const guardarCambios = async () => {
    const ok = await actualizarPermisosPerfil(perfilSeleccionado, permisosSeleccionados);
    console.log('´pase',ok);
    setMensaje({      
      tipo: ok ? "success" : "error",
      texto: ok ? "Permisos actualizados correctamente" : "Ocurrió un error al guardar",
    });
  };

  return (
    <ContainerCard titulo="Administrar Permisos por Perfil">
      <div className="mb-3">
        <DropdownList
          label="Seleccione un Perfil:"
          options={perfiles.map((p) => ({
            label: p.NombrePerfil,
            value: p.PerfilId,
          }))}
          onChange={(val) => setPerfilSeleccionado(val)}
          value={perfilSeleccionado ?? ""}
        />
      </div>

      {perfilSeleccionado && (
        <div className="mb-4">
          <h5 className="mb-2">Permisos disponibles:</h5>
          <div className="row">
            {permisos.map((permiso) => (
              <div className="col-md-4" key={permiso.permiso_id}>
                <Checkbox
                  label={permiso.nombre_permiso}
                  checked={permisosSeleccionados.includes(permiso.permiso_id)}
                  onChange={() => togglePermiso(permiso.permiso_id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-end">
        <Button onClick={guardarCambios} disabled={!perfilSeleccionado}>
          Guardar Cambios
        </Button>
      </div>

      {mensaje && (
        <div className="mt-3">
          <MensajeInformativo
            tipo={mensaje.tipo}
            mensaje={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        </div>
      )}
    </ContainerCard>
  );
};

export default AdministrarPermisosPorPerfil;
