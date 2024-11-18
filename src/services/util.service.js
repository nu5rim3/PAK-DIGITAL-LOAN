export const getValueByList = (arr, key) => {
  if (!arr || !key) return null
  const value = arr.find(item => item.code == key)
  return value ? value.description : "Value Not Found"
}

export const getCurrency = value => {
  return Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
}
