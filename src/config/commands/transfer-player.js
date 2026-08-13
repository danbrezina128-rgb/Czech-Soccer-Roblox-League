const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transfer-player')
        .setDescription('Provede přestup hráče mezi kluby. (Staff Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option.setName('player')
                .setDescription('Vyberte hráče')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('from_team')
                .setDescription('Původní klub (emoji/název)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('to_team')
                .setDescription('Nový klub (emoji/název)')
                .setRequired(true)),
    async execute(interaction) {
        const player = interaction.options.getUser('player');
        const fromTeam = interaction.options.getString('from_team');
        const toTeam = interaction.options.getString('to_team');

        await interaction.reply({ 
            content: `✅ Přestup hráče <@${player.id}> byl zaznamenán!`, 
            ephemeral: true 
        });

        const logEmbed = new EmbedBuilder()
            .setColor('#3498DB')
            .setTitle('Player Management')
            .setDescription(`<@${player.id}> ${fromTeam} ➔ ${toTeam}`)
            .setTimestamp();

        await interaction.channel.send({ embeds: [logEmbed] });
    },
};
