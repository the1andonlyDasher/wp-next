import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image";


export default function PostBody({ content }: any) {
  const image = (
    <Image
      width={200}
      height={500}
      alt={`Bild aus dem Post ${content?.title}`}
      src={content?.image?.node.sourceUrl}

    />
  );

  console.log(content.carousel)
  return (<>
    <div className="min-h-80 max-w-full w-full my-10">
      {image}
      {content?.carousel &&
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          effect="cards"
          className="alt"
          spaceBetween={5}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          rewind={true}
        >
          {Object.values(content?.carousel).map((image: any, index: number) =>
            image?.node?.sourceUrl && <SwiperSlide
              key={index}
            >
              <div className={`inner default w-[310px] h-[450px] bg-cover bg-center`} style={{ backgroundImage: `url("${image?.node?.sourceUrl}")` }}></div>
            </SwiperSlide>)}
        </Swiper>
      }
    </div>
    <div className="">
      <p>{content.text}</p>
    </div>
  </>
  );
}
