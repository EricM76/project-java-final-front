import type { Brand } from "./Brand";
import type { Category } from "./Category";
import type { Section } from "./Section";

  export interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    description: string;
    image: string;
    brand : Brand;
    category : Category;
    section: Section;
  }
