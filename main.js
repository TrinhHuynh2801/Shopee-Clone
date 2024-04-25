var longestIdealString = function (s, k) {
  let max = 0;
  const dp = new Array(128).fill(0);
  for (let char of s) {
    let ascii = char.charCodeAt(0);
    let maxForChar = 0;
    for (let i = Math.max(0, ascii - k); i <= Math.min(127, ascii + k); i++) {
      maxForChar = Math.max(maxForChar, dp[i]);
    }
    dp[ascii] = maxForChar + 1;
    max = Math.max(max, dp[ascii]);
  }
  return max;
};

console.log(longestIdealString("pvjcci", 4));
