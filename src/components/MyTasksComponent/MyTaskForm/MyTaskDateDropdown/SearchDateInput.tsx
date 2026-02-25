import type { Due } from "../../../../types/task.type.ts";

type SearchDateInputProps = {
  currentDate: Due | null;
};
const SearchDateInput = ({ currentDate }: SearchDateInputProps) => {
  return (
    <div className={"pt-1 pr-2 pl-3"}>
      <input
        type={"text"}
        placeholder={"Type a date"}
        className={"text-sm outline-none w-full"}
        value={currentDate?.string}
        readOnly
      />
    </div>
  );
};

export default SearchDateInput;
