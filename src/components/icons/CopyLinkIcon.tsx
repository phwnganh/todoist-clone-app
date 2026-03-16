
const CopyLinkIcon = ({className}: {className: string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
             aria-hidden="true" className={className}>
            <path fill="currentColor"
                  d="m8.354 12.95-.708-.707L5.88 14.01a3 3 0 1 0 4.242 4.243l3.536-3.536a3 3 0 0 0 0-4.242l-.707.707a2 2 0 0 1 0 2.828l-3.536 3.536a2 2 0 1 1-2.828-2.828z"></path>
            <path fill="currentColor"
                  d="m15.778 11.182.707.707 1.768-1.768A3 3 0 1 0 14.01 5.88l-3.535 3.535a3 3 0 0 0 0 4.243l.707-.707a2 2 0 0 1 0-2.829l3.535-3.535a2 2 0 1 1 2.829 2.828z"></path>
        </svg>
    );
};

export default CopyLinkIcon;