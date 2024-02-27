var plusOne = function (digits) {
  const lastIndex = digits.length - 1;

  if (digits[lastIndex] != 9) {
    digits[lastIndex]++;
  } else {
    digits[lastIndex] = 0;
    for (let i = lastIndex - 1; i >= 0; i--) {
      digits[i]++;
      if (digits[i] == 10) {
        digits[i] = 0;
      } else {
        break;
      }
    }
  }
  if (digits[0] == 0) digits.unshift(1);
  return digits;
};

console.log(plusOne([9]));
