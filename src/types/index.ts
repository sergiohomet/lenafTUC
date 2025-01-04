export interface menuItem {
  id: number;
  name: string;
  price: number;
}

export interface OrderItem extends menuItem {
  quantity: number;
}

export interface orderPDF {
  id: string;
  order: OrderItem[];
  direction: string;
  date: string;
}
