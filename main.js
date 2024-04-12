var firstMissingPositive = function (nums) {
  for (i = 0; i < nums.length; i++) {
    if (nums[i] < 0) nums[i] = 0;
  }
  for (i = 0; i < nums.length; i++) {
    const val = Math.abs(nums[i]);
    if (1 <= val && val <= nums.length) {
      if (nums[val - 1] === 0) nums[val - 1] = -val;
      else nums[val - 1] = -Math.abs(nums[val - 1]);
    }
    console.log(nums);
  }
  for (i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) return i + 1;
  }
  return nums.length + 1;
};

console.log(firstMissingPositive([1, 2, 3, 4, 5, 8]));
