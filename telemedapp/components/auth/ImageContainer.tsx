import Image from "next/image";
import journeyImage from "@/images/journey.jpg";

function ImageContainer() {
  return (
    <div className="  w-max ">
      <Image
        className="max-w-full h-full block"
        src={journeyImage}
        alt="Long Road Image"
      />
      <p className="text-3xl font-extrabold pb-10 mb-8 text-neutral-50 absolute top-[40%] left-[5%] pr-[2%] lg:pr-[20%] max-[360px]:top-[18%]">
        A journey of a thousand miles begins with a single step
      </p>
    </div>
  );
}

export default ImageContainer;
