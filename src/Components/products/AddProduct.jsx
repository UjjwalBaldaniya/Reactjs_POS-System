import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  cancelIcon,
  fileUploadIcon,
  pluseIcon,
  poroductListLogo,
} from "../../assets/icons/product";
import Navbar from "../../common/Navbar";

const AddProduct = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const [activeTime, setActiveTime] = useState(null);
  const handleBack = () => {
    navigate("/products");
  };
  const options = [
    { value: "all", label: "For all branch" },
    { value: "doha", label: "doha" },
  ];
  const options2 = [
    { value: "branch", label: "🥤 For all branch" },
    { value: "steak", label: " 🥩 Steak" },
    { value: "sandwiches", label: "🌯 Sandwiches" },
    { value: "hoot_drinks", label: "☕ Hot Drinks" },
    { value: "side_dishes", label: "🍱 Side Dishes" },
    { value: "Ice_cream", label: "🍦 Ice cream" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const handleTimeButtonClick = (time) => {
    setActiveTime(time);
  };

  const handleFileUpload = (files) => {
    // Convert FileList to Array
    const filesArray = Array.from(files);

    // Update uploadedImages state
    setUploadedImages((prevImages) => [...prevImages, ...filesArray]);
  };
  const handleDeleteImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    // Update the state with the new array without the deleted image
    setUploadedImages(updatedImages);
  };
  return (
    <div>
      <Navbar
        title="Add New Product"
        showExportBtn={false}
        showNewAddBtn={false}
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <div className="col-12">
        <div className="lable-input">
          <label htmlFor="">Branch</label>
          <div className="input-div">
            <div className="input-div-inner">
              <Select
                id="branch-select"
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
              />
            </div>
          </div>
        </div>
        <div className="user-pass row mb-3 mt-4">
          <div className=" col-12  col-md-6">
            <div className="lable-input">
              <label htmlFor="">Product Name (English)</label>
              <div className="input-div">
                <div className="input-div-inner">
                  <input
                    type="text"
                    className="login-input"
                    id="username"
                    name="username"
                    placeholder="Enter product Name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" col-12  col-md-6">
            <div className="lable-input">
              <label htmlFor="">Product Name (Arabic)</label>
              <div className="input-div">
                <div className="input-div-inner">
                  <input
                    type="email"
                    className="login-input"
                    name="email"
                    placeholder="Enter product Name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lable-input mt-4">
            <label htmlFor="">Branch</label>
            <div className="input-div">
              <div className="input-div-inner">
                <Select
                  //   id="branch-select"
                  options={options2}
                  // value={selectedOption2}
                  onChange={setSelectedOption2}
                  placeholder="Select product category"
                />
              </div>
            </div>
          </div>
          <div className="col-12 mt-4 lable-input">
            <label>Preparation Time</label>
            <div className="row">
              <div className="col-12  col-md-6 d-flex justify-content-between">
                <div>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "10m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("10m")}
                  >
                    10m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "15m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("15m")}
                  >
                    15m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "20m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("20m")}
                  >
                    20m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "30m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("30m")}
                  >
                    30m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "45m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("45m")}
                  >
                    45m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "1h" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("1h")}
                  >
                    1h
                  </button>
                </div>
                <div className="or">OR</div>
              </div>

              {/* <div className="col-12  col-md-6">11</div> */}
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className=" col-6 col-md-6">
                    <div className="lable-input">
                      <div className="input-div">
                        <div className="input-div-inner">
                          <input
                            type="text"
                            className="login-input"
                            id="username"
                            name="username"
                            value={activeTime === "1h" ? "1" : ""}
                            placeholder="Hourse"
                            style={{ fontWeight: 700 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-6 ">
                    <div className="lable-input">
                      <div className="input-div">
                        <div className="input-div-inner">
                          <input
                            type="text"
                            className="login-input"
                            id="username"
                            value={activeTime === "1h" ? "0" : activeTime}
                            // name="username"
                            placeholder="Minutes"
                            style={{ fontWeight: 700 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12  lable-input mt-4">
            <label htmlFor="">Stock</label>
            <div className="row">
              {" "}
              <div className="col-12 col-md-6 ">
                <div className="input-div">
                  <div className="input-div-inner">
                    <input
                      type="text"
                      className="login-input"
                      id="username"
                      name="username"
                      placeholder="Enter stock"
                    />
                  </div>
                </div>
              </div>
              <div className=" col-12 col-md-6">
                <div className="input-div">
                  <div className="input-div-inner">
                    <input
                      type="email"
                      className="login-input"
                      name="email"
                      placeholder="Infinite Stock"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 lable-input mt-4">
            <label htmlFor="">Product Images</label>
            <div className="img-uploade">
              <p>Or drag images here</p>
              {uploadedImages?.length !== 0 &&
                uploadedImages.map((image, index) => (
                  <div className="img-upload-div d-flex position-relative ">
                    <img
                      className="img-fluid rounded-3 mx-2"
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                    />
                    <button
                      className="cancel-btn btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                      onClick={() => handleDeleteImage(index)}
                    >
                      {cancelIcon}
                    </button>
                  </div>
                ))}
              <div className="img-upload-div">
                <button className="img-uploade-btn">
                  {fileUploadIcon}
                  <label htmlFor="file-upload" className="img-upload-btn">
                    <span>Upload Images</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    style={{ display: "none" }} // Hide the input element
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="row">
              <div className=" col-12 col-md-6">
                <div className="lable-input">
                  <div className="input-div">
                    <div className="input-div-inner">
                      <lable className="text-area-lable">
                        Product Description (English)
                      </lable>
                      <textarea
                        type="text"
                        className="text-area pb-5"
                        id="username"
                        name="username"
                        aria-label="Product Option List"
                        // value={activeTime === "1h" ? "1" : ""}
                        placeholder="Enter product description"
                        // style={{ fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 ">
                <div className="lable-input">
                  <div className="input-div">
                    <div className="input-div-inner">
                      <lable className="text-area-lable">
                        Product Description (Arabic)
                      </lable>
                      <textarea
                        type="text"
                        className="text-area pb-5"
                        id="username"
                        name="username"
                        aria-label="Product Option List"
                        // value={activeTime === "1h" ? "1" : ""}
                        placeholder="Enter product description"
                        // style={{ fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="row">
              <div className=" col-12 col-md-6">
                <div className="lable-input">
                  <div className="input-div">
                    <div className="input-div-inner">
                      <lable className="text-area-lable">
                        Product Option List
                      </lable>
                      <div className="product-optionlist">
                        <div className="product-optionlist-logo mb-2">
                          {poroductListLogo}
                        </div>
                        <p>There are no options</p>
                      </div>
                      <div>
                        <button className="product-optionlist-btn mt-3">
                          {pluseIcon}Add Option
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 ">
                <div className="lable-input">
                  <div className="input-div">
                    <div className="input-div-inner">
                      <lable className="text-area-lable">
                        Product Option List
                      </lable>
                      <div className="product-optionlist">
                        <div className="product-optionlist-logo mb-2">
                          {poroductListLogo}
                        </div>
                        <p>There are no options</p>
                      </div>
                      <div>
                        <button className="product-optionlist-btn mt-3">
                          {pluseIcon}Add Option
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <button className="product-optionlist-btn mt-3 create-product">
                    {pluseIcon} Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
