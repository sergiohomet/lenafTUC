import { menuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "add-item"; payload: { item: menuItem } }
  | { type: "remove-item"; payload: { id: menuItem["id"] } }
  | { type: "place-order" }

export type OrderState = {
  order: OrderItem[];
};

export const initialState: OrderState = {
  order: [],
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
    return {
      order: [],
    };
  }

  return state;
};
