
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPagesWithSlugs, getPageBySlug } from "@/lib/api";
import { useRouter } from "next/router";



export const getStaticProps: GetStaticProps = async ({
    params,
}) => {
    const page = await getPageBySlug(params?.slug);
    return { props: page };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allPages = await getAllPagesWithSlugs();
    return {
        paths: allPages.edges.map(({ node }: any) => `/${node.slug}`) || [],
        fallback: true,
    };
};

export default function Page({ page }: any) {
    const router = useRouter()
    console.log(page, router.route)
    return (<>
        <section
        >
            <div className="flex flex-col justify-center gap-10 md:flex-row">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1>{page.acfDemoFields.header}</h1>
                    <p>{page.acfDemoFields.text}</p>
                </div>
                <div className="flex flex-wrap relative">
                    {/* <Image className="absolute right-40 z-[-1] border border-white border-solid rounded-md opacity-[0.2]" width={400} height={600} src={page.acfDemoFields.image.node.sourceUrl} alt={""} /> */}
                    <div className="w-[307px] h-[450px] right-40 z-[-1] border border-white border-solid rounded-md bg-cover bg-center" style={{ backgroundImage: `url("${page.acfDemoFields.image.node.sourceUrl}")` }}></div>
                    <div className="w-[307px] h-[450px] right-40 rounded-md bg-[#050505] absolute top-10 left-10 z-[-2]"></div>

                </div>

            </div>
        </section>

    </>
    );
}



