const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Načtení proměnných z prostředí
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`🧹 Mažu staré příkazy a nahrávám ${commands.length} nových příkazů...`);

        // Tento příkaz přepíše VŠECHNY staré příkazy pouze tvými novými
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('✅ Nové příkazy byly úspěšně zaregistrovány!');
    } catch (error) {
        console.error(error);
    }
})();
