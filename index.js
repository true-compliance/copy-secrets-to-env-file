const core = require('@actions/core');
const fs = require('fs');

const inputPrefix = "ENV_";
const fileName = core.getInput('file-name') || '.env';

try {
  let envFileContent = '';

//   Object.keys(process.env).forEach(function(key) {
//     if(key.startsWith(inputPrefix)) {
//       envFileContent += `${key.substring(inputPrefix.length)}=${process.env[key]}\n`;
//     }
//   });
    const keys = Object.keys(process.env);
    for (const key of keys) {
        if (key && key.startsWith(inputPrefix)) {
            console.log('Key', keys);
            const keyName = key.substring(inputPrefix.length);
            envFileContent += `${keyName}=${process.env[key]}\n`
        }
    }
    console.log(envFileContent);

    fs.writeFile(fileName, envFileContent, function (error) {
    if (error) {
      core.setFailed(error.message);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}