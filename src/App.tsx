import { useEffect } from "react";
import MenuItem from "./components/MenuItem";
import OrderCase from "./components/OrderCase.tsx";
import { OrderContents } from "./components/OrderContents";
import { menuItems } from "./data/db";
import { useOrder } from "./hooks/useOrder";
import OrderTotals from "./components/OrderTotals.tsx";
function App() {
  const { state } = useOrder();

  useEffect(() => {
    localStorage.setItem("orderPDF", JSON.stringify(state.orderPDF));
  }, [state]);

  return (
    <>
      <header className="bg-[#E5D5B1] py-5">
        <img src="/perro.svg" alt="Lenaf Dog" className="w-20 mx-auto" />
      </header>

      <main className="max-w-7xl mx-auto p-5">
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h2 className="text-4xl font-bold my-4 text-center">Menú</h2>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="border-l border-slate-200 p-5">
              {state.order.length ? (
                <>
                  <OrderContents />
                  <OrderTotals />
                </>
              ) : (
                <p className="text-center text-2xl">La orden está vacía</p>
              )}
            </div>
          </div>

          <div className="max-w-7xl mt-5 p-5 mx-auto">
            <OrderCase />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
