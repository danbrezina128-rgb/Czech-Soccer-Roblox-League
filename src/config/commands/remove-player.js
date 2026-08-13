const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-player')
        .setDescription('Smaže hráče z databáze ligy. (Staff Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option.setName('player')
                .setDescription('Hráč k odstranění')
                .setRequired(true)),
    async execute(interaction) {
        const player = interaction.options.getUser('player');

        await interaction.reply({ 
            content: `❌ Hráč <@${player.id}> byl odebrán z ligy.`, 
            ephemeral: true 
        });

        const logEmbed = new EmbedBuilder()
            .setColor('#E74C3C')
            .setTitle('Player Management — Removed')
            .setDescription(`<@${player.id}> byl odebrán z databáze.`)
            .setTimestamp();

        await interaction.channel.send({ embeds: [logEmbed] });
    },
};
