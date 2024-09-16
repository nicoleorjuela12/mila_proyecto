import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const PerfilUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    numero_documento: '',
    tipo_documento: 'Cedula de ciudadania',
    direccion: '',
    barrio: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener el ID del usuario desde localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      const obtenerDatosUsuario = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/usuarios/${userId}`); // Cambia el endpoint según tu API
          const user = response.data;
          setFormData({
            nombre: user.nombre || '',
            apellido: user.apellido || '',
            telefono: user.telefono || '',
            numero_documento: user.numero_documento || '',
            tipo_documento: user.tipo_documento || 'Cedula de ciudadania',
            direccion: user.direccion || '',
            barrio: user.barrio || '',
            email: user.email || ''
          });
          setIsLoading(false);
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
          setIsLoading(false);
        }
      };

      obtenerDatosUsuario();
    } else {
      console.error('ID de usuario no encontrado en localStorage');
      setIsLoading(false); // No mantener el estado de carga si no hay ID
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'ID de usuario no disponible',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    axios.put(`http://localhost:3000/usuarios/${userId}`, formData)
      .then(() => {
        Swal.fire({
          title: 'Éxito',
          text: 'Datos actualizados correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        setIsEditing(false);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar los datos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error("Hubo un error al actualizar los datos:", error);
      });
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Número de Documento</label>
            <input
              type="text"
              name="numero_documento"
              value={formData.numero_documento}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Tipo de Documento</label>
            <select
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="Cedula de ciudadania">Cédula de ciudadanía</option>
              <option value="Pasaporte">Pasaporte</option>
              {/* Agrega otras opciones si es necesario */}
            </select>
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Barrio</label>
            <input
              type="text"
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
            >
              Editar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PerfilUsuario;
