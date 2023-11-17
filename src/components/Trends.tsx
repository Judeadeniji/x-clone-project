import { MoreHorizontalIcon } from "lucide-react";
import { BaseMenuItemLayout } from "./layout";

export function Trends() {
  return (
    <BaseMenuItemLayout
      foot={
        <a href="/trends" className="text-primary px-2 text-sm hover:underline">
          Show More
        </a>
      }
    >
      <h1 className="text-2xl font-bold mb-2">Trends for you</h1>
      <div className="flex flex-col spacce-y-2">
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
        <TrendsItem />
      </div>
    </BaseMenuItemLayout>
  );
}
function TrendsItem() {
  return (
    <div className="hover:bg-gray-200 py-1 px-2 rounded-xl flex flex-row">
      <div className="w-full">
        <p className="text-gray-500 text-sm font-normal">Trending in Nigeria</p>
        <h4 className="font-bold text-lg leading-tight">Naira Crash</h4>
        <p className="text-gray-500 text-sm font-normal">1.3M views</p>
      </div>
      <MoreHorizontalIcon
        size={"20px"}
        className="self-start h-6 w-6 p-1 hover:bg-gray-300 rounded-full"
      />
    </div>
  );
}
