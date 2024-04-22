var openLock = function (deadends, target) {
  if (target === "0000") return 0;
  let queue = [0],
    seen = new Uint8Array(10000);

  for (let d of deadends) seen[~~d] = 1;
  target = ~~target;
  if (seen[0]) return -1;
  for (let turns = 1; queue.length; turns++) {
    let qlen = queue.length;
    for (let i = 0; i < qlen; i++) {
      let curr = queue.shift();
      for (let j = 1; j < 10000; j *= 10) {
        let mask = ~~((curr % (j * 10)) / j),
          masked = curr - mask * j;

        for (let k = 1; k < 10; k += 8) {
          let next = masked + ((mask + k) % 10) * j;
          console.log(`k ${k}`);
          console.log(`next ${next}`);
          console.log("");
          if (seen[next]) continue;
          if (next === target) return turns;
          seen[next] = 1;
          queue.push(next);
          // console.log(`queue: ${queue}`);
        }
      }
    }
    // console.log(`turn: ${turns}`);
  }
  return -1;
};

console.log(openLock(["0201", "0101", "0102", "1212", "2002"], "0202"));
