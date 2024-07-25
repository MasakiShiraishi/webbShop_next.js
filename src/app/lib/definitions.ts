export type Product = {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartItem = Product & {
  quantity: number; 
};

export type OrderItem = {
  id: number;
  title: string;
  quantity: number;
  total: number;
};

export type Order = {
  items: OrderItem[];
  name: string;
  address: string;
  email: string;  
  deliveryOption: number;
};

