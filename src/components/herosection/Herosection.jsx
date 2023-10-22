import React from "react";
import image1 from "../../image/1.jpg";
import image2 from "../../image/2.jpg";
import image3 from "../../image/3.jpg";
import image4 from "../../image/4.jpg";
import image5 from "../../image/5.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Herosection = () => {
  return (
    <>
      <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
        <div className="w-full h-[700px]">
          <img className="h-full w-full" src={image1} />
        </div>
        <div className="w-full h-[700px]">
          <img className="h-full w-full" src={image2} />
        </div>
        <div className="w-full h-[700px]">
          <img className="h-full w-full" src={image3} />
        </div>
        <div className="w-full h-[700px]">
          <img className="h-full w-full" src={image4} />
        </div>
        <div className="w-full h-[700px]">
          <img className="h-full w-full" src={image5} />
        </div>
      </Carousel>
    </>
  );
};

export default Herosection;
