import { Dispatch, useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalsProps = {
  order: OrderItem[];
  dispatch: Dispatch<OrderActions>;
};

export const OrderTotals = ({ order, dispatch }: OrderTotalsProps) => {
  const TotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl"></h2>

        <p className="font-">
          Total a pagar: {""}
          <span className="font-bold">{formatCurrency(TotalAmount)}</span>
        </p>
        <p className="text-xl font-semibold border-t border-slate-300 pt-2">
          Agregar dirección {""}
          <input 
            type="text"
            className="w-full border border-slate-300 rounded-lg mt-3 p-2"
            onChange={(e) => dispatch({type: 'set-direction', payload: {direction: e.target.value}})}
          />
        </p>
      </div>

      <button
        className="w-full bg-black p-3 uppercase text-white font-bold text-xl mt-5 disabled:opacity-10"
        disabled={TotalAmount === 0}
        onClick={() => dispatch({ type: "place-order", payload: { order } })}
      >
        Guardar Orden
      </button>
    </>
  );
};
