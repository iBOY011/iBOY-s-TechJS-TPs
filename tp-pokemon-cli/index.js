#!/usr/bin/env node

// import inquirer from "inquirer";
// import chalk from "chalk";

// console.log(chalk.green("🎮 Bienvenue dans le mini jeu Pokémon CLI !"));

// const response = await inquirer.prompt([
//   {
//     type: "input",
//     name: "playerName",
//     message: "Quel est ton nom, dresseur ?",
//   },
// ]);

// console.log(chalk.blue(`Salut ${response.playerName}! Prépare-toi au combat ⚔️`));

import inquirer from "inquirer";
import axios from "axios";
import chalk from "chalk";

// ------------------------------
// CONFIG
// ------------------------------
const API_BASE = "https://pokeapi.co/api/v2/pokemon/";
const PLAYER_HP = 300;
const BOT_HP = 300;

// ------------------------------
// UTILS
// ------------------------------
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ------------------------------
// MAIN
// ------------------------------
console.log(chalk.green.bold("\n🎮 Bienvenue dans le Pokémon CLI Battle!\n"));

const { pokemonName } = await inquirer.prompt([
  {
    type: "input",
    name: "pokemonName",
    message: "Choisis ton Pokémon (ex: pikachu, bulbasaur, charmander) :",
  },
]);

try {
  // Récupération des infos du Pokémon choisi
  const res = await axios.get(`${API_BASE}${pokemonName.toLowerCase()}`);
  const player = res.data;

  console.log(chalk.blue(`\nTu as choisi ${player.name.toUpperCase()} !`));

  // Sélection aléatoire de 5 attaques (moves)
  const moves = player.moves.slice(0, 5).map((m) => m.move.name);
  console.log(chalk.yellow("\nTes attaques :"));
  moves.forEach((m, i) => console.log(`${i + 1}. ${m}`));

  // BOT aléatoire
  const botRes = await axios.get(`${API_BASE}${Math.floor(Math.random() * 151) + 1}`);
  const bot = botRes.data;
  const botMoves = bot.moves.slice(0, 5).map((m) => m.move.name);

  console.log(chalk.red(`\nTon adversaire est ${bot.name.toUpperCase()} !\n`));

  // ------------------------------
  // DÉBUT DU COMBAT
  // ------------------------------
  let playerHP = PLAYER_HP;
  let botHP = BOT_HP;

  while (playerHP > 0 && botHP > 0) {
    // Tour du joueur
    const { move } = await inquirer.prompt([
      {
        type: "list",
        name: "move",
        message: chalk.cyan("Choisis ton attaque :"),
        choices: moves,
      },
    ]);

    console.log(chalk.greenBright(`\n💥 ${player.name} utilise ${move}!`));
    const playerDamage = Math.floor(Math.random() * 40) + 10; // dégâts entre 10 et 50
    botHP -= playerDamage;
    if (botHP < 0) botHP = 0;
    console.log(chalk.redBright(`${bot.name} perd ${playerDamage} HP. (${botHP} restants)`));

    if (botHP <= 0) break;

    await sleep(1000);

    // Tour du bot
    const botMove = randomItem(botMoves);
    const botDamage = Math.floor(Math.random() * 40) + 10;
    console.log(chalk.red(`\n🔥 ${bot.name} utilise ${botMove}!`));
    playerHP -= botDamage;
    if (playerHP < 0) playerHP = 0;
    console.log(chalk.yellow(`${player.name} perd ${botDamage} HP. (${playerHP} restants)`));

    await sleep(1000);
  }

  // ------------------------------
  // FIN DU COMBAT
  // ------------------------------
  if (playerHP <= 0 && botHP <= 0) {
    console.log(chalk.magentaBright("\n🤝 Match nul !"));
  } else if (playerHP <= 0) {
    console.log(chalk.redBright("\n💀 Tu as perdu !"));
  } else {
    console.log(chalk.greenBright("\n🏆 Victoire !!!"));
  }

} catch (err) {
  console.log(chalk.red("\nErreur : Pokémon introuvable ou problème API."));
}
