var numRescueBoats = function (people, limit) {
  const sortPeople = people.sort((a, b) => a - b);
  let left = 0,
    right = people.length - 1,
    boats = 0;
  while (left <= right) {
    if (sortPeople[left] + sortPeople[right] <= limit) left++;
    right--;
    boats++;
  }
  return boats;
};

console.log(numRescueBoats([1, 2, 2, 3], 5));
