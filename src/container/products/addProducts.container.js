import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  deleteProductImage,
  editProduct,
} from "../../api/services/productService";
import {
  editDropdownObject,
  getDropdownOptions,
} from "../../common/functions/getDropdownOptions";
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

  const { categoryData = [] } = useSelector((state) => state?.category || {});
  const { baseUnitsData = [] } = useSelector((state) => state?.baseUnit || {});
  const { unitsData = [] } = useSelector((state) => state?.unit || {});
  const { variationData = [] } = useSelector((state) => state?.variation || {});
  const {
    productDataById = {},
    isEdit,
    status,
  } = useSelector((state) => state?.product || {});

  const {
    category_id = {},
    base_unit_id = {},
    item_type = "",
    sale_unit_id = {},
    purchase_unit_id = {},
    barcode_symbol = "",
    product_type = "",
    variation_details = [],
    single_details = {},
    product_images = [],
    code = "",
    product_description_ar = "",
    product_description_en = "",
    product_name_ar = "",
    product_name_en = "",
    supplier_name = "",
    _id = "",
  } = productDataById || {};

  const initialCategory = editDropdownObject(
    category_id,
    "category_name",
    "_id"
  );
  const initialBaseUnit = editDropdownObject(
    base_unit_id,
    "base_unit_name",
    "_id"
  );
  const initialSaleUnit = editDropdownObject(sale_unit_id, "unit_name", "_id");
  const initialPurchaseUnit = editDropdownObject(
    purchase_unit_id,
    "unit_name",
    "_id"
  );
  const initialVariationId = editDropdownObject(
    variation_details?.[0]?.variation_id,
    "variations_name",
    "_id"
  );
  const initialVariationTypeId = variation_details?.map(
    (value) => value?.variations_type_id
  );
  const findVariationNameById = (variations, id) => {
    for (const variation of variations) {
      for (const type of variation?.variations_types) {
        if (type?._id === id) {
          return type?.name;
        }
      }
    }
    return null;
  };
  const findAvailabilityOnEdit = (isAvailable) =>
    isAvailable ? availabilityOption?.[0] : availabilityOption?.[1];

  const initialOptions = variation_details?.map((value) => ({
    name: findVariationNameById(variationData, value?.variations_type_id),
    productCost: value?.product_cost,
    productPrice: value?.product_price,
    availability: findAvailabilityOnEdit(value?.availability),
    stock: value?.stock,
    type: value?.variations_type_id,
  }));

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

  const editAvailability =
    single_details?.availability === false
      ? availabilityOption?.[1]
      : availabilityOption?.[0];

  const getEditImages = product_images?.map((image) => ({
    file: image?.images,
    id: image?._id,
  }));

  const initialValues = {
    availability: editAvailability,
    barcodeSymbology: isEdit ? { value: barcode_symbol } : "",
    category: isEdit ? initialCategory : "",
    itemType: isEdit ? { value: item_type } : "",
    options: isEdit ? initialOptions : [],
    productBaseUnit: isEdit ? initialBaseUnit : "",
    productCode: code || "",
    productCost: single_details?.product_cost || "",
    productDescriptionArabic: product_description_ar || "",
    productDescriptionEnglish: product_description_en || "",
    productNameArabic: product_name_ar || "",
    productNameEnglish: product_name_en || "",
    productPrice: single_details?.product_price || "",
    productType: isEdit ? { value: product_type } : "",
    purchaseUnit: isEdit ? initialPurchaseUnit : "",
    saleUnit: isEdit ? initialSaleUnit : "",
    stock: single_details?.stock || "",
    supplier: supplier_name || "",
    variations: isEdit ? initialVariationId : "",
    variationsType: isEdit ? initialVariationTypeId : [],
    uploadedImages: isEdit ? getEditImages : [],
  };

  const onSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    const postEditImage = values.uploadedImages
      ?.filter((el) => el?.files)
      ?.map((file) => file?.files);

    setSubmitting(true);

    const formData = new FormData();
    formData.append("product_name_en", values.productNameEnglish);
    formData.append("product_name_ar", values.productNameArabic);
    formData.append("category_id", values.category?.value);
    formData.append("base_unit_id", values.productBaseUnit?.value);
    formData.append("item_type", values.itemType?.value);
    formData.append("supplier_name", values.supplier);
    formData.append("sale_unit_id", values.saleUnit?.value);
    formData.append("purchase_unit_id", values.purchaseUnit?.value);
    formData.append("barcode_symbol", values.barcodeSymbology?.value);
    formData.append("code", values.productCode);
    formData.append("product_description_en", values.productDescriptionEnglish);
    formData.append("product_description_ar", values.productDescriptionArabic);

    if (isEdit) {
      for (const image of postEditImage) {
        formData.append("images", image);
      }
    } else {
      formData.append("images", values.uploadedImages?.[0]?.files);
    }
    formData.append("product_type", values.productType?.value);

    if (values.productType?.value === "Single") {
      formData.append("single_details[product_cost]", values.productCost);
      formData.append("single_details[product_price]", values.productPrice);
      formData.append(
        "single_details[availability]",
        values.availability?.value === "available" ? true : false
      );
      formData.append("single_details[stock]", values.stock);
    } else {
      const appendVariationDetails = (variations, formData) => {
        variations?.forEach((data, index) => {
          const variationDetails = {
            variations_type_id: data?.type,
            product_cost: data?.productCost,
            product_price: data?.productPrice,
            availability:
              data?.availability?.value === "available" ? true : false,
            stock: data?.stock,
          };

          Object.entries(variationDetails)?.forEach(([key, value]) => {
            formData.append(`variation_details[${index}][${key}]`, value);
          });
          formData.append(
            `variation_details[${index}][variation_id]`,
            values.variations?.value
          );
        });
      };

      appendVariationDetails(values?.options, formData);
    }

    try {
      const response = isEdit
        ? await editProduct(_id, formData)
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
      const dataUrl = { file: URL.createObjectURL(file), files: file };
      push(dataUrl);
    });
  };

  const handleDeleteImage = async (index, remove, id) => {
    const imageId = {
      imageId: id,
    };
    await deleteProductImage(_id, imageId);
    remove(index);
  };

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
    isEdit,
    status,
  };
};

export default AddProductsContainer;
