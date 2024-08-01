import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addPurchase,
  deletePurchaseByName,
  editPurchase,
} from "../../api/services/purchaseService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import { getDropdownOptions } from "../../common/functions/getDropdownOptions";
import {
  fetchProductByName,
  fetchPurchaseById,
  setEdit,
} from "../../redux/slice/purchaseSlice";
import { fetchSuppliers } from "../../redux/slice/supplierSlice";
import { formattedDate } from "../../utils/functions/dateUtils";
import {
  getStatusEditOptions,
  getValueSign,
  getValueSignName,
} from "../../utils/functions/salesAndPurchasesUtils";

const AddPurchasesContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    productByNameData = [],
    purchaseDataById = {},
    isEdit,
    status: loading,
  } = useSelector((state) => state.purchase || {});
  const { suppliersData = [] } = useSelector((state) => state?.supplier || {});

  const [productTableData, setProductTableData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");

  useEffect(() => {
    dispatch(fetchProductByName());
    dispatch(fetchSuppliers());

    if (id) {
      dispatch(fetchPurchaseById(id));
      dispatch(setEdit(true));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isEdit) setProductTableData(purchaseDataById);
  }, [isEdit, purchaseDataById]);

  const {
    bill_id,
    date,
    supplier_id,
    order_tax,
    order_tax_sign,
    discount,
    discount_sign,
    shipping,
    shipping_sign,
    status,
    notes,
  } = purchaseDataById || {};

  const supplierOption = getDropdownOptions(suppliersData, "_id", "name");

  const currentProductData = isEdit
    ? productTableData?.items
    : productTableData;

  const setCountQty = (updatedData) => {
    if (isEdit)
      setProductTableData((prevData) => ({
        ...prevData,
        items: updatedData,
      }));
    else setProductTableData(updatedData);
  };

  const getSupplierEditOption = (id) =>
    supplierOption?.find((data) => data?.value === id?._id);

  const handleBack = () => navigate("/purchases");

  const filterDataByKey = (data, key, value) =>
    data?.filter((item) => item[key] !== value);

  const handleDelete = async (row) => {
    const itemId = row?.item_id;
    const rowId = row?.formatted_name;

    const addDeleteProduct = filterDataByKey(
      currentProductData,
      "formatted_name",
      rowId
    );

    const isItemIdKeyPresent = (row) => {
      return "item_id" in row;
    };
    const isKeyPresent = isItemIdKeyPresent(row);

    if (isEdit) {
      if (isKeyPresent) await deletePurchaseByName(id, { itemId });
      setProductTableData((prevData) => ({
        ...prevData,
        items: addDeleteProduct,
      }));
    } else setProductTableData(addDeleteProduct);
  };

  const actionsBtn = [
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  const handleEdit = () => navigate(`/purchase-return/edit/${id}`);

  const editReturnProductBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
  ];

  const handleInputChange = (newValue, setFieldValue) => {
    setFieldValue("inputValue", newValue);
    if (!newValue) {
      setFieldValue("options", []);
      return;
    }

    const filteredOptions = productByNameData
      ?.filter((item) =>
        item?.formatted_name?.toLowerCase()?.includes(newValue?.toLowerCase())
      )
      ?.map((data) => ({
        value: data?.formatted_name,
        label: data?.formatted_name,
      }));

    setFieldValue("options", filteredOptions);
  };

  const handleChange = (option, setFieldValue) => {
    const isDataAvailable = option
      ? currentProductData?.some(
          (value) =>
            value?.formatted_name?.toLowerCase() ===
            option?.value?.toLowerCase()
        )
      : false;

    if (isDataAvailable) toast.error("This Product Already Added");
    else {
      const filterOptionsData = option
        ? productByNameData
            ?.filter((item) =>
              item?.formatted_name
                ?.toLowerCase()
                ?.includes(option?.label?.toLowerCase())
            )
            ?.map((item) => ({
              ...item,
              qty: 1,
              subtotal: item?.product_price,
              product_name: item?.product_name_en,
            }))?.[0]
        : {};

      if (isEdit)
        setProductTableData((prevData) => ({
          ...prevData,
          items: [...prevData.items, filterOptionsData],
        }));
      else setProductTableData((prevData) => [...prevData, filterOptionsData]);
      setFieldValue("inputValue", "");
    }
  };

  const getGrandTotal = (data) => setTimeout(() => setGrandTotal(data), 100);

  const initialValues = {
    search: null,
    invoiceNo: bill_id || "",
    supplierInputValue: "",
    inputValue: "",
    options: [],
    date: isEdit ? date : "",
    supplier: getSupplierEditOption(supplier_id) || "",
    products: [],
    orderTax: order_tax || "",
    orderTaxType: getValueSign(order_tax_sign),
    discount: discount || "",
    discountType: getValueSign(discount_sign),
    shipping: shipping || "",
    shippingType: getValueSign(shipping_sign),
    grandTotal: 0,
    status: getStatusEditOptions(status) || "",
    note: notes || "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append("bill_id", values?.invoiceNo);
    formData.append("date", formattedDate(values?.date));
    formData.append("supplier_id", values?.supplier?.value);

    const appendPurchaseDetails = (variations, formData) => {
      variations?.forEach((data, index) => {
        const variationDetails = {
          product_id: data?.product_id || data?._id,
          variation_id: data?.variation_id,
          variation_type_id: data?.variation_type_id,
          qty: data?.qty,
          subtotal: data?.subtotal,
        };
        Object.entries(variationDetails)?.forEach(([key, value]) => {
          if (value) formData.append(`items[${index}][${key}]`, value || "");
        });
      });
    };

    appendPurchaseDetails(currentProductData, formData);

    formData.append("order_tax_sign", getValueSignName(values.orderTaxType));
    formData.append("order_tax", values?.orderTax);
    formData.append("discount_sign", getValueSignName(values.discountType));
    formData.append("discount", values?.discount);
    formData.append("shipping_sign", getValueSignName(values.shippingType));
    formData.append("shipping", values?.shipping);
    formData.append("grand_total", grandTotal);
    formData.append("status", values?.status?.value);
    formData.append("notes", values?.note);

    try {
      const response = isEdit
        ? await editPurchase(id, formData)
        : await addPurchase(formData);

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

  const supplierNavigate = (e, values) => {
    if (
      e.key === "Enter" &&
      !supplierOption?.some((option) =>
        option?.label
          ?.toLowerCase()
          .includes(values.supplierInputValue?.toLowerCase())
      )
    )
      navigate("/suppliers/create");
  };

  return {
    actionsBtn,
    initialValues,
    productTableData,
    supplierOption,
    currentProductData,
    loading,
    isEdit,
    purchaseDataById,
    editReturnProductBtn,
    handleBack,
    handleSubmit,
    handleInputChange,
    handleChange,
    supplierNavigate,
    getGrandTotal,
    setCountQty,
  };
};

export default AddPurchasesContainer;
