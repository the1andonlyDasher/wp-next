import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  coverImage,
  date,
  author,
  text,
  title,
  slug,
}: any) {
  return (
    <div>
      <div className="mb-5">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/posts/${slug}`}
          className="hover:underline"
        >{title}</Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p
        className="text-lg leading-relaxed mb-4 line-clamp-5"
      >
        {text}
      </p>
      <Avatar author={author} />
    </div>
  );
}
