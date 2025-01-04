import { useOrder } from "../hooks/useOrder";
import { formatCurrency, formatDate } from "../helpers";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "./OrderPDF";
import { useState } from "react";

export default function OrderCase() {
  const { state, dispatch } = useOrder();

  const [isPDFReady, setIsPDFReady] = useState(false);
  const [, setButtonText] = useState("Generar PDF");

  const allOrders = state.orderPDF;

  const ordersWithTotals = allOrders.map((orders) => {
    const orderTotal = orders.order.reduce(
      (orderSum, item) => orderSum + item.quantity * item.price,
      0
    );
    return { ...orders, orderTotal };
  });

  const allOrdersTotal = ordersWithTotals.reduce(
    (total, orders) => total + orders.orderTotal,
    0
  );

  const handleGeneratePDF = (pdfId: string) => {
    dispatch({ type: "set-id-pdf", payload: { pdfId } });
    setIsPDFReady(false);
    setButtonText("Generando PDF...");
    setTimeout(() => {
      setIsPDFReady(true);
      setButtonText("Descargar PDF");
    }, 2000);
  };

  const handleDownloadPDF = () => {
    setButtonText("Generar PDF");
    dispatch({ type: "set-id-pdf", payload: { pdfId: "" } });
  };

  return (
    <div>
      <h2 className="font-black text-3xl text-center">Caja General</h2>
      {allOrders.length > 0 && (
        <>
          <p className="text-center font-bold">
            Pedidos Totales -{" "}
            <span className="font-normal">{allOrders.length}</span>
          </p>
          <p className="text-center font-bold">
            Suma total -{" "}
            <span className="font-normal">
              {formatCurrency(allOrdersTotal)}
            </span>
          </p>
        </>
      )}

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
                className="p-2 bg-black text-white rounded mt-1 uppercase"
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
                className="p-2 bg-red-700 hover:bg-red-600 transition-all text-white rounded mt-1 uppercase"
                onClick={() =>
                  dispatch({
                    type: "remove-order",
                    payload: { id: orders.id },
                  })
                }
              >
                Eliminar pedido
              </button>
              <button
                className="p-2 bg-black text-white rounded mt-1 uppercase"
                onClick={() => handleGeneratePDF(orders.id)}
              >
                Generar PDF
              </button>
              {isPDFReady && (
                <PDFDownloadLink
                  document={<OrderPDF state={state} />}
                  fileName="order.pdf"
                >
                  {/* @ts-expect-error is necessary */}
                  {({ loading }: PDFDownloadLinkProps) => (
                    <button
                      className="p-2 bg-blue-700 hover:bg-blue-600 transition-all text-white rounded uppercase w-full mt-1"
                      onClick={handleDownloadPDF}
                    >
                      {loading ? "Generando PDF..." : "Descargar PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
