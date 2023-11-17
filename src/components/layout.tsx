import { cn, useGuard } from "@/lib/utils";
import {
  BellIcon,
  HomeIcon,
  SearchIcon,
  Settings,
} from "lucide-react";
import { Show } from "rc-extended/components";
import { ReactNode, Suspense } from "react";
import { Trends } from "./Trends";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useBreakPoint } from "rc-extended/use";
import { SideBarLeft } from "./SideBarLeft";

export function Spinner() {
  return (
    <div className="w-full h-full flex items-start justify-center pt-3">
      <div className="animate-spin rounded-full h-10 w-10 border-4  border-transparent border-t-primary"></div>
    </div>
  );
}

export function MainLayout({ children }) {
  const { authenticated } = useGuard();
  const br = useBreakPoint(undefined, {
    MOBILE: 768,
    DESKTOP: Infinity,
    TABLET: 993,
  });

  return (
    <>
      <Show when={br.value !== "MOBILE"}>
        <section
          className="text-gray-700 md:flex md:flex-row md:justify-between md:items-stretch m-0 h-screen">
          <Show when={authenticated}>
            <SideBarLeft br={br} />
          </Show>
          <section className={cn(
              "md:flex md:flex-row justify-between items-stretch w-full",
              "w-full flex-grow")}>
            <div className= "w-full flex-grow relative no-scrollbar overflow-x-hidden overflow-y-scroll">
                <Suspense fallback={<Spinner />}>
                    {children}
                </Suspense>
            </div>
            <Show when={authenticated}>
              <SideBarRight />
            </Show>
          </section>
        </section>
      </Show>
      <Show when={br.value === "MOBILE"}>
        <Suspense fallback={<Spinner />}>
          {children}
          <Show when={authenticated}>
            <MobileFootBar />
          </Show>
        </Suspense>
      </Show>
    </>
  );
}

function MobileFootBar() {
  return (
    <footer className="fixed left-0 right-0 bottom-0 bg-white bg-opacity-60 backdrop-blur-sm border-t flex items-center justify-evenly py-1">
      <Link to={"/home"} className="h-10 hover:bg-primary hover:bg-opacity-10 rounded-full hover:text-primary w-10 flex items-center justify-center">
        <HomeIcon size={"25px"} />
      </Link>
      <Link to={"/search"} className="h-10 hover:bg-primary hover:bg-opacity-10 rounded-full hover:text-primary w-10 flex items-center justify-center">
        <SearchIcon size={"25px"} />
      </Link>
      <Link to="/notifications" className="h-10 hover:bg-primary hover:bg-opacity-10 rounded-full hover:text-primary w-10 flex items-center justify-center">
        <BellIcon size={"25px"} />
      </Link>
      <Link to={"/settings"} className="h-10 hover:bg-primary hover:bg-opacity-10 rounded-full hover:text-primary w-10 flex items-center justify-center">
        <Settings size={"25px"} />
      </Link>
    </footer>
  );
}

function SearchBar() {
  return (
    <form className="m-auto h-10 w-full rounded-full bg-gray-100 relative">
      <SearchIcon className="absolute left-2 bottom-2 text-gray-500" />
      <input
        className="appearance-none placeholder:font-medium placeholder:text-center placeholder:italic w-full h-full rounded-full px-3 bg-transparent focus-visible:outline-offset-2 outline-primary pl-8"
        placeholder="Search Something..."
        type="search"
        name="search"
        id="search"
      />
    </form>
  );
}

export function BaseMenuItemLayout({
  children,
  foot = null,
}: {
  children: ReactNode;
  foot?: ReactNode;
}) {
  return (
    <div className="bg-gray-100 rounded-2xl w-full overflow-clip">
      <div className="p-3 w-full">{children}</div>
      {foot && <div className="py-3 px-2 w-full hover:bg-gray-200">{foot}</div>}
    </div>
  );
}

function SubscribeAd() {
  return (
    <BaseMenuItemLayout>
      <h1 className="text-2xl font-bold mb-1">Subscribe to Premium</h1>
      <p className="text-md font-medium leading-tight text-gray-500">
        Subscribe to unlock new features and if eligible, receive a share of ads
        revenue.
      </p>
      <a
        href="/"
        className=" inline-block mt-2 font-medium text-white bg-primary rounded-full px-3 py-1"
      >
        Subscribe
      </a>
    </BaseMenuItemLayout>
  );
}

function PeopleToFollow() {
  return (
    <BaseMenuItemLayout
      foot={
        <a href="/trends" className="text-primary px-2 text-sm hover:underline">
          Show More
        </a>
      }
    >
      <h1 className="text-xl font-bold">Who to follow</h1>
      <div className="flex flex-col space-y-2">
        <FollowCardHorizontal name="0xchelsey🌸🔎" handle={"@hzkhyha"} />
        <FollowCardHorizontal name="0xchelsey🌸🔎" handle={"@hzkhyha"} />
        <FollowCardHorizontal name="0xchelsey🌸🔎" handle={"@hzkhyha"} />
      </div>
    </BaseMenuItemLayout>
  );
}

export function FollowCardHorizontal({ name, handle }) {
  return (
    <div className="hover:bg-gray-200 rounded-lg p-2 flex flex-row items-center justify-between">
      <div className="flex flex-row space-x-3">
        <figure className="rounded-full h-10 w-10 overflow-hidden border">
          <img
            className="w-full h-full object-cover"
            src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
            alt="profile"
          />
        </figure>
        <div className="w-auto text-ellipsis">
          <p className="font-medium text-ellipsis leading-tight">{name}</p>
          <p className="text-sm text-gray-500 leading-tight">{handle}</p>
        </div>
      </div>
      <Button className="rounded-full text-white font-normal">Follow</Button>
    </div>
  );
}

function SideBarRight() {
  return (
    <div className="sticky top-0 bottom-0 right-0 hidden lg:flex border-l w-[70%] overflow-x-hidden overflow-y-scroll no-scrollbar transition duration-300">
      <div className="relative w-full h-full">
        <div className="bg-white px-7 py-4 sticky top-0 left-0 right-0 border-b">
          <SearchBar />
        </div>

        <div className="flex flex-col items-center space-y-5 px-7 my-4">
          <SubscribeAd />
          <Trends />
          <PeopleToFollow />
        </div>
      </div>
    </div>
  );
}
