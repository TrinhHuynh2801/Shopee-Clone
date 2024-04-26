var minFallingPathSum = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j == 0) {
        matrix[i][j] =
          Math.min(matrix[i - 1][j], matrix[i - 1][j + 1]) + matrix[i][j];
      } else if (j == n - 1) {
        matrix[i][j] =
          Math.min(matrix[i - 1][j - 1], matrix[i - 1][j]) + matrix[i][j];
      } else {
        matrix[i][j] =
          Math.min(
            matrix[i - 1][j - 1],
            matrix[i - 1][j],
            matrix[i - 1][j + 1]
          ) + matrix[i][j];
      }
    }
  }

  return Math.min(...matrix[m - 1]);
};

console.log(
  minFallingPathSum([
    [2, 1, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
);
