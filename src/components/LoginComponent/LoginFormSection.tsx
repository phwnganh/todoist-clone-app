import TodoistLogo from "../../assets/todoist-logo.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import FacebookIcon from "../../assets/facebook-icon.svg";
import AppleIcon from "../../assets/apple-icon.svg";
import HiddenEyeIcon from "../../assets/hidden-eye-icon.svg";
import { Link } from "react-router-dom";
import { type FormEvent } from "react";
const LoginFormSection = () => {

  const CLIENT_ID = "99176cc6e6af4dee9508f6422eb3216f"
  const SCOPE = "data:read_write"
  const REDIRECT_URI = "http://localhost:5173/google-redirect"

  const handleOAuthLogin = () => {
    const state = `${crypto.randomUUID()}`;
    sessionStorage.setItem("oauth_state", state);
    window.location.href = `https://todoist.com/oauth/authorize?client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPE)}&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  }
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <section className="min-h-screen flex items-center justify-center pt-8 px-4 md:px-0">
      <div className="max-w-132.5 mx-auto w-full">
        <img src={TodoistLogo} alt="todoist-logo" className="self-start" />
        <div className="pt-8 flex flex-col gap-large flex-wrap">
          {/* <h1 className="text-product-library-display-primary-idle-tint">Welcome back!</h1> */}
          <h1 className="text-library-display-primary-idle-tint font-bold text-header-xlarge">
            Welcome back!
          </h1>
          <div className="p-xsmall"></div>
          <p className="text-product-library-display-secondary-idle-tint">
            You used <span className="font-medium">Google</span> last time.
          </p>
          <div className="flex flex-col gap-medium">
            <button
                type="button"
                onClick={handleOAuthLogin}
                className="px-4 rounded-lg border border-product-library-border-idle-tint font-bold text-sm sm:text-large h-12 flex justify-center items-center gap-4"
            >
              <img src={GoogleIcon} alt="google" />
              <p>Continue with Google</p>
            </button>
            <button
                type="button"
                className="px-4 rounded-lg border border-product-library-border-idle-tint font-bold text-sm sm:text-large h-12 flex justify-center items-center gap-4"
            >
              <img src={FacebookIcon} alt="facebook" />
              <p>Continue with Facebook</p>
            </button>
            <button
                type="button"
                className="px-4 rounded-lg border border-product-library-border-idle-tint font-bold text-sm sm:text-large h-12 flex justify-center items-center gap-4"
            >
              <img src={AppleIcon} alt="apple" />
              <p>Continue with Apple</p>
            </button>
          </div>
          <hr className="border-t border-t-product-library-divider-tertiary" />
          <form
            className="flex flex-col gap-large"
            onSubmit={(e) => handleLogin(e)}
          >
            <div className="pt-2 px-2 pb-1 rounded-lg border border-product-library-border-idle-tint flex flex-col">
              <label
                htmlFor="Email"
                className="text-product-library-display-primary-idle-tint font-x-regular text-compact pb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email..."
                autoComplete="email"
                className="text-base font-medium outline-none"
              />
            </div>

            <div className="pt-2 px-2 pb-1 rounded-lg border border-product-library-border-idle-tint flex flex-col">
              <label
                htmlFor="Password"
                className="text-product-library-display-primary-idle-tint font-x-regular text-compact pb-1.5"
              >
                Password
              </label>
              <div className="flex justify-between">
                <input
                  type="password"
                  placeholder="Enter your password..."
                  autoComplete="current-password"
                  minLength={8}
                  className="text-base font-medium outline-none"
                />
                <button className="-mr-1" type="button">
                  <img src={HiddenEyeIcon} alt="hidden-eye-icon" />
                </button>
              </div>
            </div>
            <button
              className="text-product-library-actionable-primary-on-idle-tint bg-product-library-actionable-primary-idle-fill rounded-lg h-12 px-4 font-bold text-sm sm:text-large"
              type="submit"
            >
              Log in
            </button>
          </form>
          <Link
            to="#"
            className="underline text-product-library-actionable-tertiary-idle-tint text-sm"
          >
            Forgot your password?
          </Link>
          <p className="text-sm text-product-library-display-primary-idle-tint">
            By continuing with Google, Apple, or Email, you agree to Todoist’s{" "}
            <span className="underline text-product-library-actionable-tertiary-idle-tint">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline text-product-library-actionable-tertiary-idle-tint">
              Privacy Policy
            </span>
            .
          </p>
          <hr className="border-t border-t-product-library-divider-tertiary" />
          <p className="text-sm text-product-library-display-primary-idle-tint text-center">
            Don’t have an account?{" "}
            <span className="underline text-product-library-actionable-tertiary-idle-tint">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginFormSection;
