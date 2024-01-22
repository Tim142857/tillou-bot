require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env
const token = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID;
console.log("token: ", token);
console.log("channelId: ", channelId);
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  postTime(); // Appel initial pour poster l'heure dès que le bot est prêt
  setInterval(postTime, 10000); // Poster l'heure toutes les 10 secondes
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

function postTime() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();

  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.send(`L'heure actuelle est : ${currentTime}`);
    console.log(`L'heure a été postée dans le canal avec succès à ${currentTime}`);
  } else {
    console.error(`Le canal avec l'ID ${channelId} n'a pas été trouvé.`);
  }
}
