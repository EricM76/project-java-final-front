import { useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import {toThousand} from '../helpers'
import type { Product } from "../interfaces/Product";

export const Sales = () => {

  const [sales, setSales] = useState({
    loading : false,
    data : [] as Product[]
  });

  useEffect(() => {
    
    const getData = async () => {
      const resultSales = await UseFetchWithoutToken('products/filter?section=ofertas','GET',null);
    
      setSales({
        loading : true,
        data : resultSales
      })
    }

    getData()
  
  }, []);

  return (
    <> 
      <div className="container products-wrapper">
        <div className="row">
          <div className="col-12">
            <h2 className="products-title">Ofertas</h2>
          </div>
          {
            !sales.loading 
            ?
            (
                <div className="alert alert-info">
                    Cargando....
                </div>
            )
            :
            (
               sales.data.map((product : Product, index : number) => (
                    <CardProduct product = {product} toThousand = {toThousand} key={product.name + index}/>
                ))
            )
          }
        </div>
      </div>
   
    </>
  );
};
