import { Dispatch } from "react";
import type { menuItem } from "../types/index";
import { OrderActions } from "../reducers/order-reducer";

type MenuItemProps = {
  item: menuItem,
  dispatch: Dispatch<OrderActions>
};

export default function MenuItem({ item, dispatch }: MenuItemProps) {
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
