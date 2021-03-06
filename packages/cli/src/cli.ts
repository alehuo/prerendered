import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import webpack from "webpack";
import { program } from "commander";
import { createConfig } from "./webpack.prerendered";
import { AssertionError } from "assert";

program.version("1.0.0");

interface PrerenderedConfig {
  client: {
    entryPoint: string;
  };
}

function assert(cond: unknown): asserts cond {
  if (!cond) {
    throw new AssertionError();
  }
}

program.option("--debug, -d", "Enable debug printing");

program
  .command("init")
  .description("Initialize prerendered")
  .action((_source, _destination) => {
    if (fs.existsSync(path.join(process.cwd(), "prerendered.json"))) {
      throw new Error(
        "Error! prerendered.json already exists. Please delete it before proceeding."
      );
    }
    console.log(
      "Thank you for using prerendered. I will now ask a few questions about your app."
    );
    console.log(
      "A configuration file will be created to the project root which is used by the build command."
    );
    console.log(`The folder I will use as a base will be ${process.cwd()}`);

    const questions: inquirer.QuestionCollection<{
      entrypoint: string;
    }> = [
      {
        type: "input",
        name: "entrypoint",
        message: `What is your client entrypoint? (Current working dir: ${process.cwd()})`,
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      if (answers.entrypoint === "") {
        throw new Error("Error! No entrypoint given");
      }
      if (!fs.existsSync(path.join(process.cwd(), answers.entrypoint))) {
        throw new Error("Error! Entrypoint does not exist");
      }
      const data: PrerenderedConfig = {
        client: {
          entryPoint: answers.entrypoint,
        },
      };
      fs.writeFileSync(
        path.join(process.cwd(), "prerendered.json"),
        JSON.stringify(data, null, 2)
      );
      console.log("Created prerendered.json");
    });
  });

program
  .command("build")
  .description("Build prerendered")
  .action((_source, _destination) => {
    if (!fs.existsSync(path.join(process.cwd(), "prerendered.json"))) {
      throw new Error(
        "Error! prerendered.json not found. Please run `prerendered init`"
      );
    }
    console.log("Bunding app");
    const cfgPath = path.join(process.cwd(), "prerendered.json");
    console.log("prerendered.json location: %s", cfgPath);
    const cfg: PrerenderedConfig = JSON.parse(
      fs.readFileSync(cfgPath).toString("utf-8")
    );
    // @ts-expect-error
    const webpackConfig = createConfig(cfg.client.entryPoint, program.debug);
    webpack(webpackConfig, (err, stats) => {
      assert(stats !== undefined);
      if (err !== undefined || stats.hasErrors()) {
        if (err !== undefined) {
          console.error(err.message);
        }
        if (stats.hasErrors()) {
          const info = stats.toJson();
          info.errors && info.errors.map(console.error);
        }
        throw new Error("Error! Webpack: Failed to compile");
      }
      const info = stats.toJson();

      if (stats.hasErrors()) {
        info.errors && info.errors.map(console.error);
      }

      if (stats.hasWarnings()) {
        info.warnings && info.warnings.map(console.warn);
      }

      console.log("Webpack: Done!");
    });
  });

program.parse(process.argv);
