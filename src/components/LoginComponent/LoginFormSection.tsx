import TodoistLogo from "../../assets/todoist-logo.svg";
const LoginFormSection = () => {
  return (
    <section className="flex justify-center items-center">
      <img src={TodoistLogo} alt="todoist-logo" />
      <div className="pt-8">
        {/* <h1 className="text-product-library-display-primary-idle-tint">Welcome back!</h1> */}
        <h1 className="text-library-display-primary-idle-tint">Welcome back!</h1>
      </div>
    </section>
  );
};

export default LoginFormSection;
