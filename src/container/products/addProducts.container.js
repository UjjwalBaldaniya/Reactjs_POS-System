import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { branchOptions } from "../../description/products/products.description";

const AddProductsContainer = () => {
  const navigate = useNavigate();

  const [uploadedImages, setUploadedImages] = useState([]);
  const [activeTime, setActiveTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(branchOptions[0]);

  const handleBack = () => {
    navigate("/products");
  };

  const handleTimeButtonClick = (time) => {
    setActiveTime(time);
  };

  const handleFileUpload = (files) => {
    const filesArray = Array.from(files);
    setUploadedImages((prevImages) => [...prevImages, ...filesArray]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
  };

  return {
    selectedOption,
    setSelectedOption,
    handleBack,
    activeTime,
    handleTimeButtonClick,
    uploadedImages,
    handleDeleteImage,
    handleFileUpload,
  };
};

export default AddProductsContainer;
