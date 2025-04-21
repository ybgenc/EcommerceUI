import { List_Product_Image } from "../list-product-image";

export class Product_Detail {


    id: string;
    name: string;
    stock: number;
    price: number;
    title: string;
    description: string;
    createdDate: string;
    updatedDate: string;
    productImageFiles? : List_Product_Image[];
}




