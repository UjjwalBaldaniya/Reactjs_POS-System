import React, { useEffect } from "react";
import LoginSideIMG from "../assets/img/sign-In/login-sideIMG.png";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import i18n from "../utils/i18next";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/slice/languageSlice";

const SignInLoginSideImage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.language?.language);

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    autoplay: true,
    // autoplaySpeed: 2500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const changeLanguage = () => {
    const newLanguage = language === "EN" ? "AR" : "EN";
    localStorage.setItem("language", newLanguage);
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const defaultLanguage = localStorage.getItem("language");
    if (defaultLanguage) {
      dispatch(setLanguage(defaultLanguage));
      i18n.changeLanguage(defaultLanguage);
    }
  }, [dispatch]);

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
            <div className="d-flex align-items-center justify-content-end">
              <DropdownButton
                id="dropdown-basic-button"
                title={language === "EN" ? "English" : "العربية"}
                className="crousel-btn"
                variant="secondary"
              >
                <Dropdown.Item
                  onClick={changeLanguage}
                  disabled={language === "EN"}
                >
                  English
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={changeLanguage}
                  disabled={language === "AR"}
                >
                  العربية
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
        <div className="container-fluid overflow-hidden">
          <Slider {...settings}>
            <div className="logo-discription">
              <div className="logo">🤹</div>
              <h1>{t("slider.heading1")}</h1>
              <h5>{t("slider.subHeading1")}</h5>
              <div></div>
            </div>
            <div className="logo-discription">
              <div className="logo">🗂️</div>
              <h1>{t("slider.heading2")}</h1>
              <h5>{t("slider.subHeading2")}</h5>
              <div></div>
            </div>
            <div className="logo-discription">
              <div className="logo">🍕</div>
              <h1>{t("slider.heading3")}</h1>
              <h5>{t("slider.subHeading3")}</h5>
              <div></div>
            </div>
            <div className="logo-discription">
              <div className="logo">🦾</div>
              <h1>{t("slider.heading4")}</h1>
              <h5>{t("slider.subHeading4")}</h5>
              <div></div>
            </div>
          </Slider>
          <div className="position-relative">
            <img
              className="w-100  d-none d-lg-block"
              src={LoginSideIMG}
              alt=""
            />
            <div className="c-shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInLoginSideImage;
