import type {ChangeEvent} from "react";

type LabelNameSectionProps = {
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    nameValue: string;
}
const LabelNameSection = ({onNameChange, nameValue}: LabelNameSectionProps) => {
    return (
        <div>
            <label
                htmlFor="project-name"
                className="text-product-library-display-primary-idle-tint text-sm font-strong pb-1.5"
            >
                Name
            </label>
            <div className="border border-product-library-border-idle-tint rounded-small flex items-center justify-between hover:border-product-library-border-focus-tint">
                <input
                    id="label-name"
                    name="name"
                    type="text"
                    maxLength={60}
                    className="py-1.5 px-2 w-full outline-none text-sm text-product-library-display-primary-idle-tint"
                    onChange={onNameChange}
                    value={nameValue}
                />
                {nameValue.length < 60 ? (
                    <div className="mr-xsmall -ml-xsmall text-sm text-product-library-display-secondary-idle-tint">
                        {nameValue.length}/60
                    </div>
                ) : (
                    <div className="mr-xsmall -ml-xsmall text-sm text-product-library-actionable-destructive-idle-tint">
                        {nameValue.length}/60
                    </div>
                )}
            </div>
        </div>
    );
};

export default LabelNameSection;