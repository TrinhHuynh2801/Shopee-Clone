var subarraysWithKDistinct = function (nums, k) {
  let distCount = new Array(nums.length + 1).fill(0);
  let totalCount = 0;
  let currCount = 0;
  let left = 0;
  let right = 0;
  while (right < nums.length) {
    console.log(distCount);

    if (distCount[nums[right++]]++ === 0) {
      k--;
    }
    if (k < 0) {
      --distCount[nums[left++]];
      k++;
      currCount = 0;
    }
    console.log("After " + distCount);

    if (k === 0) {
      while (distCount[nums[left]] > 1) {
        --distCount[nums[left++]];
        currCount++;
      }
      totalCount += currCount + 1;
    }
  }
  return totalCount;
};

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2));
