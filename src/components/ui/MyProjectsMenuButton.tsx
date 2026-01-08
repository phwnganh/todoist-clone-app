const MyProjectsMenuButton = ({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) => {
  return (
    <button
      className={`text-sm text-start px-3 py-1.5 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small ${
        danger ? "text-product-library-display-accent-primary-tint" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default MyProjectsMenuButton;
