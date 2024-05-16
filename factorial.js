
function factorialRecursive(n) {
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120

function addTwoNumbers(a, b) {
  return a + b;
}

console.log(addTwoNumbers(3, 5));  // Output: 8
console.log(addTwoNumbers(-2, 7));

function dfs(graph, start) {
  let stack = [start];
  let visited = new Set();

  while (stack.length > 0) {
    let node = stack.pop();

    if (!visited.has(node)) {
      visited.add(node);
      let neighbors = graph[node];
      
      for (let neighbor of neighbors) {
        stack.push(neighbor);
      }
    }
  }

  return Array.from(visited);
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
};

console.log(dfs(graph, 'A')); // Output: [ 'A', 'C', 'F', 'B', 'E', 'D' ]
