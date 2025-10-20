#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.green("🎮 Bienvenue dans le mini jeu Pokémon CLI !"));

const response = await inquirer.prompt([
  {
    type: "input",
    name: "playerName",
    message: "Quel est ton nom, dresseur ?",
  },
]);

console.log(chalk.blue(`Salut ${response.playerName}! Prépare-toi au combat ⚔️`));
