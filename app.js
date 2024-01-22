require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env
const token = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID;
console.log("token: ", token);
console.log("channelId: ", channelId);
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
  console.log("Message:", message.content);

  // Vérifiez si la commande est !checkPage
  if (message.content.toLowerCase() === "!checkpage") {
    try {
      const url =
        "https://openloot.com/marketplace?gameId=56a149cf-f146-487a-8a1c-58dc9ff3a15c&tag=NFT.Workshop.TimeWarden";

      // Effectuez une requête HTTP pour récupérer le contenu de la page
      const response = await axios.get(url);

      // Comptez le nombre de fois que "TimeWarden" apparaît dans le contenu de la page
      const count = (response.data.match(/TimeWarden/gi) || []).length;

      // Envoyez le résultat sur le serveur Discord
      const resultMessage = `Le nombre de fois que 'TimeWarden' est affiché sur la page est : ${count}`;
      const channel = client.channels.cache.get(channelId);

      if (channel) {
        channel.send(resultMessage);
        console.log("Résultat envoyé avec succès.");
      } else {
        console.error(`Le canal avec l'ID ${channelId} n'a pas été trouvé.`);
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération de la page :",
        error.message
      );
      message.channel.send(
        "Une erreur s'est produite lors de la récupération de la page."
      );
    }
  }
});

client.on("error", (error) => {
  console.error("Une erreur non traitée s'est produite :", error);
});

client
  .login(token)
  .then(() => {
    console.log("Bot connecté avec succès !");
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la connexion du bot :",
      error.message
    );
  });
