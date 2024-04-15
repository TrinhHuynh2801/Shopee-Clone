var largestRectangleArea = function (heights) {
  heights.push(0);
  let stack = [];
  let ans = 0;
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    console.log(stack);
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      let [pos, height] = stack.pop();
      ans = Math.max(ans, height * (i - pos));
      start = pos;
    }
    stack.push([start, heights[i]]);
  }
  return ans;
};

console.log(largestRectangleArea([2, 0, 2, 1, 1]));
