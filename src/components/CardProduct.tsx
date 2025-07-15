import { Link } from "react-router-dom";
import type { Product } from "../interfaces/Product";

export const CardProduct = ({
  product,
  toThousand,
}: {
  product: Product;
  toThousand: (price: number) => string;
}) => {
  const { id, name, price, discount, image } = product;

  return (
    <>
      <div className="col-12 col-sm-6 col-lg-3">
        <section className="product-box">
          <Link to={`/products/detail/${id}`}>
            <figure className="product-box_image">
              <img src={image} alt="imagen de producto" />
            </figure>
            <article className="product-box_data">
              <h2>$ {toThousand(price)}</h2>
              {discount ? <span>{discount}% OFF</span> : null}
              <p>{name}</p>
              <i className="fas fa-truck"></i>
            </article>
          </Link>
        </section>
      </div>
    </>
  );
};
