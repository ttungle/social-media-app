export interface PostSkeletonProps {}

export function PostSkeleton(props: PostSkeletonProps) {
  return (
    <div className="max-w-2xl mx-auto my-4 rounded-lg bg-white shadow animate-pulse">
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="w-52 h-10 bg-gray-200 rounded-lg"></div>
        <div className="w-24 h-8 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="w-full h-[42rem] mt-8 bg-gray-200 rounded-sm"></div>

      <div className="w-16 h-8 mt-4 ml-4 mb-3 bg-gray-200 rounded-lg"></div>
      <div className="border-t"></div>
      <div className="flex items-center justify-around py-3">
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
