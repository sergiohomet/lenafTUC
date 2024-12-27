import MenuItem from "./components/MenuItem";
import { OrderContents } from "./components/OrderContents";
import { OrderTotals } from "./components/OrderTotals";
import { menuItems } from "./data/db";
import { useOrder } from "./hooks/useOrder";

function App() {
  
  const { state } = useOrder()

  return (
    <>
      <header className="bg-[#E5D5B1] py-5">
        <h1 className="text-center text-5xl font-bold">
          Lenaf TUC
        </h1>
      </header>

      <main className="max-w-7xl mx-auto grid md:grid-cols-2 ">
        <div className="p-5">
          <h2 className="text-4xl font-bold my-4 text-center">Menú</h2>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item}
              />
            ))}
          </div>
        </div>

        <div className="border-l border-slate-300 p-5 roudend-lg mt-8">
          {state.order.length ? (
            <>
              <OrderContents />

              <OrderTotals />
            </>
          ): (
            <p className="text-center text-2xl">La orden esta vacia</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
