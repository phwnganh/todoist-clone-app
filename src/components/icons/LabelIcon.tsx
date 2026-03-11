
const LabelIcon = ({className}: {className: string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
             aria-hidden="true" className={className}>
            <path fill="currentColor" fillRule="evenodd"
                  d="m3.914 11.086 6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.172a2 2 0 0 1 0-2.828m.707.707a1 1 0 0 0 0 1.414l6.172 6.172a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293zM14.75 10.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
                  clipRule="evenodd"/>
        </svg>
    );
};

export default LabelIcon;