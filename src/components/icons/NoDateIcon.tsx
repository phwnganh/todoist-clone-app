
const NoDateIcon = ({className}: {className?: string}) => {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
             className={className}>
            <path fill="currentColor"
                  d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18m0 1a8 8 0 1 0 0 16 8 8 0 0 0 0-16m3.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0"></path>
        </svg>
    );
};

export default NoDateIcon;