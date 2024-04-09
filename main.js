var timeRequiredToBuy = function (tickets, k) {
  let time = 0;
  while (tickets[k] > 0) {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i] > 0) {
        time++;
        tickets[i]--;
      }
      if (tickets[k] == 0) return time;
    }
  }
};

console.log(timeRequiredToBuy([84, 49, 5, 24, 70, 77, 87, 8], 3));
