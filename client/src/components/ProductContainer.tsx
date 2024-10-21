import { Product } from "../types";

// Product takes the form: {
//     product_id: number;
//     full_product_name: string;
//     brand: string;
//     category_name: string;
//     price_per_container: number;
//     price_per_oz: number;
//     porosity_score: number;
//     course_score: number;
//     density_score: number;
//     length_score: number;
//     curl_type: number;
// }

interface ProductContainerProps {
  product: Product;
}

// TODO: Make this actually format and display product
export const ProductContainer: React.FC<ProductContainerProps> = ({
  product: product,
}) => {
  return <div>{JSON.stringify(product)}</div>;
};
