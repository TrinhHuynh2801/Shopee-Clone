var countSubarrays = function (nums, k) {
  const max = Math.max(...nums);
  let count = 0;
  let ans = 0;
  let l = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === max) count++;
    while (count >= k) {
      if (nums[l] === max) count--;
      l++;
      console.log(l);
    }
    ans += l;
  }
  return ans;
};

console.log(countSubarrays([1, 3, 2, 3, 3], 2));
