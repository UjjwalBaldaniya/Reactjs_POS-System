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
