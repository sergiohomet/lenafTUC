import { useOrder } from "../hooks/useOrder";
import type { menuItem } from "../types/index";

type MenuItemProps = {
  item: menuItem,
};

export default function MenuItem({ item }: MenuItemProps) {
  const { dispatch } = useOrder()

  return (
    <button
      className="w-full p-3 flex justify-between rounded-lg shadow-lg hover:bg-slate-300 transition-all border"
      onClick={() => dispatch({ type: 'add-item', payload: { item } })}
    >
      <p>{item.name}</p>
      <p className="font-bold">${item.price}</p>
    </button>
  );
}
