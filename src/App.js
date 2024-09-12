import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';  
import { UserContext } from './context/UserContext';
import ProtectedRoute from './componentes/ProtectedRouter'; 
import Index from "./paginas/auth/inicio";
import Login from './componentes/auth/login';
import BarraAdmin from './componentes/barras/BarraAdministrador';
import BarraCliente from './componentes/barras/BarraCliente';
import BarraMesero from './componentes/barras/BarraMesero';
import FormularioRegistro from './componentes/auth/registrocliente';
import BarraNormal from "./componentes/barras/barra_normal";
import ConsultaUsuarios from "./componentes/administrador/usuarios/consultausarios";
import Footer from "./componentes/Footer/footer";
import InfoReserva from "./componentes/cliente/reservas/InicioReservas";
import InicioMesa from "./componentes/cliente/reservas/InicioReservaMesa";
import ReservaLocal from "./componentes/cliente/reservas/reservalocal";
import FormularioRegiEmp from './componentes/administrador/usuarios/regsitroempleados';
import EditarUsuario from './componentes/administrador/usuarios/editarusuarios';
import RegistroProductos from './componentes/administrador/Productos/RegistrarProductos';
import GestionProductos from './componentes/administrador/Productos/GestionProductos';
import ProductosCliente from './componentes/cliente/Productos/productos';
import Logout from './componentes/logout';
import Carrito from './componentes/cliente/Pedidos/Carrito';


const App = () => {
  const { role } = useContext(UserContext);

  console.log("Current Role:", role); // Debugging statement

  let NavBarComponent = BarraNormal; // Default value

  if (role === 'administrador') {
    NavBarComponent = BarraAdmin;
  } else if (role === 'Cliente') {
    NavBarComponent = BarraCliente;
  } else if (role === 'mesero') {
    NavBarComponent = BarraMesero;
  }

  return (
    <>
      <NavBarComponent />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/' element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrocliente" element={<FormularioRegistro />} />

          {/* Rutas protegidas para administradores */}
          <Route path="/consultausarios" element={
            <ProtectedRoute>
              <ConsultaUsuarios />
            </ProtectedRoute>
          } />
          <Route path="/regsitroempleados" element={
            <ProtectedRoute>
              <FormularioRegiEmp />
            </ProtectedRoute>
          } />
          <Route path="/editarusuarios/:usuarioId" element={
            <ProtectedRoute>
              <EditarUsuario />
            </ProtectedRoute>
          } />
          <Route path="/RegistrarProductos" element={
            <ProtectedRoute>
              <RegistroProductos />
            </ProtectedRoute>
          } />
          <Route path="/GestionProductos" element={
            <ProtectedRoute>
              <GestionProductos />
            </ProtectedRoute>
          } />

          {/* Rutas protegidas para clientes y meseros */}
          <Route path="/InicioReservas" element={
            <ProtectedRoute>
              <InfoReserva />
            </ProtectedRoute>
          } />
          <Route path="/InicioReservaMesa" element={
            <ProtectedRoute>
              <InicioMesa />
            </ProtectedRoute>
          } />
          <Route path="/reservalocal" element={
            <ProtectedRoute>
              <ReservaLocal />
            </ProtectedRoute>
          } />
          <Route path="/productos" element={
            <ProtectedRoute>
              <ProductosCliente />
            </ProtectedRoute>
          } />

          <Route path="/Carrito" element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          } />


          {/* Ruta para cerrar sesión */}
          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer/>
      </main>
    </>
  );
};

export default App;
