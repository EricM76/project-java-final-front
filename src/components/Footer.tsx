export const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <article className="footer-data">
                <i className="fas fa-credit-card"></i>
                <h2>Pagá con tarjeta o en efectivo</h2>
                <p>
                  Con Mercado Liebre Cash, tenés cuotas sin interés con tarjeta
                  o efectivo en puntos de pago. ¡Y siempre es seguro!
                </p>
              </article>
            </div>
            <div className="col-12 col-lg-4">
              <article className="footer-data">
                <i className="fas fa-gift"></i>
                <h2>Envío gratis desde $ 1.999</h2>
                <p>
                  Solo por estar registrado en Mercado Liebre tenés envíos
                  gratis en miles de productos. Es un beneficio de Mercado
                  Puntos.
                </p>
              </article>
            </div>
            <div className="col-12 col-lg-4">
              <article className="footer-data">
                <i className="fas fa-user-shield"></i>
                <h2>Seguridad, de principio a fin</h2>
                <p>
                  ¿No te gusta? ¡Devolvelo! En Mercado Liebre, no hay nada que
                  no puedas hacer, porque estás siempre protegido.
                </p>
              </article>
            </div>
          </div>
        </div>
      </footer>
      <div className="sub-footer">
        <div className="container">
          <p>Copyright © 1999-2019 MercadoLiebre S.R.L.</p>
        </div>
      </div>
    </>
  );
};
