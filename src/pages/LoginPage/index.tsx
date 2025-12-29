import LoginFormSection from "../../components/LoginComponent/LoginFormSection";
import NewFeatureBannerSection from "../../components/LoginComponent/NewFeatureBannerSection";

const LoginPage = () => {
    return (
        <main className="flex justify-between">
            <LoginFormSection/>
            <NewFeatureBannerSection/>
        </main>
    );
};

export default LoginPage;