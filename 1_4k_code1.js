
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Try Refactor -  1

'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const inlinedHostConfigs = require('../shared/inlinedHostConfigs');
const flowVersion = require('../../package.json').devDependencies['flow-bin'];

const configTemplate = fs
  .readFileSync(__dirname + '/config/flowconfig')
  .toString();

// Stores all forks
const allForks = new Set();
// Maps forked files to their base paths
const forkedFiles = new Map();

/**
 * Finds all forks for a given file and stores them in allForks and forkedFiles.
 *
 * @param {string} file - The file path to find forks for.
 * @returns {string} The base path for the file.
 */
function findForks(file) {
  const basePath = path.join(file, '..');
  const forksPath = path.join(basePath, 'forks');
  const forks = fs.readdirSync(path.join('packages', forksPath));
  forks.forEach(f => allForks.add(`forks/${f}`));
  forkedFiles.set(file, basePath);
  return basePath;
}

/**
 * Adds a fork for the given file and renderer.
 *
 * @param {Map} forks - The map to store the fork mapping.
 * @param {string} renderer - The renderer name.
 * @param {string} file - The file path to add the fork for.
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
 * Writes the Flow config file for the given renderer.
 *
 * @param {string} renderer - The renderer name.
 * @param {Object} rendererInfo - The renderer information object.
 * @param {boolean} isServerSupported - Whether the server renderer is supported.
 * @param {boolean} isFlightSupported - Whether the Flight renderer is supported.
 */
function writeConfig(
  renderer,
  rendererInfo,
  isServerSupported,
  isFlightSupported,
) {
  const folder = __dirname + '/' + renderer;
  mkdirp.sync(folder);

  isFlightSupported =
    isFlightSupported === true ||
    (isServerSupported && isFlightSupported !== false);

  const serverRenderer = isServerSupported ? renderer : 'custom';
  const flightRenderer = isFlightSupported ? renderer : 'custom';

  const ignoredPaths = [];

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
#----------------------------------------------------------------#
# NOTE: this file is generated.                                    #
# If you want to edit it, open ./scripts/flow/config/flowconfig.   #
# Then run Yarn for changes to take effect.                        #
#----------------------------------------------------------------#
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

// Generate Flow configs for all Flow-typed renderers
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
