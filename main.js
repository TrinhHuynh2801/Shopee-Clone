var countStudents = function (students, sandwiches) {
  const count = {
    1: 0,
    0: 0,
  };
  for (const student of students) {
    count[student]++;
  }

  for (const sandwich of sandwiches) {
    if (--count[sandwich] < 0) return count[+!sandwich];
  }
  return 0;
};

console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]));
