/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn, useGuard } from "@/lib/utils";
import {
  GalleryVerticalEndIcon,
  Settings2,
  SettingsIcon,
  Share2Icon,
  TwitterIcon,
} from "lucide-react";
import { For, Match, Show, Switch } from "rc-extended/components";
import { signal, useSignal, useSignalValue } from "rc-extended/store";
import { useBreakPoint } from "rc-extended/use";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spinner } from "@/components/layout";

const tab = signal<"for-you" | "following">("for-you");

const SingleTweet = lazy(() => import("@/components/SingleTweet"));

function HomeHeaderMobile() {
  return (
    <div className="flex items-center justify-between h-[65px] px-5 bg-white bg-opacity-40 backdrop-blur-sm">
      <figure className="h-10 w-10 rounded-full border overflow-clip">
        <Link to={"/home"}>
          <img
            src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
            alt="Twitter Logo"
            className="h-10 object-cover"
          />
        </Link>
      </figure>

      <div>
        <TwitterIcon size={"30px"} />
      </div>

      <div>
        <Link to={"/settings"}>
          <SettingsIcon size={"24px"} />
        </Link>
      </div>
    </div>
  );
}

function HomeHeader({ br }: { br: ReturnType<typeof useBreakPoint> }) {
  const [$tab, setTab] = useSignal(tab);
  return (
    <>
      <Show when={br.value === "MOBILE"}>
        <HomeHeaderMobile />
      </Show>
      <div className=" z-10 sticky top-0 right-0 left-0 border-b h-[55px] items-center flex flex-row transition-colors duration-100 bg-white bg-opacity-80 backdrop-blur-sm">
        <div
          onClick={() => setTab("for-you")}
          className={cn(
            "w-[45%] flex justify-center items-center h-full hover:bg-gray-100 hover:bg-opacity-50",
            br.value === "MOBILE" && "w-1/2"
          )}
        >
          <p
            className={cn(
              "h-full text-center flex items-center text-md cursor-default",
              $tab === "for-you"
                ? "font-bold border-b-4 border-b-primary"
                : "font-medium"
            )}
          >
            For you
          </p>
        </div>
        <div
          onClick={() => setTab("following")}
          className={cn(
            "w-[45%] flex justify-center items-center h-full hover:bg-gray-100 hover:bg-opacity-50",
            br.value === "MOBILE" ? "w-[50%]" : ""
          )}
        >
          <p
            className={cn(
              "h-full text-center flex items-center text-md cursor-default",
              $tab === "following"
                ? "font-bold border-b-4 border-b-primary"
                : "font-medium"
            )}
          >
            Following
          </p>
        </div>
        <Show when={br.value !== "MOBILE"}>
          <Link
            to={"/home/pinned/edit"}
            className="self-end flex justify-center items-center w-[10%] h-[55px] hover:bg-gray-100  hover:bg-opacity-50"
          >
            <SettingsIcon />
          </Link>
        </Show>
      </div>
    </>
  );
}

function ComposeTweet() {
  return (
    <section className="border-b flex flex-row items-center space-x-5 py-4 px-5 cursor-pointer">
      <figure className="self-start border h-11 w-11 rounded-full overflow-clip">
        <img
          src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
          alt="Twitter Logo"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="w-[90%] flex flex-row space-x-3 items-center">
        <div className="rounded-full border py-2 w-[80%]">
          <span className="ml-3 text-gray-500">What's Happening?</span>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <GalleryVerticalEndIcon className="text-primary" size={"24px"} />
          <Share2Icon className="text-primary" size={"24px"} />
          <Settings2 className="text-primary" size={"24px"} />
        </div>
      </div>
    </section>
  );
}

function ForYou() {
//   const nlist = $signal(Array(1000).fill(0));
//  const docSize = useElementSize(document.body);
//  const sizes = $signal<{ [key: number]: number }>({})
  return (
    <div className="divide-y">
      <Suspense fallback={<Spinner />}>
        {/* <VariableSizeList
          height={docSize.height + 612}
          itemCount={nlist.value.length}
          itemSize={(index) => {
            return sizes.toJSON()[index - 1] || 500;
          }}
          width={'100%'}
        >
          {({ index, style }) => {
            const ref = signalRef()
            return (
              <div ref={ref} style={style} key={index}>
                <SingleTweet size={[index, sizes]} />
              </div>
            );
          }}
        </VariableSizeList> */}
        <For each={Array(10).fill(0)}>
          <SingleTweet />
        </For>
      </Suspense>
    </div>
  );
}

function Following() {
  return (
    <Suspense fallback={<Spinner />}>
      <For each={Array(10).fill(0)}>
        <SingleTweet />
      </For>
    </Suspense>
  );
}

function Home() {
  useGuard();
  const br = useBreakPoint(undefined, {
    MOBILE: 480,
    DESKTOP: 1024,
    TABLET: 768,
  });
  const $tab = useSignalValue(tab);
  return (
    <>
      <HomeHeader br={br} />
      <section className="contents">
        <Show when={br.value !== "MOBILE"}>
          <ComposeTweet />
        </Show>
        <Switch>
          <Match when={$tab === "for-you"}>
            <ForYou />
          </Match>
          <Match when={$tab === "following"}>
            <Following />
          </Match>
        </Switch>
      </section>
    </>
  );
}

export default Home;
