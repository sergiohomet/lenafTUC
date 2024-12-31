import { useMemo } from "react";
import { useOrder } from "../hooks/useOrder";
import { formatCurrency } from "../helpers";

export default function OrderTotals() {
  const { state, dispatch } = useOrder();

  const TotalAmount = useMemo(
    () =>
      state.order.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ),
    [state.order]
  );

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl"></h2>

        <p className="font-">
          Total a pagar: {""}
          <span className="font-bold">{formatCurrency(TotalAmount)}</span>
        </p>
        <p className="text-lg font-semibold border-t border-slate-300 pt-2">
          Dirección o persona que realizo el pedido(cliente) {""}
          <input
            type="text"
            className="w-full border border-slate-300 rounded-lg mt-3 p-2"
            placeholder="Dirección de entrega, persona que realizo el pedido(cliente)"
            onChange={(e) =>
              dispatch({
                type: "set-direction",
                payload: { direction: e.target.value },
              })
            }
          />
        </p>
      </div>

      <button
        className="w-full bg-black p-3 uppercase text-white font-bold text-xl mt-5 disabled:opacity-10"
        disabled={TotalAmount === 0}
        onClick={() =>
          dispatch({
            type: "place-order",
            payload: { order: state.order, direction: state.direction },
          })
        }
      >
        Guardar Orden
      </button>
    </>
  );
}
