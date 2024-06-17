import React from "react";
import Select from "react-select";
import {
  cancelIcon,
  fileUploadIcon,
  pluseIcon,
  poroductListLogo,
} from "../../assets/icons/product";
import Navbar from "../../common/Navbar";
import AddProductsContainer from "../../container/products/addProducts.container";
import {
  availabilityOption,
  barcodeSymbologyOption,
  branchOptions,
  categoryOptions,
  unitOptions,
} from "../../description/products/products.description";

const AddProduct = () => {
  const {
    selectedOption,
    setSelectedOption,
    handleBack,
    activeTime,
    handleTimeButtonClick,
    uploadedImages,
    handleDeleteImage,
    handleFileUpload,
  } = AddProductsContainer();

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
        <div className="label-input">
          <label htmlFor="">Branch</label>
          <div className="input-div">
            <div className="input-div-inner">
              <Select
                id="branch-select"
                options={branchOptions}
                value={selectedOption}
                onChange={setSelectedOption}
              />
            </div>
          </div>
        </div>
        <div className="user-pass row mb-3 mt-4">
          <div className=" col-12  col-md-6">
            <div className="label-input">
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
            <div className="label-input">
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
          <div className="row">
            <div className="col-12 col-md">
              <div className="label-input mt-4">
                <label htmlFor="">Category</label>
                <div className="input-div">
                  <div className="input-div-inner">
                    <Select
                      options={categoryOptions}
                      placeholder="Select product category"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md ">
              <div className="label-input mt-4">
                <label htmlFor="">Product Unit:</label>
                <div className="input-div">
                  <div className="input-div-inner">
                    <Select
                      options={unitOptions}
                      placeholder="Select product unit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="label-input mt-4">
                <label htmlFor="">Barcode Symbology:</label>
                <div className="input-div">
                  <div className="input-div-inner">
                    <Select
                      options={barcodeSymbologyOption}
                      placeholder="Select barcode symbology"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="label-input mt-4">
                <label htmlFor="">Code:</label>
                <div className="input-div">
                  <div className="input-div-inner">
                    <input
                      type="text"
                      className="login-input"
                      id="username"
                      name="username"
                      placeholder="Enter product code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4 label-input">
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
                    <div className="label-input">
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
                    <div className="label-input">
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

          <div className="row">
            <div className="col-6">
              <div className="label-input mt-4">
                <label htmlFor="">Availability:</label>
                <div className="input-div">
                  <div className="input-div-inner">
                    <Select
                      options={availabilityOption}
                      placeholder="Select availability"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12  label-input mt-4">
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

          <div className="col-12 label-input mt-4">
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
                <div className="label-input">
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
                <div className="label-input">
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
                <div className="label-input">
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
                <div className="label-input">
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
