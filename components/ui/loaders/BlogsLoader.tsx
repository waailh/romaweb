"use client";
const BlogsLoader = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <FirstArticleLoader />
      <ArticleLoader />
      <ArticleLoader />
      <ArticleLoader />
    </div>
  );
};

export default BlogsLoader;

const FirstArticleLoader = () => {
  return (
    <div className="col-span-12">
      <div className="min-h-40 md:min-h-80 border border-gray-300 shadow rounded-md p-4 w-full">
        <div className="animate-pulse flex space-s-4">
          <div className="rounded-md bg-gray-300 w-1/2 aspect-[1.5/1]"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                <div className="h-2 bg-gray-300 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleLoader = () => {
  return (
    <div className="col-span-6 md:col-span-3">
      <div className="border border-gray-300 shadow rounded-md p-4 w-full">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="bg-gray-300 w-full aspect-square"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                <div className="h-2 bg-gray-300 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
