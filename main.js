var reversePrefix = function (word, ch) {
  let findIndex = -1;
  let rest = "";
  let reverse = "";
  for (let i = 0; i < word.length; i++)
    if (word[i] == ch) {
      findIndex = i;
      break;
    }
  for (let i = findIndex; i >= 0; i--) {
    reverse += word[i];
  }
  if (findIndex == -1) return word;
  for (let i = findIndex + 1; i < word.length; i++) rest += word[i];
  return reverse + rest;
};

console.log(reversePrefix("xyxzxe", "z"));
