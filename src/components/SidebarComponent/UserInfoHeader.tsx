import SmallArrowDownIcon from "../../assets/small-arrow-down-icon.svg";
import LoadingSpin from "../ui/LoadingSpin.tsx";
import ErrorDisplayed from "../ui/ErrorDisplayed.tsx";
import { useGetUserProfile } from "../../hooks/useUserProfile.ts";

const UserInfoHeader = () => {
  const { data: user, isLoading, isError } = useGetUserProfile();

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return <ErrorDisplayed />;
  }
  return (
    <button className="flex items-center py-0.75 -ml-0.75 hover:bg-product-library-selectable-secondary-hover-fill hover:rounded-small">
      <div className="w-6.5 h-6.5 bg-white -ml-1.5 mr-1.5">
        <img
          src={user?.avatar_medium}
          alt={user?.full_name}
          className={"rounded-full"}
        />
      </div>
      <span className="flex items-center">
        <span className="whitespace-nowrap text-product-library-display-primary-idle-tint overflow-hidden">
          {user?.full_name?.trim().split(" ")[0]}
        </span>
        <img src={SmallArrowDownIcon} alt={"small-arrow-down-icon"} />
      </span>
    </button>
  );
};

export default UserInfoHeader;
