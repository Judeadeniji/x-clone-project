import {
  BadgeXIcon,
  BarChart2Icon,
  BookmarkIcon,
  HeartIcon,
  ListPlusIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  Repeat2Icon,
  Share2Icon,
  SpeakerIcon,
  UserX2Icon,
} from "lucide-react";
import { Show } from "rc-extended/components";
import { signalRef } from "rc-extended/functions";
import { $signal, $watch, Signal } from "rc-extended/store";
import { useBreakPoint, useShare } from "rc-extended/use";
import { Button } from "./ui/button";
import { VerifiedIcon } from "./VerifiedIcon";
import { MuteIcon } from "./MuteIcon";

function ProfilePreview({ isHovering }) {
  return (
    <div
      onMouseLeave={() => (isHovering.value = false)}
      className="animate-fade-in duration-200 shadow-md min-w-[300px] min-h-[50px] rounded-2xl absolute top-8 bg-white p-4"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row items-start justify-between">
          <figure className="h-20 w-20 rounded-full overflow-clip">
            <img
              src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
              alt="First Profile"
              className="w-full h-full rounded-full border mr-[-9px]"
            />
          </figure>
          <Button className="rounded-full mt-2 bg-black text-white font-medium py-3 text-md px-4">
            Follow
          </Button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col max-w-[70%] text-ellipsis overflow-clip">
            <p className="text-lg leading-tight tracking-wide font-bold m-0 text-gray-800 flex items-center">
              TheLazyDev
              <span className="inline-block self-center h-5 w-5 ml-1">
                <VerifiedIcon />
              </span>
            </p>
            <span className="leading-tight text-gray-500">@FeranmiWebDev</span>
          </div>

          <div className="max-w-[90%] flex-grow overflow-clip text-ellipsis">
            <span className="w-full h-full text-md leading-3">
              BlockGames is a cross-chain, cross-game, decentralized player
              network accelerating user growth for games. {<br />} Join our
              discord:
              <a
                href="http://discord.gg/blockgames"
                className="text-primary block"
              >
                http://discord.gg/blockgames
              </a>
            </span>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-row space-x-2">
              <span className="text-black font-medium">9</span>
              <span className="text-gray-600">Following</span>
            </div>
            <div className="flex flex-row space-x-2">
              <span className="text-black font-medium">1.5M</span>
              <span className="text-gray-600">Followers</span>
            </div>
          </div>

          <div className="flex flex-row space-x-2">
            <div>
              <ProfileImages />
            </div>
            <div className="max-w-[70%] text-[12px] leading-3 text-gray-500 whitespace-pre-wrap">
              <span>
                Followed by the Bob 🤏😎, Dax, and 3 others you follow
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileImages = () => {
  return (
    <div className="flex items-center">
      {/* First profile image */}
      <img
        src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
        alt="First Profile"
        className="w-6 h-6 rounded-full border mr-[-9px]"
      />
      {/* Second profile image */}
      <img
        src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
        alt="Second Profile"
        className="w-6 h-6 rounded-full border mx-[-7px]"
      />
      {/* Third profile image */}
      <img
        src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
        alt="Third Profile"
        className="w-6 h-6 rounded-full border ml-[-7px]"
      />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SingleTweet({
  size,
}: {
  size?: [number, Signal<{ [key: number]: number }>];
}) {
  const isHovering = $signal(false);
  const br = useBreakPoint(undefined, {
    MOBILE: 768,
    DESKTOP: Infinity,
    TABLET: 993,
  });

  const ref = signalRef();

  $watch(ref, (el: HTMLDivElement) => {
    if (size && size[1].peek()[size[0]]) {
      return;
    }

    if (el && size) {
      size[1].value = ((obj: { [key: number]: number }) => {
        if (!obj) return {};
        obj ? (obj[size[0]] = el.clientHeight) : "";

        return obj;
      })(size ? size[1].value : {});
    }
  });

  return (
    <div ref={ref} className="py-1 px-1 flex cursor-pointer">
      <div className="w-full self-center flex flex-col">
        <div className=" ml-[16%] flex flex-row items-center space-x-1 py-1 px-2 text-[12px] font-medium text-gray-500">
          <div>
            <Repeat2Icon size={"16px"} />
          </div>
          <span>TheLazyDev Reposted</span>
        </div>
        <div className="flex flex-row flex-grow space-x-3 h-full w-full px-3 py-1">
          <div className="h-full w-2/12">
            <figure className="self-start border h-9 w-9 md:h-11 md:w-11 rounded-full overflow-clip">
              <img
                src="https://pbs.twimg.com/profile_images/1631189235590897665/Y4acSMaa_x96.jpg"
                alt="Twitter Logo"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
          <div className="h-full flex flex-col flex-shrink flex-grow space-y-2">
            <div className="relative flex flex-row items-center space-x-2">
              <div
                onMouseEnter={() =>
                  br.value !== "MOBILE" && (isHovering.value = true)
                }
                className="relative flex flex-row flex-wrap items-center space-x-2"
              >
                <span className="text-[14px] max-w-[40%] text-ellipsis overflow-clip font-medium text-gray-700">
                  TheLazyDev
                </span>
                <span className="text-[14px] max-w-[50%] text-ellipsis overflow-clip text-gray-400">
                  @FeranmiWebDev
                </span>
                <span>·</span>
                <span className="text-[12px] text-gray-400">2h</span>
                <Show
                  $when={
                    (br.value != "MOBILE" && isHovering) as Signal<boolean>
                  }>
                  <ProfilePreview isHovering={isHovering} />
                </Show>
              </div>
              <div className="absolute right-0 h-8 w-8 grid place-content-center rounded-full hover:text-primary hover:bg-primary hover:bg-opacity-10">
                <MoreHorizontalIcon size={"16px"} />
                <TweetMenu />
              </div>
            </div>

            <article className="w-full flex flex-col space-y-2">
              <div id="tweet">
                <span className="text-[16px] text-gray-700 text-wrap overflow-clip tracking-tight">
                  I just built a new website for my portfolio, check it out. It
                  was built with SvelteKit and TailwindCSS
                </span>
              </div>

              <div
                id="media"
                className="h-[316px] border rounded-lg overflow-clip flex-grow"
              >
                <figure className="h-full w-full">
                  <img
                    alt="Image"
                    draggable="true"
                    src="https://pbs.twimg.com/media/F-_H60MXwAAu8sz?format=jpg&amp;name=240x240"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>
            </article>

            <ShareComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

function TweetMenu() {
  return (
    <div className="absolute right-1 text-md font-bold bg-white shadow border rounded-xl overflow-clip">
      <div className="flex flex-row p-3 items-center w-full h-11 text-black hover:text-black hover:bg-gray-100">
        <span className="pr-3">
          <UserX2Icon /> 
        </span>
        <div>
          <span className="whitespace-nowrap">Unfollow @WhoSoEver</span>
        </div>
      </div>

      <div className="flex flex-row p-3 items-center w-full h-11 text-black  hover:text-black hover:bg-gray-100">
        <span className="pr-3">
          <ListPlusIcon />
        </span>
        <div>
          <span className="whitespace-nowrap">Add/Remove @WhoSoEver from Lists</span>
        </div>
      </div>

      <div className="flex flex-row p-3 items-center w-full h-11 text-black  hover:text-black hover:bg-gray-100">
        <span className="pr-3 h-8 w-8 flex items-center justify-center self-center">
          <MuteIcon className="m-0 p-0 unset justify-self-center self-center" />
        </span>
        <div>
          <span className="whitespace-nowrap">Mute @WhoSoEver</span>
        </div>
      </div>

      <div className="flex flex-row p-3 items-center w-full h-11 text-black  hover:text-black hover:bg-gray-100">
        <span className="pr-3 h-8 w-8 flex items-center justify-center self-center">
          <BadgeXIcon />
        </span>
        <div>
          <span className="whitespace-nowrap">Block @WhoSoEver</span>
        </div>
      </div>
    </div>
  )
}

function ShareComponent() {
  const share = useShare();
  return (
    <div id="share" className="flex flex-row text-gray-700 items-center justify-between px-1 select-none">
      <div className="active:bg-primary active:bg-opacity-20 h-9 w-9 flex items-center justify-center rounded-full active:text-primary">
        <MessageCircleIcon size={"18px"} />
        <span className="text-[12px] ml-1">2</span>
      </div>
      <div className="active:bg-green-500 active:bg-opacity-20 h-9 w-9 flex items-center justify-center rounded-full active:text-green-600">
        <Repeat2Icon size={"18px"} />
        <span className="text-[12px] ml-1">2</span>
      </div>
      <div className="active:bg-red-500 active:bg-opacity-20 h-9 w-9 flex items-center justify-center rounded-full active:text-red-600">
        <HeartIcon size={"18px"} />
        <span className="text-[12px] ml-1">2</span>
      </div>
      <div className=" h-9 w-9 flex items-center justify-center rounded-full">
        <BarChart2Icon size={"18px"} />
        <span className="text-[12px] ml-1">2</span>
      </div>
      <div className="active:bg-primary active:bg-opacity-20 h-9 w-9 flex items-center justify-center rounded-full active:text-primary">
        <BookmarkIcon fillRule="evenodd" size={"18px"} />
        <span className="text-[12px] ml-1">2</span>
      </div>
      <div
        className="active:bg-primary active:bg-opacity-20 h-9 w-9 flex items-center justify-center rounded-full active:text-primary"
        onClick={async () => {
          await share.share({
            title: "TheLazyDev",
            text: "I just built a new website for my portfolio, check it out. It was built with SvelteKit and TailwindCSS",
            url: "https://thelazydev.vercel.app/",
          });
        }}
      >
        <Share2Icon size={"18px"} />
        <span className="text-[14px] text-gray-700 ml-1">2</span>
      </div>
    </div>
  );
}
