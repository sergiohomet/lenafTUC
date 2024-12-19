import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];

type TipFormProps = {
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

export const TipForm = ({ tip, dispatch }: TipFormProps) => {
  return (
    <div className="text-center ">
      <h3 className="font-black text-2xl mt-5">Propina: </h3>

      <form className="flex gap-3 justify-center mt-2 border-b border-dashed border-slate-300">
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className="flex gap-1 mb-5">
            <label className="ml-3" htmlFor={tipOption.id}>
              {tipOption.label}
            </label>
            <input
              id={tipOption.id}
              type="radio"
              name="tipOption"
              value={tipOption.value}
              onChange={(e) =>
                dispatch({
                  type: "add-tip",
                  payload: { value: +e.target.value },
                })
              }
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
};
