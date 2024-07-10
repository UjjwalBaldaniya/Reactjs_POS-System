export const getDropdownOptions = (data, valueKey, labelKey) => {
  return data?.map((item) => ({
    value: item[valueKey] || "",
    label: item[labelKey] || "",
  }));
};

export const editDropdownObject = (data, labelKey, valueKey) => {
  return {
    label: data?.[labelKey] || "",
    value: data?.[valueKey] || "",
  };
};

export const getMinMaxPrice = (data) => {
  const prices = data?.map((item) => item?.product_price);
  const minPrice = Math?.min(...prices);
  const maxPrice = Math?.max(...prices);
  return `$ ${minPrice} - $ ${maxPrice}`;
};

export const getMaxStock = (data) => {
  const stocks = data?.map((item) => item?.stock);
  return Math.max(...stocks);
};
