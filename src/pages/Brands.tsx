import { useEffect, useState } from "react";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import type { Brand } from "../interfaces/Brand";

export const Brands = () => {

  const [brands, ssetBrands] = useState({
    loading : false,
    data : [] as Brand[]
  });

  useEffect(() => {
    
    const getData = async () => {
      const resultBrands = await UseFetchWithoutToken('brands','GET',null);
    
      ssetBrands({
        loading : true,
        data : resultBrands
      })
    }

    getData()
  
  }, []);

  return (
    <> 
      <div className="container products-wrapper">
        <div className="row">
          <div className="col-12">
            <h2 className="products-title">Tienda Oficiales</h2>
          </div>
          {
            !brands.loading 
            ?
            (
                <div className="alert alert-info">
                    Cargando....
                </div>
            )
            :
            (
               brands.data.map(({id, image} : Brand) => (
                    <div className="col-12 col-sm-6 col-lg-3">
                        <section className="product-box" style={{background: 'none'}}>
                        <Link to={`/brands/${id}`}>
                            <figure className="product-box_image">
                            <img src={image} alt="imagen de producto" />
                            </figure>
                        </Link>
                        </section>
                    </div>
                ))
            )
          }
        </div>
      </div>
   
    </>
  );
};
