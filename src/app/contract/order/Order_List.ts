export class Order_List {
    orderId: number;
    products: Product[];
    isOpen: boolean;  

  }
  
  export class Product {
    orderDate: Date;
    name: string;
    price: number;
    quantity: number;
    description: string;
    address: string;
  }
  