import { useState, useEffect } from 'react'; // Importa useState y useEffect desde la biblioteca 'react'.
import db from '../firebase'; // Importa la instancia de Firebase desde el archivo firebase.js ubicado en la carpeta firebase.

const ListarPrestamos = () => { // Define el componente funcional ListarPrestamos.
  const [prestamos, setPrestamos] = useState([]); // Declara el estado 'prestamos' como un array vacío y la función 'setPrestamos' para actualizarlo.

  useEffect(() => { // Utiliza el hook useEffect para realizar efectos secundarios en el componente.
    const obtenerPrestamos = async () => { // Declara una función asincrónica obtenerPrestamos.
      const querySnapshot = await db.collection('prestamos').get(); // Realiza una consulta a la colección 'prestamos' en Firestore.
      const prestamosData = querySnapshot.docs.map((doc) => ({ // Mapea sobre los documentos de la consulta y crea un objeto para cada préstamo con su ID y datos.
        id: doc.id,
        ...doc.data(),
      }));
      setPrestamos(prestamosData); // Actualiza el estado 'prestamos' con los datos obtenidos de Firestore.
    };
    obtenerPrestamos(); // Llama a la función obtenerPrestamos al renderizar el componente.
  }, []); // El segundo argumento del useEffect es un array vacío, lo que significa que el efecto se ejecutará solo una vez, al montar el componente.

  return (
    <div className="container">
      <h3 className="text-center my-4">Listado de préstamos</h3>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID Prestamo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((prestamo) => (
              <tr key={prestamo.id}>
                <td>{prestamo.id}</td>
                <td>{prestamo.nombre}</td>
                <td>{prestamo.apellido}</td>
                <td>{prestamo.titulo}</td>
                <td>{prestamo.autor}</td>
                <td>{prestamo.editorial}</td>
                <td>{prestamo.año}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarPrestamos; // Exporta el componente ListarPrestamos para que pueda ser utilizado en otros archivos.