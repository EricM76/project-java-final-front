import { useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import { toThousand } from "../helpers";
import type { Product } from "../interfaces/Product";
import { useSearchParams } from "react-router-dom";

export const Results = () => {
  const [products, setProducts] = useState({
    loading: false,
    data: [] as Product[],
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentQuery = searchParams.get("q");
    const getData = async () => {
      const response = await UseFetchWithoutToken(
        "products/filter?name=" + currentQuery,
        "GET",
        null
      );

      setProducts({
        loading: true,
        data: response,
      });
    };

    getData();
  }, [searchParams]);

  return (
    <div className="container products-wrapper">
      <div className="row">
        <div className="col-12">
          <h2 className="products-title">Resultado de la búsqueda para: <b>{searchParams.get("q")}</b></h2>
        </div>
        {!products.loading ? (
          <div className="alert alert-info">Cargando....</div>
        ) : products.data.length ? (
          products.data.map((product: Product, index: number) => (
            <CardProduct
              product={product}
              toThousand={toThousand}
              key={product.name + index}
            />
          ))
        ) : (
          <div className="alert alert-warning fs-3 my-3">No se encontraron productos con el nombre: <b>{searchParams.get("q")}</b> </div>
        )}
      </div>
    </div>
  );
};
