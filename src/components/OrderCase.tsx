import { useOrder } from "../hooks/useOrder";
import { formatCurrency, formatDate } from "../helpers";

export default function OrderCase() {
  const { state, dispatch } = useOrder();

  const allOrders = state.orderPDF;

  const ordersWithTotals = allOrders.map((orders) => {
    const orderTotal = orders.order.reduce(
      (orderSum, item) => orderSum + item.quantity * item.price,
      0
    );
    return { ...orders, orderTotal };
  });

  // Calcular el total general de todas las órdenes
  const allOrdersTotal = ordersWithTotals.reduce(
    (total, orders) => total + orders.orderTotal,
    0
  );

  return (
    <div>
      <h2 className="font-black text-3xl text-center">Caja General</h2>
      <p className="text-center">
        Pedidos Totales - <span>{allOrders.length}</span>
      </p>
      <p className="text-center">
        Suma total - <span>{formatCurrency(allOrdersTotal)}</span>
      </p>

      {allOrders.length === 0 ? (
        <p className="text-2xl text-center mt-5">No hay pedidos aún...</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {ordersWithTotals.map((orders) => (
            <div
              key={orders.id}
              className="flex flex-col border-2 border-gray-300 p-5 my-5 w-100 h-110 shadow-lg rounded-lg"
            >
              <p className="text-lg font-bold">
                Fecha: {""}
                <span className="text-md font-semibold">
                  {formatDate(orders.date)}
                </span>
              </p>
              <p className="text-lg font-bold">
                Dirección: {""}
                <span className="text-md font-semibold">
                  {orders.direction}
                </span>
              </p>
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
              <div className="border-b border-gray-300 py-2">
                <p className="text-2xl font-bold text-center flex justify-evenly items-center">
                  Total: {""}
                  <span className="text-md font-normal">
                    {formatCurrency(orders.orderTotal)}
                  </span>
                </p>
              </div>

              <button
                className="p-2 bg-black text-white rounded mt-5 uppercase"
                onClick={() =>
                  dispatch({
                    type: "select-order",
                    payload: { id: orders.id },
                  })
                }
              >
                Seleccionar Pedido
              </button>
              <button
                className="p-2 bg-red-700 hover:bg-red-600 transition-all text-white rounded mt-5 uppercase"
                onClick={() =>
                  dispatch({
                    type: "remove-order",
                    payload: { id: orders.id },
                  })
                }
              >
                Eliminar pedido
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
