import { createContext, Dispatch, ReactNode, useReducer } from "react";
import {
  initialState,
  OrderActions,
  orderReducer,
  OrderState,
} from "../reducers/order-reducer";

export interface OrderContextProps {
  state: OrderState;
  dispatch: Dispatch<OrderActions>;
}

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderContext = createContext<OrderContextProps>(null!);

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
