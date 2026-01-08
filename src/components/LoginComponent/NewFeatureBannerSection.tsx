import LoginBanner from "../../assets/login-banner.svg";
import QRIcon from "../icons/QRIcon.tsx";
const NewFeatureBannerSection = () => {
  return (
    <section className="p-3">
      <div className="hidden lg:grid grid-cols-1 bg-brand-secondary-light rounded-large p-xlarge w-full h-full">
        <div className="h-25"></div>
        <div className="flex justify-center items-center">
          <img
            src={LoginBanner}
            alt="login-banner"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex justify-center items-center gap-xxlarge self-end">
          <div className="flex flex-col">
            <p className="text-product-library-display-secondary-idle-tint font-medium text-base">
              Take Todoist with you
            </p>
            <p className="text-sm font-regular text-product-library-display-secondary-idle-tint">
              Stay organized wherever you are with our mobile apps for iOS and
              Android.
            </p>
          </div>
          <div className="max-w-full h-auto">
            <QRIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFeatureBannerSection;
