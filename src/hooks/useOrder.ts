import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};
