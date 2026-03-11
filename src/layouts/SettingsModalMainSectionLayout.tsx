import type {ReactNode} from "react";

const SettingsModalMainSectionLayout = ({children}: {children: ReactNode}) => {
    return (
        <main className={"pl-large pb-xxlarge pr-large pt-large flex flex-col gap-large text-product-library-display-primary-idle-tint"}>
            {children}
        </main>
    );
};

export default SettingsModalMainSectionLayout;