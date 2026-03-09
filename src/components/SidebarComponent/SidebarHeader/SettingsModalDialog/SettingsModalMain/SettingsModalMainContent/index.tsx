import type {ReactNode} from "react";

const SettingsModalMainContent = ({children}: {children: ReactNode}) => {
    return (
        <main className={"pl-large pb-xxlarge pr-large pt-large"}>
            {children}
        </main>
    );
};

export default SettingsModalMainContent;