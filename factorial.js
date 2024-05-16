
function factorialIterative(n) {
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(5)); // Output: 120

// Recursive factorial function
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

// Prime number check function
function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  if (n <= 3) {
    return true;
  }
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(11)); // Output: true
console.log(isPrime(15)); // Output: false

commit 4e7d4e7bc1323aac196b13949f373875bfd7a806
Author: harshit-rathore3 <153714797+harshit-rathore3@users.noreply.github.com>
Date: Thu May 16 12:34:40 2024 +0530

Update factorial.js

diff --git a/factorial.js b/factorial.js
index ec91d18..fa11683 100644
--- a/factorial.js
+++ b/factorial.js
@@ -23,3 +23,25 @@ function factorialRecursive(n) {
 }

 console.log(factorialRecursive(5)); // Output: 120

+function isPrime(n) {
+  if (n <= 1) {
+    return false;
+  }
+  if (n <= 3) {
+    return true;
+  }
+  if (n % 2 === 0 || n % 3 === 0) {
+    return false;
+  }
+  for (let i = 5; i * i <= n; i += 6) {
+    if (n % i === 0 || n % (i + 2) === 0) {
+      return false;
+    }
+  }
+  return true;
+}
+
+console.log(isPrime(11)); // Output: true
+console.log(isPrime(15)); // Output: false
