import PostPreview from "./post-preview";

export default function MoreStories({ posts }: any) {
  return (
    <div className="w-full">
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map(({ node }: any) => (
          <PostPreview
            key={node.slug}
            title={node.custompost.title}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            text={node.custompost.text}
          />
        ))}
      </div>
    </div>
  );
}
