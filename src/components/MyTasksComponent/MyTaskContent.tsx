import ReactMarkdown from "react-markdown";
const MyTaskContent = ({content}: {content: string}) => {
    return (
        <ReactMarkdown
            components={{
                a: ({ ...props }) => (
                    <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-product-library-actionable-primary-idle-fill underline"
                    />
                )
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MyTaskContent;