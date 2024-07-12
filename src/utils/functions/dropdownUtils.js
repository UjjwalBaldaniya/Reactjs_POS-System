export const getDropdownOption = (data, valueKey, labelKey) => {
  return data?.map((item) => ({
    value: item[valueKey] || "",
    label: item[labelKey] || "",
  }));
};

export const getEditTimeDropdownOption = (data, labelKey, valueKey) => {
  return {
    label: data?.[labelKey] || "",
    value: data?.[valueKey] || "",
  };
};
