/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { program } from 'commander';

program.version('0.0.1');

console.log('Prerendered CLI');

program
  .option('--debug, -d', 'Enable debug printing');

program.command('init').description('Initialize prerendered')
  .action((_source, _destination) => {
    if (fs.existsSync(path.join(process.cwd(), 'prerendered.json'))) {
      throw new Error('Error! prerendered.json already exists. Please delete it before proceeding.');
    }
    console.log('Thank you for using prerendered. I will now ask a few questions about your app.');
    console.log('A configuration file will be created to the project root which is used by the build command.');
    console.log(`The folder I will use as a base will be ${process.cwd()}`);

    const questions: inquirer.QuestionCollection<{
      entrypoint: string
    }> = [
      {
        type: 'input', name: 'entrypoint', message: `What is your client entrypoint? (Current working dir: ${process.cwd()})`,
      },
    ];

    inquirer
      .prompt(questions)
      .then((answers) => {
        if (answers.entrypoint === '') {
          throw new Error('Error! No entrypoint given');
        }
        if (!fs.existsSync(path.join(process.cwd(), answers.entrypoint))) {
          throw new Error('Error! Entrypoint does not exidst');
        }
        const data = {
          client: {
            entryPoint: answers.entrypoint,
          },
        };
        fs.writeFileSync(path.join(process.cwd(), 'prerendered.json'), JSON.stringify(data, null, 2));
        console.log('Created prerendered.json');
      });
  });

program.command('build').description('Build prerendered')
  .action((_source, _destination) => {
    if (!fs.existsSync(path.join(process.cwd(), 'prerendered.json'))) {
      throw new Error('Error! prerendered.json not found. Please run `prerendered init`');
    }
  });

program.parse(process.argv);
