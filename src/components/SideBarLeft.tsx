import { cn } from "@/lib/utils";
import {
  BellIcon,
  FeatherIcon,
  HomeIcon,
  ListIcon,
  LogOutIcon,
  LucideMessagesSquare,
  MoreHorizontalIcon,
  SearchIcon,
  StarIcon,
  TwitterIcon,
  User2Icon,
  Users2Icon,
  UserPlus2Icon,
} from "lucide-react";
import { Show } from "rc-extended/components";
import { ReactNode, forwardRef } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useBreakPoint } from "rc-extended/use";
import { $signal } from "rc-extended/store";
import { useUserStore } from "@/lib/store";

const SideBarLeftLink = forwardRef<
  HTMLAnchorElement,
  {
    text?: string;
    icon: ReactNode;
    br: ReturnType<typeof useBreakPoint>;
    className?: string;
  }
>(({ text, icon, className, br, ...rest }, ref) => {
  return (
    <Link
      draggable
      to={`/${text?.toLocaleLowerCase() || ""}`}
      ref={ref}
      {...rest}
      className={cn(
        "self-center cursor-pointer flex flex-row space-x-1 my-1 items-center py-2 px-6 rounded-full hover:bg-gray-50",
        className,
        br.value === "TABLET" && "px-0 justify-center w-[content-fit]"
      )}
    >
      <div
        className={cn(
          "h-9 w-9 my-0 inline-flex items-center",
          !text && "flex self-center"
        )}
      >
        {icon}
      </div>
      {br.value !== "TABLET" && (
        <Show when={text}>
          <p className="md:text-2xl self-center font-medium my-auto leading-tight">
            {text}
          </p>
        </Show>
      )}
    </Link>
  );
});
export function SideBarLeft({ br }: { br: ReturnType<typeof useBreakPoint> }) {
  return (
    <div
      className={cn(
        "overflow-y-scroll no-scrollbar overflow-x-hidden sticky top-0 bottom-0 left-0 hidden md:flex sm:flex-col min-w-[100px] max-w-[35%] border-r pt-5 pb-6 px-4",
        br.value === "TABLET" && "p-0 min-w-[50px]"
      )}
    >
      <div className="relative h-full self-center flex flex-col justify-between lg:mx-5">
        <div
          className={cn("mx-6", br.value === "TABLET" && " flex flex-col m-0")}
        >
          <SideBarLeftLink
            br={br}
            icon={<TwitterIcon size="30px" />}
            className="inline-flex items-center justify-center h-12 w-12 rounded-full my-3"
          />
          <SideBarLeftLink
            br={br}
            text="Home"
            icon={<HomeIcon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Explore"
            icon={<SearchIcon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Notification"
            icon={<BellIcon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Messages"
            icon={<LucideMessagesSquare size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Lists"
            icon={<ListIcon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Communities"
            icon={<Users2Icon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Premium"
            icon={<StarIcon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="Profile"
            icon={<User2Icon size="30px" />}
          />
          <SideBarLeftLink
            br={br}
            text="More"
            icon={
              <MoreHorizontalIcon
                className="p-[2px] border-2 border-black rounded-full"
                size="30px"
              />
            }
          />

          {
            // eslint-disable-next-line no-extra-boolean-cast
            !!(br.value !== "TABLET") ? (
              <a
                href="/"
                className="self-center inline-block text-center rounded-full my-4 font-medium text-lg w-full py-3 text-white bg-[#1d9bf0]"
              >
                Post
              </a>
            ) : (
              <Button className="rounded-full bg-primary text-white h-[50px] w-[50px] self-center mx-auto my-3 font-medium">
                <FeatherIcon />
              </Button>
            )
          }
        </div>

        <SideBarProfile br={br} />
      </div>
    </div>
  );
}

function SideBarProfileModal({ br }) {
  const { logOut } = useUserStore();
  const navigate = useNavigate();
  const isPending = $signal(false)
  return (
    <div className="absolute bottom-8 left-0 right-0 bg-white shadow border border-gray-200 p-2 rounded-md">
      <div onClick={() => navigate("/profile")} className={cn("cursor-pointer w-full rounded hover:bg-gray-500 hover:bg-opacity-10 p-3 flex items-center justify-between", br.value == "TABLET" && "px-1 py-2 my-1 justify-center")}>
        <Show when={br.value !== "TABLET"}>
          <span className="text-gray-700 text-md font-medium">Profile</span>
        </Show>
        <figure className="rounded-full h-[25px] w-[25px] overflow-hidden border">
          <img
            className="w-full h-full object-cover"
            src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
            alt="profile"
          />
        </figure>
      </div>
      <div className={cn("cursor-pointer w-full rounded hover:bg-gray-500 hover:bg-opacity-10 p-3 flex items-center justify-between", br.value == "TABLET" && "px-1 py-2 my-1 justify-center")}>
        <Show when={br.value !== "TABLET"}>
          <span className="text-gray-700 text-md font-medium">Add Existing User</span>
        </Show>
        <UserPlus2Icon size={"20px"} />
      </div>
      <div
        onClick={() => logOut(() => {
          isPending.value = true
          navigate("/");
          isPending.value = false
        })}
        className={cn("cursor-pointer w-full rounded hover:bg-red-500 hover:bg-opacity-10 p-3 flex items-center justify-between", br.value == "TABLET" && "px-1 py-2 my-1 justify-center", isPending.value && "pointer-events-none cursor-not-allowed opacity-50")}
      >
        <Show when={br.value !== "TABLET"}>
          <span className="text-red-500 text-md font-medium">Log Out</span>
        </Show>
        <LogOutIcon className="text-red-500" size={"20px"} />
      </div>
    </div>
  );
}

function SideBarProfile({ br }) {
  const isHovering = $signal(false);
  return (
    <div
      onMouseLeave={() => (isHovering.value = false)}
      className="relative mt-3 rounded-full p-2 mx-3 flex flex-row justify-between items-center hover:bg-gray-50"
    >
      <figure
        onMouseEnter={() => (isHovering.value = true)}
        className="cursor-pointer rounded-full h-10 w-10 overflow-hidden border"
      >
        <img
          className="w-full h-full object-cover"
          src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
          alt="profile"
        />
      </figure>
      <Show $when={isHovering}>
        <SideBarProfileModal br={br} />
      </Show>
      <Show when={br.value !== "TABLET"}>
        <div className="mx-auto">
          <h3 className="font-bold text-lg">TheLazyDev</h3>
          <p className="text-gray-500">@feranmiwebdev</p>
        </div>
        <div onMouseEnter={() => (isHovering.value = true)}>
          <MoreHorizontalIcon className="h-8 w-8 rounded-full hover:bg-gray-100 p-1" />
        </div>
      </Show>
    </div>
  );
}
