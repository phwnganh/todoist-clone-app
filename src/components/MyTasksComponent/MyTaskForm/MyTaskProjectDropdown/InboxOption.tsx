import InboxIcon from '../../../../assets/inbox-icon.svg'
import VerifiedIcon from "../../../icons/VerifiedIcon.tsx";
type InboxOptionProps = {
    isInboxSelected: boolean;
    onInboxSelected: () => void;
}
const InboxOption = ({isInboxSelected, onInboxSelected}: InboxOptionProps) => {
    return (
        <div role={"option"} tabIndex={-1} aria-selected={isInboxSelected}
        data-selected={isInboxSelected} onMouseDown={e => {
            e.preventDefault()
            onInboxSelected()
        }}
        className={"group flex items-center gap-small justify-between py-1 px-1.5 w-full data-[selected=true]:bg-product-library-selectable-secondary-hover-fill hover:bg-product-library-selectable-secondary-hover-fill rounded-small"}>
            <div className={"flex items-center gap-1.5"}>
                <div className={"flex items-center justify-center"}>
                    <img src={InboxIcon} alt={"inbox-icon"} />
                </div>
                <div className={"text-sm"}>Inbox</div>
            </div>
            <div className={"flex justify-center items-center invisible group-data-[selected=true]:visible"}>
               <VerifiedIcon className={"text-product-library-display-accent-primary-tint"}/>
            </div>

        </div>
    );
};

export default InboxOption;