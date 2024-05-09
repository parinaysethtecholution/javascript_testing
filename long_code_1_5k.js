
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// 1.5k Tokens Code

'use strict';

// Import required modules
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const inlinedHostConfigs = require('../shared/inlinedHostConfigs');
const flowVersion = require('../../package.json').devDependencies['flow-bin'];

// Read the config template from file
const configTemplate = fs
  .readFileSync(__dirname + '/config/flowconfig')
  .toString();

// Set to store all forks
const allForks = new Set();

// Map to store forked files and their base paths
const forkedFiles = new Map();

/**
 * Find forks for a given file.
 *
 * @param {string} file - The file path.
 * @returns {string} The base path of the forks.
 */
function findForks(file) {
  const basePath = path.join(file, '..');
  const forksPath = path.join(basePath, 'forks');
  const forks = fs.readdirSync(path.join('packages', forksPath));
  forks.forEach(f => allForks.add('forks/' + f));
  forkedFiles.set(file, basePath);
  return basePath;
}

/**
 * Add a fork for a given renderer and file.
 *
 * @param {Map} forks - The map to store forks.
 * @param {string} renderer - The renderer name.
 * @param {string} file - The file path.
 */
function addFork(forks, renderer, file) {
  let basePath = forkedFiles.get(file);
  if (!basePath) {
    basePath = findForks(file);
  }

  const baseFilename = file.slice(basePath.length + 1);

  const parts = renderer.split('-');
  while (parts.length) {
    const candidate = `forks/${baseFilename}.${parts.join('-')}.js`;
    if (allForks.has(candidate)) {
      forks.set(candidate, `${baseFilename}$$`);
      return;
    }
    parts.pop();
  }
  throw new Error(`Cannot find fork for ${file} for renderer ${renderer}`);
}

/**
 * Write the Flow config for a given renderer.
 *
 * @param {string} renderer - The renderer name.
 * @param {Object} rendererInfo - The renderer information.
 * @param {boolean} isServerSupported - Whether the server is supported.
 * @param {boolean} isFlightSupported - Whether Flight is supported.
 */
function writeConfig(
  renderer,
  rendererInfo,
  isServerSupported,
  isFlightSupported,
) {
  const folder = __dirname + '/' + renderer;
  mkdirp.sync(folder);

  // Determine if Flight is supported based on server support and configuration
  isFlightSupported =
    isFlightSupported === true ||
    (isServerSupported && isFlightSupported !== false);

  const serverRenderer = isServerSupported ? renderer : 'custom';
  const flightRenderer = isFlightSupported ? renderer : 'custom';

  const ignoredPaths = [];

  // Exclude paths from other renderers
  inlinedHostConfigs.forEach(otherRenderer => {
    if (otherRenderer === rendererInfo) {
      return;
    }
    otherRenderer.paths.forEach(otherPath => {
      if (rendererInfo.paths.indexOf(otherPath) !== -1) {
        return;
      }
      ignoredPaths.push(`.*/packages/${otherPath}`);
    });
  });

  const forks = new Map();
  addFork(forks, renderer, 'react-reconciler/src/ReactFiberConfig');
  addFork(forks, serverRenderer, 'react-server/src/ReactServerStreamConfig');
  addFork(forks, serverRenderer, 'react-server/src/ReactFizzConfig');
  addFork(forks, flightRenderer, 'react-server/src/ReactFlightServerConfig');
  addFork(forks, flightRenderer, 'react-client/src/ReactFlightClientConfig');
  forks.set(
    'react-devtools-shared/src/config/DevToolsFeatureFlags.default',
    'react-devtools-feature-flags',
  );

  // Add ignored paths for forks not found
  allForks.forEach(fork => {
    if (!forks.has(fork)) {
      ignoredPaths.push(`.*/packages/.*//${fork}`);
    }
  });

  let moduleMappings = '';
  forks.forEach((source, target) => {
    moduleMappings += `module.name_mapper='${source.slice(
      source.lastIndexOf('/') + 1,
    )}' -> '${target}'\n`;
  });

  const config = configTemplate
    .replace(
      '%CI_MAX_WORKERS%\n',
      // On CI, we seem to need to limit workers.
      process.env.CI ? 'server.max_workers=4\n' : '',
    )
    .replace('%REACT_RENDERER_FLOW_OPTIONS%', moduleMappings.trim())
    .replace('%REACT_RENDERER_FLOW_IGNORES%', ignoredPaths.join('\n'))
    .replace('%FLOW_VERSION%', flowVersion);

  const disclaimer = `
#---------------------------------------------------------------#
# NOTE: this file is generated.                                  #
# If you want to edit it, open ./scripts/flow/config/flowconfig. #
# Then run Yarn for changes to take effect.                      #
#---------------------------------------------------------------#
  `.trim();

  const configFile = folder + '/.flowconfig';
  let oldConfig;
  try {
    oldConfig = fs.readFileSync(configFile).toString();
  } catch (err) {
    oldConfig = null;
  }
  const newConfig = `
${disclaimer}
${config}
${disclaimer}
`.trim();

  if (newConfig !== oldConfig) {
    fs.writeFileSync(configFile, newConfig);
    console.log(chalk.dim('Wrote a Flow config to ' + configFile));
  }
}

// Write Flow configs for each Flow-typed renderer
inlinedHostConfigs.forEach(rendererInfo => {
  if (rendererInfo.isFlowTyped) {
    writeConfig(
      rendererInfo.shortName,
      rendererInfo,
      rendererInfo.isServerSupported,
      rendererInfo.isFlightSupported,
    );
  }
});

// Function to build and test the inline package
async function buildAndTestInlinePackage() {
  const inlinePackagePath = path.join(
    ROOT_PATH,
    'packages',
    'react-devtools-inline'
  );
  const inlinePackageDest = path.join(inlinePackagePath, 'dist');

  await exec(`rm -rf ${inlinePackageDest}`);
  const buildPromise = exec('yarn build', { cwd: inlinePackagePath });

  await logger(
    buildPromise,
    `Building ${chalk.bold('react-devtools-inline')} package.`,
    {
      estimate: 10000,
    }
  );
}

// Function to download the latest React build
async function downloadLatestReactBuild() {
  const releaseScriptPath = path.join(ROOT_PATH, 'scripts', 'release');
  const installPromise = exec('yarn install', { cwd: releaseScriptPath });

  await logger(
    installPromise,
    `Installing release script dependencies. ${chalk.dim(
      '(this may take a minute if CI is still running)'
    )}`,
    {
      estimate: 5000,
    }
  );

  console.log('');

  const { commit } = await inquirer.prompt([
    {
      type: 'input',
      name: 'commit',
      message: 'Which React version (commit) should be used?',
      default: 'main',
    },
  ]);

  // Additional code...
}

async function main() {
  clear();

  await confirm('Have you stopped all NPM DEV scripts?', () => {
    const packagesPath = path.relative(process.cwd(), path.join(__dirname, 'packages'));

    console.log('Stop all NPM DEV scripts in the following directories:');
    console.log(
      chalk.bold('  ' + path.join(packagesPath, 'react-devtools-core')),
      chalk.gray('(start:backend, start:standalone)')
    );
    console.log(
      chalk.bold('  ' + path.join(packagesPath, 'react-devtools-inline')),
      chalk.gray('(start)')
    );

    const buildAndTestScriptPath = path.join(__dirname, 'build-and-test.js');
    const pathToPrint = path.relative(process.cwd(), buildAndTestScriptPath);

    console.log('\nThen restart this release step:');
    console.log(chalk.bold.green('  ' + pathToPrint));
  });

  // Additional code...
}
