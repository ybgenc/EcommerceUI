import { List_Product_Image } from "./list-product-image";

export class List_Product {

    id: string;
    name :string;
    stock :number;
    price :number;
    title:string;
    description:string;
    createdDate :Date;
    updatedDate :Date;
    productImageFile? : List_Product_Image[];
    imagePath:string
}