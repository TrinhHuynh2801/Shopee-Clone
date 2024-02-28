function isBalanced(s) {
  // Write your code here
  if (s.length % 2 != 0) return "NO";
  const bracelet = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (bracelet[s[i]]) stack.push(s[i]);
    else if (s[i] == bracelet[stack[stack.length - 1]]) stack.pop();
    else return "NO";
  }
  if (stack.length) return "NO";
  return "YES";
}

console.log(isBalanced("{{[[(())]]}}"));
