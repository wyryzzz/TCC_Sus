import { Navigate } from "react-router-dom";

function obterToken() {
  return localStorage.getItem('token');
}

function RotaProtegida({ children }) {
  const token = obterToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RotaProtegida;
