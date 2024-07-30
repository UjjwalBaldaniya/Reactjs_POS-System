import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addPurchaseReturn } from "../../api/services/purchaseReturnService";
import { deleteIcon } from "../../assets/icons/tables";
import { fetchPurchase } from "../../redux/slice/purchaseSlice";
import { fetchSuppliers } from "../../redux/slice/supplierSlice";
import { formattedDate } from "../../utils/functions/dateUtils";

const AddPurchaseReturnContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { purchaseData = [] } = useSelector((state) => state.purchase || {});
  const { suppliersData = [] } = useSelector((state) => state?.supplier || {});

  const [productTableData, setProductTableData] = useState([]);
  const [getSelectSupplierObject, setGetSelectSupplierObject] = useState({});
  const [grandTotal, setGrandTotal] = useState("");

  useEffect(() => {
    dispatch(fetchPurchase());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleBack = () => {
    navigate("/purchases");
  };

  const getSupplierName = (purchaseData, suppliersData) => {
    const results = [];

    suppliersData?.forEach((suppliers) => {
      purchaseData?.forEach((purchase) => {
        if (suppliers?._id === purchase?.supplier_id?._id) {
          results.push({
            label: `${purchase?.bill_id}(${suppliers?.name})`,
            value: `${purchase?.bill_id}(${suppliers?.name})`,
          });
        }
      });
    });

    return results;
  };

  const billNoSupplierOption = getSupplierName(purchaseData, suppliersData);

  const purchaseReturnItems = (value) => {
    if (!value?.supplier?.value) return [];

    const [invoiceNo, supplierName] = value.supplier.value.split("(");
    const cleanSupplierName = supplierName?.slice(0, -1);

    const findSupplierId = suppliersData?.find(
      (data) => data?.name === cleanSupplierName
    )?._id;

    if (!findSupplierId) return [];

    const findSupplierObject = purchaseData?.find(
      (data) =>
        data?.bill_id === invoiceNo && data?.supplier_id?._id === findSupplierId
    );

    setGetSelectSupplierObject(findSupplierObject);

    const findSupplierName = findSupplierObject?.items?.map((item) => ({
      value: item?.formatted_name,
      label: item?.formatted_name,
    }));

    return findSupplierName || [];
  };

  const handleDelete = (row) => {
    const deleteProductTableData = productTableData?.filter(
      (item) => item?._id !== row?._id
    );
    setProductTableData(deleteProductTableData);
  };

  const actionsBtn = [
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  const handleChange = (option, setFieldValue) => {
    const isDataAvailable = option
      ? productTableData?.some(
          (value) =>
            value?.formatted_name?.toLowerCase() ===
            option?.value?.toLowerCase()
        )
      : false;

    if (isDataAvailable) {
      toast.error("This Product Already Added");
    } else {
      const filterOptionsData = option
        ? getSelectSupplierObject?.items
            ?.filter((item) =>
              item?.formatted_name
                ?.toLowerCase()
                ?.includes(option?.value?.toLowerCase())
            )
            ?.map((item) => ({
              ...item,
              qty: 1,
              purchase_limit: item?.qty,
            }))
        : [];
      setProductTableData((prevData) => [...prevData, ...filterOptionsData]);
      setFieldValue("inputValue", "");
    }
  };

  const calculateTotals = (productTableData) => {
    const grandTotal = productTableData?.reduce(
      (accumulator, item) => accumulator + (parseFloat(item?.subtotal) || 0),
      0
    );

    return grandTotal;
  };

  const getGrandTotal = (data) => setTimeout(() => setGrandTotal(data), 100);

  const initialValues = {
    search: null,
    inputValue: "",
    options: [],
    date: "",
    supplier: "",
    products: [],
    orderTax: "",
    orderTaxType: "%",
    discount: "",
    discountType: "$",
    shipping: "",
    shippingType: "$",
    status: "",
    note: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);

    const getBillId = values?.supplier?.value?.split("(")?.[0];
    const formData = new FormData();

    formData.append("bill_id", getBillId);
    formData.append("return_date", formattedDate(values?.date));
    // formData.append("supplier_id", values?.supplier?.value);

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
          if (value) formData.append(`returns[${index}][${key}]`, value || "");
        });
      });
    };

    appendPurchaseDetails(productTableData, formData);

    formData.append("return_grand_total", grandTotal);
    formData.append("return_status", values?.status?.value);
    formData.append("return_notes", values?.note);

    try {
      // const response = isEdit
      //   ? await editPurchase(id, formData)
      //   : await addPurchase(formData);

      const response = await addPurchaseReturn(formData);

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

  return {
    productTableData,
    actionsBtn,
    initialValues,
    billNoSupplierOption,
    handleBack,
    setProductTableData,
    handleChange,
    handleSubmit,
    calculateTotals,
    purchaseReturnItems,
    getGrandTotal,
  };
};

export default AddPurchaseReturnContainer;
