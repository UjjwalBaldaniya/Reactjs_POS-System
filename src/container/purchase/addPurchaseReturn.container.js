import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addPurchaseReturn,
  deletePurchaseReturnByName,
  editPurchaseReturn,
} from "../../api/services/purchaseReturnService";
import { deleteIcon } from "../../assets/icons/tables";
import { setEdit } from "../../redux/slice/purchaseReturnSlice";
import {
  fetchPurchase,
  fetchPurchaseById,
} from "../../redux/slice/purchaseSlice";
import { fetchSuppliers } from "../../redux/slice/supplierSlice";
import { formattedDate } from "../../utils/functions/dateUtils";
import { getStatusEditOptions } from "../../utils/functions/salesAndPurchasesUtils";

const AddPurchaseReturnContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { purchaseData = [] } = useSelector((state) => state.purchase || {});
  const { suppliersData = [] } = useSelector((state) => state?.supplier || {});
  const { purchaseDataById = {} } = useSelector(
    (state) => state.purchase || {}
  );
  const { isEdit } = useSelector((state) => state?.purchaseReturn || {});

  const [productTableData, setProductTableData] = useState([]);
  const [getSelectSupplierObject, setGetSelectSupplierObject] = useState({});
  const [grandTotal, setGrandTotal] = useState("");

  useEffect(() => {
    dispatch(fetchPurchase());
    dispatch(fetchSuppliers());

    if (id) {
      dispatch(fetchPurchaseById(id));
      dispatch(setEdit(true));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isEdit) setProductTableData(purchaseDataById);
  }, [isEdit, purchaseDataById]);

  const { return_date, status, notes } = purchaseDataById || {};

  const currentProductData = isEdit
    ? productTableData?.returns
    : productTableData;

  const handleBack = () => navigate("/purchase-return");

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

  const editSupplierName = (purchaseDataById, suppliersData) => {
    const findSupplierName = suppliersData?.find(
      (item) => item?._id === purchaseDataById?.supplier_id?._id
    )?.name;

    const modifyObj = {
      label: `${purchaseDataById?.bill_id}(${findSupplierName})`,
      value: `${purchaseDataById?.bill_id}(${findSupplierName})`,
    };
    return modifyObj;
  };

  const billNoSupplierOption = getSupplierName(purchaseData, suppliersData);
  const supplierOptionForEdit = editSupplierName(
    purchaseDataById,
    suppliersData
  );

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
      if (isKeyPresent) await deletePurchaseReturnByName(id, { itemId });
      setProductTableData((prevData) => ({
        ...prevData,
        items: addDeleteProduct,
      }));
    } else setProductTableData(addDeleteProduct);
  };

  const actionsBtn = [
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

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
              subtotal: item?.product_price,
            }))
        : [];

      if (isEdit)
        setProductTableData((prevData) => ({
          ...prevData,
          returns: [...prevData.returns, ...filterOptionsData],
        }));
      else
        setProductTableData((prevData) => [...prevData, ...filterOptionsData]);
      setFieldValue("inputValue", "");
    }
  };

  const setCountQty = (updatedData) => {
    if (isEdit)
      setProductTableData((prevData) => ({
        ...prevData,
        returns: updatedData,
      }));
    else setProductTableData(updatedData);
  };

  const calculateTotals = (currentProductData) => {
    const grandTotal = currentProductData?.reduce(
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
    date: isEdit ? return_date : "",
    supplier: isEdit ? supplierOptionForEdit : "",
    products: [],
    status: getStatusEditOptions(status) || "",
    note: notes || "",
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

    appendPurchaseDetails(currentProductData, formData);

    formData.append("return_grand_total", grandTotal);
    formData.append("return_status", values?.status?.value);
    formData.append("return_notes", values?.note);

    try {
      const response = isEdit
        ? await editPurchaseReturn(id, formData)
        : await addPurchaseReturn(formData);

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
    actionsBtn,
    initialValues,
    billNoSupplierOption,
    currentProductData,
    handleBack,
    setProductTableData,
    handleChange,
    handleSubmit,
    calculateTotals,
    purchaseReturnItems,
    getGrandTotal,
    setCountQty,
  };
};

export default AddPurchaseReturnContainer;
