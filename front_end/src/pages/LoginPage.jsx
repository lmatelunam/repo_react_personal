// src/pages/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/particulas/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, isLoading  } = useLogin();

  const handleLogin = async (usuario, clave) => {
    const success = await login(usuario, clave);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <LoginForm onLogin={handleLogin} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LoginPage;

