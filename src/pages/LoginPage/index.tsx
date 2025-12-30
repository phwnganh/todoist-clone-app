import LoginFormSection from "../../components/LoginComponent/LoginFormSection";
import NewFeatureBannerSection from "../../components/LoginComponent/NewFeatureBannerSection";

const LoginPage = () => {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-2">
            <LoginFormSection/>
            <NewFeatureBannerSection/>
        </main>
    );
};

export default LoginPage;