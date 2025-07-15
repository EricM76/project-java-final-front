import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toThousand } from "../helpers";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import type { Product } from "../interfaces/Product";
import FormProduct from "../components/FormProduct";

export const Detail = () => {
  const { id: idProduct } = useParams();

  const [product, setProduct] = useState({
    loading: false,
    data: {} as Product,
  });

  useEffect(() => {
    const getData = async () => {
      const result = await UseFetchWithoutToken(
        `products/${idProduct}`,
        "GET",
        null
      );
      console.log(result);

      setProduct({
        loading: true,
        data: result,
      });
    };

    getData();
  }, [idProduct]);

  const { loading, data } = product;
  const [show, setShow] = useState(false);

  const handleOpenModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  return (
    <div className="container products-wrapper">
      {!loading ? (
        <div className="alert alert-info">Cargando....</div>
      ) : (
        <>
          <FormProduct handleClose={handleCloseModal} show={show} />
          <div className="row">
            <div className="col-12">
              <h2 className="products-title">
                Detalle del producto: {data.name}
              </h2>
            </div>
          </div>
          <div className="product-detail">
            <div className="row">
              <div className="col-12 col-lg-8">
                <img
                  src={data.image}
                  alt={data.name}
                  className="product-detail-img"
                />
                <p className="product-detail-description">{data.description}</p>
              </div>
              <div className="col-12 col-lg-4">
                <article className="product-detail-info">
                  <h2 className="product-detail-title">{data.name} </h2>
                  {data.discount > 0 ? (
                    <>
                      <p className="product-detail-price small">
                        <span>{data.price}</span>/<b>{data.discount}% OFF</b>
                      </p>
                      <p className="product-detail-price">
                        {toThousand(
                          data.price - (data.price * data.discount) / 100
                        )}
                      </p>
                    </>
                  ) : (
                    <p className="product-detail-price">
                      {toThousand(data.price)}
                    </p>
                  )}

                  <ul className="actions-list">
                    <li>
                      <i className="fas fa-credit-card"></i>
                      <p>Pagá en 12 cuotas sin interes</p>
                    </li>
                    <li>
                      <i className="fas fa-store"></i>
                      <p>Retiro gratis en locales del vendedor</p>
                    </li>
                  </ul>
                   <button className="btn btn-primary mb-3" style={{width:'100%'}}>
                      AGREGAR AL CARRITO
                    </button>
                  <div >
                    <form
                      action={`/products/delete/${data.id}?_method=DELETE`}
                      method="POST"
                      className="d-flex flex-column flex-wrap gap-2"
                    >
                        <a
                      href="#"
                      className="btn btn-success"
                      onClick={handleOpenModal}
                    >
                      EDITAR PRODUCTO
                    </a>
                      <button
                        type="submit"
                        style={{ cursor: "pointer;" }}
                        className="btn btn-danger"
                      >
                        ELIMINAR
                      </button>
                    </form>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
