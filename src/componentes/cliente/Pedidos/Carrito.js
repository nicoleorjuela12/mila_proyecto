import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recupera el carrito guardado desde localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    // Recupera la información del usuario desde localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(usuarioGuardado);
  }, []);

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    Swal.fire({
      title: 'Producto eliminado del carrito',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad < 10) {
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    } else {
      Swal.fire({
        title: 'Cantidad máxima alcanzada',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    } else {
      Swal.fire({
        title: 'La cantidad mínima es 1',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Carrito de Compras</h2>
      {carrito.length > 0 ? (
        carrito.map((producto, index) => (
          <div
            key={index}
            className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-2xl mx-auto border border-white bg-white mb-4"
          >
            {/* Imagen del producto */}
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
              <img
                src={producto.imagen || "https://via.placeholder.com/300x200"}
                alt={producto.nombre}
                className="rounded-xl"
              />
            </div>

            {/* Detalles del producto */}
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-black">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">Categoría: {producto.categoria}</p>
              </div>

              {/* Precio y cantidad en una sola línea */}
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Precio: ${producto.precio} COP</p>
                <p className="text-gray-600 font-bold text-sm">
                  {producto.cantidad} unidad(es)
                </p>
              </div>

              {/* Botones para aumentar/disminuir cantidad */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => disminuirCantidad(index)}
                    className="text-sm text-gray-700 bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold">{producto.cantidad}</span>
                  <button
                    onClick={() => aumentarCantidad(index)}
                    className="text-sm text-gray-700 bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Botón de eliminar en la parte inferior derecha */}
                <button
                  onClick={() => eliminarProducto(index)}
                  className="flex items-center justify-center text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded"
                >
                  <i className="fas fa-trash-alt mr-2"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default Carrito;
