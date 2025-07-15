import { useEffect, useState } from "react";
import { BannerHome } from "../components/BannerHome";
import { CardProduct } from "../components/CardProduct";
import { UseFetchWithoutToken } from "../hooks/useFetch";
import {toThousand} from '../helpers'
import type { Product } from "../interfaces/Product";

export const Home = () => {

  const [newest, setNewest] = useState({
    loading : false,
    data : [] as Product[]
  });

  const [sales, setSales] = useState({
    loading : false,
    data : [] as Product[]
  });

  useEffect(() => {
    
    const getData = async () => {
      const resultNewest = await UseFetchWithoutToken('products/filter?section=novedades', 'GET', null);
      const resultSales = await UseFetchWithoutToken('products/filter?section=ofertas','GET',null);
      
      setNewest({
        loading : true,
        data : resultNewest
      });

      setSales({
        loading : true,
        data : resultSales
      })
    }

    getData()
  
  }, []);

  return (
    <>
      <BannerHome />
      <div className="container products-wrapper">
        <div className="row">
          <div className="col-12">
            <h2 className="products-title">Últimos agregados</h2>
          </div>
          {
            !newest.loading 
            ?
            (
                <div className="alert alert-info">
                    Cargando....
                </div>
            )
            :
            (
                newest.data.map((product : Product, index : number) => (
                    <CardProduct product = {product} toThousand = {toThousand} key={product.name + index}/>
                ))
            )
          }
        </div>
      </div>
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
