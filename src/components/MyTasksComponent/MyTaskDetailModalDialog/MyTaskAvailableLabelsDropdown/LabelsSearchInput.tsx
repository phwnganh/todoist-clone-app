import type { RefObject } from "react";

type LabelsSearchInputProps = {
  labelValue: string;
  onLabelsSearched: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};
const LabelsSearchInput = ({
  labelValue,
  onLabelsSearched,
  inputRef,
}: LabelsSearchInputProps) => {
  return (
    <div className={"p-2"}>
      <input
        ref={inputRef}
        type={"text"}
        placeholder={"Type a label"}
        className={
          "text-sm border border-product-library-border-idle-tint rounded-small w-full py-1.5 px-2 outline-none focus:outline-none"
        }
        onChange={(e) => onLabelsSearched(e.target.value)}
        value={labelValue}
      />
    </div>
  );
};

export default LabelsSearchInput;
