
type SearchDateInputProps = {
  typedDueDate: string;
  onTypedDueDate: (value: string) => void;
};
const SearchDateInput = ({ typedDueDate, onTypedDueDate }: SearchDateInputProps) => {
  return (
    <div className={"pt-1 pr-2 pl-3"}>
      <input
        type={"text"}
        placeholder={"Type a date"}
        className={"text-sm outline-none w-full"}
        value={typedDueDate}
        onChange={e => onTypedDueDate(e.target.value)}
      />
    </div>
  );
};

export default SearchDateInput;
