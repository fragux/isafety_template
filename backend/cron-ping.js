const cron = require('node-cron');
const fs = require('fs');
const shell = require('shelljs');

// Schedule tasks to be run on the server.
cron.schedule('0 */6 * * *', function() {
    console.log('---------------------');
    console.log('Running Cron Job');
    console.log('---------------------');
    console.log('Algoritmo iSafety -> 6H');
    if (shell.exec('py isafety.py').code !== 0) {
        shell.exit(1);
    }
      else {
        shell.echo('Cron task completed!!!!');
      }
});

