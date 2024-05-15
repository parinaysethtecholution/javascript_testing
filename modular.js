
commit c039c8871dc26cbe9d9f90a069aaefdf859fa967
Author: harshit-rathore3 <153714797+harshit-rathore3@users.noreply.github.com>
Date: Wed May 15 19:19:01 2024 +0530

    Update modular.js

diff --git a/modular.js b/modular.js
index 5c0cac9..190ce26 100644
--- a/modular.js
+++ b/modular.js
@@ -1,5 +1,5 @@
-export function returnChats(obj) {
-  let arr = [];
+export function returnChats(obj) {
+  let arr = []; // Initialize an empty array
  Object.keys(obj).forEach(function (elem) {
    arr.push({
      "id": obj[elem].id,
@@
 -30,7 +30,7 @@ export function returnCity(str) {
 }

 export function returnWeatherDetails(object) {
-  let arr = [];
+  let arr = []; // Initialize an empty array
  for (let key in object) {
    if (object[key] && object[key] !== 0) {
      arr.push({
