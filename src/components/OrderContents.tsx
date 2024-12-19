import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";
import { OrderActions } from "../reducers/order-reducer";

type OrderContentsProps = {
  order: OrderItem[];
  dispatch: Dispatch<OrderActions>
};
export const OrderContents = ({ order, dispatch }: OrderContentsProps) => {

  return (
    <div>
      <h2 className="font-black text-4xl text-center">Consumo</h2>

      <div className={`space-y-3 mt-10 ${order.length === 0 ? 'border-b border-dashed border-slate-300' : 'border-none'}`}>
        {order.map((item) => (
            <div key={item.id} className="flex justify-between border-t border-gray-300 py-5 last-of-type:border-b">
              <div>
                <p className="text-lg">
                  {item.name} -{" "}
                  <span className="font-bold">
                    {formatCurrency(item.price)}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Cantidad: {item.quantity} - Total:{" "}
                  {formatCurrency(item.quantity * item.price)}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => dispatch({type: 'remove-item', payload: {id: item.id}})}
                >
                  X
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
