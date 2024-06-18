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
    isInfiniteStock,
    handleInfiniteStock,
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

      <div>
        <label htmlFor="" className="formField-label">
          Branch
        </label>
        <Select
          id="branch-select"
          options={branchOptions}
          value={selectedOption}
          onChange={setSelectedOption}
        />
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md">
          <label htmlFor="" className="formField-label">
            Product Name (English)
          </label>
          <input
            type="text"
            className="formField-input"
            id="username"
            name="username"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="col-12 col-md">
          <label htmlFor="" className="formField-label">
            Product Name (Arabic)
          </label>
          <input
            type="email"
            className="formField-input"
            name="email"
            placeholder="Enter Product Name"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md">
          <label htmlFor="" className="formField-label">
            Category
          </label>
          <Select
            options={categoryOptions}
            placeholder="Select Product Category"
          />
        </div>
        <div className="col-12 col-md">
          <label htmlFor="" className="formField-label">
            Product Unit:
          </label>
          <Select options={unitOptions} placeholder="Select Product Unit" />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <label htmlFor="" className="formField-label">
            Barcode Symbology:
          </label>
          <Select
            options={barcodeSymbologyOption}
            placeholder="Select Barcode Symbology"
          />
        </div>
        <div className="col">
          <label htmlFor="" className="formField-label">
            Code:
          </label>
          <input
            type="text"
            className="formField-input"
            id="username"
            name="username"
            placeholder="Enter Product Code"
          />
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

      <div className="row mt-4">
        <div className="col-12 col-md z-3">
          <label htmlFor="" className="formField-label">
            Availability:
          </label>
          <Select
            options={availabilityOption}
            placeholder="Select Availability"
          />
        </div>
        <div className="col-12 col-md">
          <label htmlFor="" className="formField-label">
            Stock
          </label>
          <div className="row">
            <div className="col-12 col-md">
              <input
                type="text"
                className="formField-input"
                id="username"
                name="username"
                placeholder="Enter Stock"
                readOnly={isInfiniteStock}
                style={{ opacity: isInfiniteStock && 0.5 }}
              />
            </div>
            <div className=" col-12 col-md">
              <button
                className={`formField-input ${
                  isInfiniteStock && "infinite-click"
                }`}
                onClick={handleInfiniteStock}
              >
                Infinite Stock
              </button>
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
                    placeholder="Enter Product Description"
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
                    placeholder="Enter Product Description"
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
          {/* <div className=" col-12 col-md-6">
            <div className="label-input">
              <div className="input-div">
                <div className="input-div-inner">
                  <lable className="text-area-lable">Product Option List</lable>
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
          <div className="col-12 col-md-6">
            <div className="label-input">
              <div className="input-div">
                <div className="input-div-inner">
                  <lable className="text-area-lable">Product Option List</lable>
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
          </div> */}

          <div className="mb-4">
            <button className="product-optionlist-btn mt-3 create-product">
              {pluseIcon} Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
