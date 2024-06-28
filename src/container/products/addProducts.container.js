import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, editProduct } from "../../api/services/productService";
import { getDropdownOptions } from "../../common/functions/getDropdownOptions";
import { availabilityOption } from "../../description/products/products.description";
import { fetchBaseUnits } from "../../redux/slice/baseUnitSlice";
import { fetchCategory } from "../../redux/slice/categorySlice";
import { fetchProductById, setEdit } from "../../redux/slice/product.slice";
import { fetchUnits } from "../../redux/slice/unitSlice";
import { fetchVariations } from "../../redux/slice/variationSlice";

const AddProductsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryData } = useSelector((state) => state?.category);
  const { baseUnitsData } = useSelector((state) => state?.baseUnit);
  const { unitsData } = useSelector((state) => state?.unit);
  const { variationData } = useSelector((state) => state?.variation);
  const { isEdit, productDataById } = useSelector((state) => state?.product);

  const categoryOptions = getDropdownOptions(
    categoryData,
    "_id",
    "category_name"
  );
  const baseUnitOptions = getDropdownOptions(
    baseUnitsData,
    "_id",
    "base_unit_name"
  );
  const unitOptions = getDropdownOptions(unitsData, "_id", "unit_name");
  const variationNameOptions = getDropdownOptions(
    variationData,
    "_id",
    "variations_name"
  );

  const handleBack = () => {
    navigate("/products");
  };

  ///

  const editAvailability =
    productDataById?.single_details?.availability === false
      ? availabilityOption?.[1]
      : availabilityOption?.[0];

  const getEditImages = productDataById?.product_images?.map((image) => ({
    file: image?.images,
  }));

  const initialValues = {
    availability: editAvailability,
    barcodeSymbology: productDataById?.barcode_symbol || "",
    category: productDataById?.category_id?._id || "",
    itemType: productDataById?.item_type || "",
    options: [],
    productBaseUnit: productDataById?.base_unit_id?._id || "",
    productCode: productDataById?.code || "",
    productCost: productDataById?.single_details?.product_cost || "",
    productDescriptionArabic: productDataById?.product_description_ar || "",
    productDescriptionEnglish: productDataById?.product_description_en || "",
    productNameArabic: productDataById?.product_name_ar || "",
    productNameEnglish: productDataById?.product_name_en || "",
    productPrice: productDataById?.single_details?.product_price || "",
    productType: productDataById?.product_type || "",
    purchaseUnit: productDataById?.purchase_unit_id?._id || "",
    saleUnit: productDataById?.sale_unit_id?._id || "",
    stock: productDataById?.single_details?.stock || "",
    supplier: productDataById?.supplier_name || "",
    variations: "",
    variationsType: [],
    uploadedImages: isEdit ? getEditImages : [],
  };

  const onSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    const getFileFromPath = async (filePath) => {
      const response = await fetch(filePath);
      const blob = await response.blob();
      return new File([blob], filePath.split("\\").pop(), { type: blob.type });
    };

    const getFileFromBlob = async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new File([blob], "blob_image", { type: blob.type });
    };

    setSubmitting(true);

    const formData = new FormData();
    formData.append("product_name_en", values.productNameEnglish);
    formData.append("product_name_ar", values.productNameArabic);
    formData.append(
      "category_id",
      isEdit ? values.category : values.category?.value
    );
    formData.append(
      "base_unit_id",
      isEdit ? values.productBaseUnit : values.productBaseUnit?.value
    );
    formData.append(
      "item_type",
      isEdit ? values.itemType : values.itemType?.value
    );
    formData.append("supplier_name", values.supplier);
    formData.append(
      "sale_unit_id",
      isEdit ? values.saleUnit : values.saleUnit?.value
    );
    formData.append(
      "purchase_unit_id",
      isEdit ? values.purchaseUnit : values.purchaseUnit?.value
    );
    formData.append(
      "barcode_symbol",
      isEdit ? values.barcodeSymbology : values.barcodeSymbology?.value
    );
    formData.append("code", values.productCode);
    formData.append("product_description_en", values.productDescriptionEnglish);
    formData.append("product_description_ar", values.productDescriptionArabic);

    for (const image of values?.uploadedImages) {
      let file;
      if (image?.file?.startsWith("blob:")) {
        file = await getFileFromBlob(image?.file);
      } else {
        file = await getFileFromPath(image?.file);
      }
      formData.append("images", file);
    }

    formData.append(
      "product_type",
      isEdit ? values.productType : values.productType?.value
    );
    formData.append("single_details[product_cost]", values.productCost);
    formData.append("single_details[product_price]", values.productPrice);
    formData.append(
      "single_details[availability]",
      values.availability?.value === "available" ? true : false
    );
    formData.append("single_details[stock]", values.stock);

    try {
      const response = isEdit
        ? await editProduct(productDataById?._id, formData)
        : await addProduct(formData);

      if (response) {
        handleBack();
        resetForm();
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  const handleFileUpload = (files, push) => {
    const filesArray = Array.from(files);
    filesArray?.forEach((file) => {
      const dataUrl = { file: URL.createObjectURL(file) };
      push(dataUrl);
    });
  };

  const handleDeleteImage = (index, remove) => {
    remove(index);
  };

  ///

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBaseUnits());
    dispatch(fetchUnits());
    dispatch(fetchVariations());

    if (id) {
      dispatch(fetchProductById(id));
      dispatch(setEdit(true));
    }
  }, [dispatch, id]);

  return {
    categoryOptions,
    baseUnitOptions,
    unitOptions,
    variationNameOptions,
    variationData,
    handleBack,
    initialValues,
    onSubmit,
    handleFileUpload,
    handleDeleteImage,
  };
};

export default AddProductsContainer;
