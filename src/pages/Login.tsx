import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, type User } from "../contexts/UserContext";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import { UseForm } from "../hooks/userForm";

export const Login = () => {

  const [formValues, handleInputChange] = UseForm({
    email: "",
    password: ""
  });

  const { email, password } = formValues as { email: string; password: string };
  const errorMsg = useRef(null);
  const { setUser } = useContext(UserContext) as unknown as { setUser: (user: User) => void };
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const result = await UseFetchWithoutToken("auth/login", "POST", formValues);
    console.log(result);

    if (!result.ok) {
      if (errorMsg.current) {
        (errorMsg.current as HTMLElement).textContent = result.error;
      }
      if (errorMsg.current) {
        (errorMsg.current as HTMLElement).hidden = false;
      }
      //reset({ email: "", password: "" });
    }
    if (result.ok) {
      const { token } = result;

      
      const user = await UseFetchWithoutToken(`auth/me/${token}`, "GET", null);

      setUser({
        logged: true,
        name : user.data.name,
        rolId : user.data.rolId,
        token,
      });

      sessionStorage.setItem('MercadoLiebreReact', JSON.stringify({
        logged: true,
        name : user.data.name,
        rolId : user.data.rolId,
        token,
      }))

      navigate('/')

    }
  };

  return (
    <div className="container products-wrapper">
      <div className="row">
        <div className="col-12">
          <h2 className="products-title">Ingresá</h2>
        </div>
      </div>

      <div className="col-12">
        <div className="contenido">
          <div className="row">
            <div className="col-12 col-md-4 d-flex justify-content-center py-5">
              <img src="/images/logo-mercado-liebre.svg" alt="" />
            </div>
            <div className="col-12 col-md-8 p-5">
              <div className="card shadow">
                <div className="card-body">
                  <form id="form-login" className="row" onSubmit={handleSubmit}>
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-input form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={() => handleInputChange}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-input form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={() => handleInputChange}
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <p className="alert alert-danger" ref={errorMsg} hidden></p>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="remember"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <label
                          className="form-check-label form-label ms-2"
                          htmlFor="exampleCheck1"
                        >
                          Recordarme
                        </label>
                      </div>
                    </div>

                    <div className="col-12 col-md-6  d-flex justify-content-center">
                      <button type="submit" className="buy-now-button">
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
