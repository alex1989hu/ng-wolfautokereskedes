'use strict';

const git  = require('git-rev-sync');
const { writeFileSync } = require('fs');

const gitInfo = { commit: git.short() };
const ts = 'export const gitVersion = ' + JSON.stringify(gitInfo, null, 2) + ';\n';

writeFileSync('src/environments/git-version.ts', ts);
