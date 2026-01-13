
const CalendarIcon = () => {
    const day = new Date().getDate()
    return (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="currentColor">
                <path fillRule="nonzero" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"/>
                <text
                    x="12"
                    y="15"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="500"
                    fill="currentColor"
                >
                    {day}
                </text>
            </g>
        </svg>
    );
};

export default CalendarIcon;