const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('Show information about a GVL team')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the team')
                .setRequired(true)),
    async execute(interaction) {
        const teamName = interaction.options.getString('name');

        const embed = new EmbedBuilder()
            .setColor('#D0021B') // Červená barva v HEX (stejná jako na vašem obrázku)
            .setTitle(`📌 | ${teamName}`)
            .setDescription(`Official overview and management for **${teamName}**.`)
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: '🌐 Discord Link', value: '[Server Link](https://discord.gg)', inline: false },
                { name: '👑 Team Owner', value: `<@${interaction.user.id}>`, inline: true },
                { name: '👔 Manager', value: `<@${interaction.user.id}>`, inline: true }
            )
            .setFooter({ text: 'GVL Management System' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
