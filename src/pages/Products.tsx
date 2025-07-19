import { useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import {toThousand} from '../helpers'
import type { Product } from "../interfaces/Product";

export const Products = () => {

  const [products, setProducts] = useState({
    loading : false,
    data : [] as Product[]
  });

  useEffect(() => {
    
    const getData = async () => {
      const response = await UseFetchWithoutToken('products', 'GET', null);
      
      setProducts({
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
            <h2 className="products-title">Todos los productos</h2>
          </div>
          {
            !products.loading 
            ?
            (
                <div className="alert alert-info">
                    Cargando....
                </div>
            )
            :
            (
                products.data.map((product : Product, index : number) => (
                    <CardProduct product = {product} toThousand = {toThousand} key={product.name + index}/>
                ))
            )
          }
        </div>
      </div>
  );
};
