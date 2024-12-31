import { v4 as uuidv4 } from "uuid";
import { menuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "add-item"; payload: { item: menuItem } }
  | { type: "remove-item"; payload: { id: menuItem["id"] } }
  | { type: "place-order"; payload: { order: OrderItem[]; direction: string } }
  | { type: "set-direction"; payload: { direction: string } }
  | { type: "set-date"; payload: { date: string } }
  | { type: "select-order"; payload: { id: string } }
  | { type: 'remove-order'; payload: { id: string } }

export type OrderState = {
  order: OrderItem[];
  orderPDF: {
    id: string;
    order: OrderItem[];
    direction: string;
    date: string;
  }[];
  direction: string;
  date: string;
  id: string;
};

const localStorageOrder = (): {
  id: string;
  order: OrderItem[];
  direction: string;
  date: string;
}[] => {
  const localStorageOrder = localStorage.getItem("orderPDF");
  return localStorageOrder ? JSON.parse(localStorageOrder) : [];
};

export const initialState: OrderState = {
  order: [],
  orderPDF: localStorageOrder(),
  direction: "",
  date: "",
  id: "",
};

export const orderReducer = (state: OrderState, action: OrderActions) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );

    let updatedOrder: OrderItem[] = [];
    if (itemExist) {
      updatedOrder = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      updatedOrder = [...state.order, newItem];
    }

    return {
      ...state,
      order: updatedOrder,
    };
  }

  if (action.type === "remove-item") {
    const order = state.order.filter(
      (orderItem) => orderItem.id !== action.payload.id
    );
    return {
      ...state,
      order,
    };
  }

  if (action.type === "place-order") {
    let updatedOrderPDF;

    if (state.order.length === 0) {
      updatedOrderPDF = state.orderPDF.filter((order) => order.id !== state.id);
    } else {
      updatedOrderPDF = state.orderPDF.map((order) =>
        order.id === state.id
          ? {
              ...order,
              order: state.order,
              direction: action.payload.direction,
              date: new Date().toISOString(),
            }
          : order
      );

      if (!updatedOrderPDF.some((order) => order.id === state.id)) {
        updatedOrderPDF.push({
          order: state.order,
          direction: action.payload.direction,
          id: state.id || uuidv4(),
          date: new Date().toISOString(),
        });
      }
    }

    return {
      ...state,
      order: [],
      orderPDF: updatedOrderPDF,
      direction: "",
      id: "",
    };
  }

  if (action.type === "set-direction") {
    return {
      ...state,
      direction: action.payload.direction,
    };
  }

  if (action.type === "select-order") {
    const selectedOrder = state.orderPDF.find(
      (order) => order.id === action.payload.id
    );

    return {
      ...state,
      order: selectedOrder ? selectedOrder.order : [],
      direction: selectedOrder ? selectedOrder.direction : "",
      date: selectedOrder ? selectedOrder.date : "",
      id: selectedOrder ? selectedOrder.id : "",
    };
  }

  if(action.type === 'remove-order') {
    const updatedOrderPDF = state.orderPDF.filter(order => order.id !== action.payload.id)
    return {
      ...state,
      orderPDF: updatedOrderPDF
    }
  }

  return state;
};
