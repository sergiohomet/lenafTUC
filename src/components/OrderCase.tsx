import { useOrder } from "../hooks/useOrder";
import { formatCurrency, formatDate } from "../helpers";

export default function OrderCase() {
  const { state, dispatch } = useOrder();

  const allOrders = state.orderPDF;

  return (
    <div>
      <h2 className="font-black text-3xl text-center">Caja General</h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {allOrders.map((orders) => (
          <div
            key={orders.id}
            className="flex flex-col border-2 border-gray-300 p-5 my-5 w-80 h-110"
          >
            <p className="text-lg font-bold border-t-2">
              Fecha: {formatDate(orders.date)}
            </p>
            <p className="text-lg font-bold">Dirección: {orders.direction}</p>
            <div className="flex-grow overflow-y-auto max-h-[300px] custom-scrollbar">
              {orders.order.map((item) => (
                <div
                  key={item.id}
                  className="justify-between border-t border-gray-300 py-5 last-of-type:border-b"
                >
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
                </div>
              ))}
            </div>
            <button
              className="p-2 bg-black text-white rounded mt-5 uppercase"
              onClick={() =>
                dispatch({ type: "select-order", payload: { id: orders.id } })
              }
            >
              Seleccionar Pedido
            </button>
            <button
              className="p-2 bg-red-700 hover:bg-red-600 transition-all text-white rounded mt-5 uppercase"
              onClick={() =>
                dispatch({ type: "remove-order", payload: { id: orders.id } })
              }
            >
              Eliminar pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
