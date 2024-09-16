// Carrito.js
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((producto, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    Swal.fire({
      title: 'Producto eliminado del carrito',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-4">Carrito de Compras</h1>
      {carrito.length > 0 ? (
        <div>
          {carrito.map((producto, index) => (
            <div key={index} className="flex items-center justify-between mb-4 border-b pb-4">
              <p>{producto.nombre}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Precio: ${producto.precio} COP</p>
              <button 
                onClick={() => eliminarProducto(index)} 
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
          <p className="text-xl font-semibold">Total: $ {total} COP</p>
        </div>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default Carrito;
