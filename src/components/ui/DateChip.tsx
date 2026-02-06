type DateChipProps = {
    date: string
    onRemove: () => void
}
const DateChip = ({date, onRemove}: DateChipProps) => {
    return (
        <div className={"flex items-center gap-1.5 p-1 rounded bg-product-library-display-accent-secondary-fill text-sm"}>
            <span className={"font-medium"}>{date}</span>
            <button type={"button"} onClick={onRemove} className={"text-xs opacity-60 hover:opacity-100"}>x</button>
        </div>
    );
};

export default DateChip;