import { Link } from "react-router-dom";
import FormProduct from "./FormProduct";
import { useState } from "react";

export const Header = () => {
    const [show, setShow] = useState(false);

    const handleOpenModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);
  
    return (
    <>
    <FormProduct handleClose={handleCloseModal} show={show}/>
    <header className="main-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-5 col-md-2">
            <Link to="/" className="main-header_home-link">
              <img src="/images/logo-mercado-liebre.svg" alt="logo"/>
            </Link>
          </div>

          <div className="col-7 col-md-6">
            <form action="/search" method="GET" className="search-form">
              <input
                type="text"
                name="keywords"
                placeholder="Buscar productos, marcas y más"
                className="search-form_input"
              />
              <button type="submit" className="search-form_button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="col-12 col-md-4">
            <a href="/tarjetas" className="main-header_credit-link">
              <i className="fas fa-hand-holding-usd"></i>
              Comprá en cuotas y sin tarjeta de crédito
            </a>
          </div>
        </div>

        <button className="btn-toggle-navbar">
          <i className="fas fa-bars"></i>
        </button>

        <nav className="main-navbar">
          <ul className="left-navbar">
            <li>
              <a href="/products">Todos los productos</a>
            </li>
            <li>
              <a href="/ofertas">Ofertas</a>
            </li>
            <li>
              <a href="/tiendas">Tiendas Oficiales</a>
            </li>
           <li>
              <a href="#" onClick={handleOpenModal}>Vender</a>
            </li>
            <li>
              <a href="/ayuda">Ayuda</a>
            </li>
          </ul>
          <ul className="right-navbar">
            <li>
              <a href="/users/register" id="link-register">
                Creá tu cuenta <i className="fas fa-address-card"></i>
              </a>
            </li>
            <li>
              <Link to="/users/login">
                Ingresá <i className="fas fa-sign-in-alt"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </>
  );
};
