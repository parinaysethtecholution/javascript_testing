
'use strict';

// Import required modules
const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const runBenchmark = require('./benchmark');
const {
  buildReactBundles,
  buildBenchmark,
  buildBenchmarkBundlesFromGitRepo,
  getMergeBaseFromLocalGitRepo,
} = require('./build');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const printResults = require('./stats');
const serveBenchmark = require('./server');

// Function to get the names of available benchmarks
function getBenchmarkNames() {
  const benchmarksDir = join(__dirname, 'benchmarks');
  return readdirSync(benchmarksDir).filter(file =>
    statSync(join(benchmarksDir, file)).isDirectory()
  );
}

// Function to calculate the average of benchmark results
function calculateAverageBenchmarkResults(results) {
  const averageResults = {};
  for (const benchmarkName in results) {
    const benchmarkData = results[benchmarkName];
    const totalTime = benchmarkData.reduce((sum, result) => sum + result.time, 0);
    const averageTime = totalTime / benchmarkData.length;
    averageResults[benchmarkName] = averageTime;
  }
  return averageResults;
}

const fs = require('fs');

// Function to log benchmark results to a file
function logBenchmarkResultsToFile(results) {
  const timestamp = new Date().toISOString();
  const filename = `benchmark_results_${timestamp}.json`;
  const data = JSON.stringify(results, null, 2);
  fs.writeFileSync(filename, data);
  console.log(`Benchmark results logged to file: ${filename}`);
}

// Function to filter benchmark results by a given threshold
function filterBenchmarkResultsByThreshold(results, threshold) {
  const filteredResults = {};
  for (const benchmarkName in results) {
    const benchmarkData = results[benchmarkName];
    const filteredData = benchmarkData.filter(result => result.time < threshold);
    filteredResults[benchmarkName] = filteredData;
  }
  return filteredResults;
}

// Function to print the average benchmark results
function printAverageBenchmarkResults(averageResults) {
  console.log(chalk.white.bold('Average Benchmark Results:'));
  for (const benchmarkName in averageResults) {
    console.log(`${benchmarkName}: ${averageResults[benchmarkName]} ms`);
  }
}

// Helper function to introduce a delay
function wait(val) {
  return new Promise(resolve => setTimeout(resolve, val));
}

// Parse command-line arguments
const runRemote = argv.remote;
const runLocal = argv.local;
const benchmarkFilter = argv.benchmark;
const headless = argv.headless;
const skipBuild = argv['skip-build'];

// Function to run benchmarks
async function runBenchmarks(reactPath) {
  const benchmarkNames = getBenchmarkNames();
  const results = {};
  const server = serveBenchmark();
  await wait(1000);

  for (let i = 0; i < benchmarkNames.length; i++) {
    const benchmarkName = benchmarkNames[i];

    if (!benchmarkFilter || (benchmarkFilter && benchmarkName.indexOf(benchmarkFilter) !== -1)) {
      console.log(chalk.gray(`- Building benchmark "${chalk.white(benchmarkName)}"...`));
      await buildBenchmark(reactPath, benchmarkName);
      console.log(chalk.gray(`- Running benchmark "${chalk.white(benchmarkName)}"...`));
      results[benchmarkName] = await runBenchmark(benchmarkName, headless);
    }
  }

  server.close();
  // http-server.close() is async but they don't provide a callback..
  await wait(500);
  return results;
}

// Get the performance benchmark results from remote main (default React repo)
async function benchmarkRemoteMaster() {
  console.log(chalk.gray(`- Building React bundles...`));
  let commit = argv.remote;

  if (!commit || typeof commit !== 'string') {
    commit = await getMergeBaseFromLocalGitRepo(join(__dirname, '..', '..'));
    console.log(chalk.gray(`- Merge base commit ${chalk.white(commit.toString())}`));
  }
  await buildBenchmarkBundlesFromGitRepo(commit, skipBuild);
  return {
    benchmarks: await runBenchmarks(),
  };
}

// Get the performance benchmark results of the local react repo
async function benchmarkLocal(reactPath) {
  console.log(chalk.gray(`- Building React bundles...`));
  await buildReactBundles(reactPath, skipBuild);
  return {
    benchmarks: await runBenchmarks(reactPath),
  };
}

// Run local benchmarks
async function runLocalBenchmarks(showResults) {
  console.log(
    chalk.white.bold('Running benchmarks for ') +
    chalk.green.bold('Local (Current Branch)')
  );
  const localResults = await benchmarkLocal(join(__dirname, '..', '..'));

  if (showResults) {
    printResults(localResults, null);
  }
  return localResults;
}

// Run remote benchmarks
async function runRemoteBenchmarks(showResults) {
  console.log(
    chalk.white.bold('Running benchmarks for ') +
    chalk.yellow.bold('Remote (Merge Base)')
  );
  const remoteMasterResults = await benchmarkRemoteMaster();

  if (showResults) {
    printResults(null, remoteMasterResults);
  }
  return remoteMasterResults;
}

// Compare local benchmarks to remote (merge base)
async function compareLocalToMaster() {
  console.log(
    chalk.white.bold('Comparing ') +
    chalk.green.bold('Local (Current Branch)') +
    chalk.white.bold(' to ') +
    chalk.yellow.bold('Remote (Merge Base)')
  );
  const localResults = await runLocalBenchmarks(false);
  const remoteMasterResults = await runRemoteBenchmarks(false);
  printResults(localResults, remoteMasterResults);
}

// Execute the appropriate benchmark scenario based on command-line arguments
if ((runLocal && runRemote) || (!runLocal && !runRemote)) {
  compareLocalToMaster().then(() => process.exit(0));
} else if (runLocal) {
  runLocalBenchmarks(true).then(() => process.exit(0));
} else if (runRemote) {
  runRemoteBenchmarks(true).then(() => process.exit(0));
}
