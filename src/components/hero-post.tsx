
import Link from "next/link";
import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";

export default function HeroPost({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
}: any) {
    return (
        <section>
            <div className="mb-8 md:mb-16">

                {coverImage && (<CoverImage title={title} coverImage={coverImage} slug={slug} />)}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>

                    <Link
                        href={`/posts/${slug}`}
                        className="hover:underline"
                    ><h1 className="capitalize mb-4 text-4xl lg:text-6xl leading-tight">{slug}</h1></Link>

                    <div className="mb-4 md:mb-0 text-lg">
                        <Date dateString={date} />
                    </div>
                </div>
                <div>
                    <div
                        className="text-lg leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                    <Avatar author={author} />
                </div>
            </div>
        </section>
    );
}