function icecreamParlor(m, arr) {
  // Write your code here
  const vals = {};
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    if (vals[arr[i]]) {
      return [vals[arr[i]], i + 1];
    }
    vals[m - arr[i]] = i + 1;
  }
}

console.log(icecreamParlor(100, [5, 75, 25]));
