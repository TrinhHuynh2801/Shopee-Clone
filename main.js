var deckRevealedIncreasing = function (deck) {
  const sortArr = deck.sort((a, b) => a - b);
  const ans = [];
  for (let i = deck.length - 1; i >= 0; i--) {
    if (ans.length > 0) {
      ans.push(ans.pop());
    }
    ans.unshift(sortArr[i]);
  }
  return ans;
};

console.log(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7]));
