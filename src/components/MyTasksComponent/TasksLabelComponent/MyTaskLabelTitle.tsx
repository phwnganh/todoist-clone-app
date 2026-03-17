import type {Label} from "@/types/label.type.ts";

type MyTaskLabelTitleProps = {
    labelData?: Label
}
const MyTaskLabelTitle = ({labelData}: MyTaskLabelTitleProps) => {
    return (
        <div className={"mt-2"}>
            <h1 className={"p-1 font-strong text-product-library-display-primary-idle-tint text-header-large"}>
                {labelData?.name}
            </h1>
        </div>
    );
};

export default MyTaskLabelTitle;