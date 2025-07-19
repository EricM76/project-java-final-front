import { useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import {toThousand} from '../helpers'
import type { Product } from "../interfaces/Product";
import { useParams } from "react-router-dom";
import type { Brand } from "../interfaces/Brand";

export const BrandDetail = () => {
  const { id: idBrand } = useParams();

  const [brand, setBrand] = useState({
    loading : false,
    data : {} as Brand
  });

  useEffect(() => {
    
    const getData = async () => {
      const response = await UseFetchWithoutToken('brands/' + idBrand, 'GET', null);
      
      setBrand({
        loading : true,
        data : response
      });

    }

    getData()
  
  }, []);

  return (
      <div className="container products-wrapper">
        <div className="row">
          <div className="col-12">
            <h2 className="products-title">Tienda : {brand.data.name}</h2>
          </div>
          {
            !brand.loading 
            ?
            (
                <div className="alert alert-info">
                    Cargando....
                </div>
            )
            :
            (
                brand.data.products.map((product : Product, index : number) => (
                    <CardProduct product = {product} toThousand = {toThousand} key={product.name + index}/>
                ))
            )
          }
        </div>
      </div>
  );
};
