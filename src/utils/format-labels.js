const formatNumberWithRounding = (n) => {
  if (Number.isNaN(n)) {
    return ''
  }
  let digits = 1
  if (n && n >= 100) {
    digits = 0
  }
  if (n && n < 1) {
    digits = 2
  }
  return n?.toLocaleString('en-us', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }) || ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (value) => {
  let _value = formatNumberWithRounding(value)
  if (_value.includes(',')) {
    _value = `${_value}k`
  } else {
    _value = `${Number(_value).toFixed(2)}`;
  }
  return _value;
};
