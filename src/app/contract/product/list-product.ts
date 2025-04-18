import { List_Product_Image } from "../list-product-image";

export class List_Product {

    id: string;
    name :string;
    stock :number;
    price :number;
    title:string;
    description:string;
    createdDate :Date;
    updatedDate :Date;
    productImageFiles? : List_Product_Image[];
    imagePath:string;
}