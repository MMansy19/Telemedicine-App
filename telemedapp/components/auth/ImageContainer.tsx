import Image from "next/image";
import journeyImage from "@/images/journey.jpg";

function ImageContainer() {
  return (
    <div className=" flex-[1.4_1_0%] relative max-w-full max-h-[60%] lg:max-w-[58%] lg:max-h-full lg:h-full ">
      <Image
        className="max-w-full h-full block"
        src={journeyImage}
        alt="Long Road Image"
      />
      <p className="text-3xl font-extrabold text-neutral-50 absolute top-[40%] left-[5%] pr-[2%] lg:pr-[20%] max-[360px]:top-[18%]">
        A journey of a thousand miles begins with a single step
      </p>
    </div>
  );
}

export default ImageContainer;
