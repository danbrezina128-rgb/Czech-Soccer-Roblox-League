const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register-player')
        .setDescription('Zaregistruje hráče do týmu se smlouvou. (Staff Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option.setName('player')
                .setDescription('Vyberte hráče')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('team')
                .setDescription('Název týmu nebo emoji')
                .setRequired(true)),
    async execute(interaction) {
        const player = interaction.options.getUser('player');
        const team = interaction.options.getString('team');

        await interaction.reply({ 
            content: `✅ Hráč <@${player.id}> byl úspěšně zaregistrován do týmu **${team}**!`, 
            ephemeral: true 
        });

        // Veřejný log do kanálu
        const logEmbed = new EmbedBuilder()
            .setColor('#2ECC71')
            .setTitle('Player Management — Registration')
            .setDescription(`<@${player.id}> ➔ ${team}`)
            .setTimestamp();

        await interaction.channel.send({ embeds: [logEmbed] });
    },
};
