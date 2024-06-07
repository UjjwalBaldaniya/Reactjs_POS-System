import React from "react";
import LoginSideIMG from "../assets/img/sign-In/login-sideIMG.png";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SignInLoginSideImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    autoplay: true, // Enable autoplay
    // autoplaySpeed: 2500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="sign-sideImg">
      <div className="">
        <div className="row crousel-heder mb-5 me-0">
          <div className="col-6 ">
            <div className="d-flex gap-2 align-content-center mt-3">
              <div className="crousel-dots"></div>
              <div className="second"></div>
              <div className="crousel-dots"></div>
              <div className="crousel-dots"></div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end me-4 ">
              <button className="crousel-btn">English</button>
            </div>
          </div>
        </div>
        <div className="container-fluid overflow-hidden">
          <Slider {...settings}>
            <div className="logo-discription">
              <div className="logo">🤹</div>
              <h1>Flavours is a seamless system with a simple interface</h1>
              <h5>
                It gives you a comprehensive view of making decisions to improve
                your overall performance
              </h5>
              <div></div>
            </div>
            <div className="logo-discription">
              <div className="logo">🗂️</div>
              <h1>
                Flavours provides you with accurate data for your business
              </h1>
              <h5>
                It gives you a comprehensive view of making decisions to improve
                your overall performance
              </h5>
              <div></div>
            </div>
            <div className="logo-discription">
              <div className="logo">🍕</div>
              <h1>You can coordinate and prepare menus</h1>
              <h5>
                Ease of adding products, with the ability to update and remove
                them as needed
              </h5>
              <div></div>
            </div>
            <div className="logo-discription">
              <div className="logo">🦾</div>
              <h1>Secure / the system is approved by the ZATCA</h1>
              <h5>
                You can try all the benefits of the system for free for 14 days
              </h5>
              <div></div>
            </div>
          </Slider>
          <div>
            <img
              className="w-100  d-none d-lg-block"
              src={LoginSideIMG}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInLoginSideImage;
