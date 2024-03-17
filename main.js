var findMaxLength = function (nums) {
  let maxLength = 0;
  let sum = 0;
  const sumMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 0 ? -1 : +1;
    if (sum == 0) maxLength = i + 1;
    else if (sumMap.has(sum)) {
      maxLength = Math.max(maxLength, i - sumMap.get(sum));
    } else sumMap.set(sum, i);
  }
  return maxLength;
};

console.log(findMaxLength([0, 1]));
