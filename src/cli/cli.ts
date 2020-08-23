/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import webpack from 'webpack';
import { program } from 'commander';
import { createConfig } from './webpack.prerendered';

program.version('0.0.1');

interface PrerenderedConfig {
  client: {
    entryPoint: string;
  }
}

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
          throw new Error('Error! Entrypoint does not exist');
        }
        const data: PrerenderedConfig = {
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
    console.log('Bunding app');
    const cfg: PrerenderedConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'prerendered.json')).toString('utf-8'));
    const webpackConfig = createConfig(cfg.client.entryPoint, program.debug);
    webpack(webpackConfig, (err, stats) => {
      if (err !== null || stats.hasErrors()) {
        if (err !== null && err.message) {
          console.error(err.message);
        }
        if (stats.hasErrors()) {
          const info = stats.toJson();
          console.error(info.errors);
        }
        throw new Error('Error! Webpack: Failed to compile');
      }
      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      console.log('Webpack: Done!');
    });
  });

program.parse(process.argv);
