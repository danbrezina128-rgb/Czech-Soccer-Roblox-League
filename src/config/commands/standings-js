const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('standings')
        .setDescription('Show the current standings of a GVL division.')
        .addStringOption(option =>
            option.setName('division')
                .setDescription('Vyber divizi')
                .setRequired(true)
                .addChoices(
                    { name: 'Division 1', value: 'Division 1' },
                    { name: 'Division 2', value: 'Division 2' },
                    { name: 'Division 3', value: 'Division 3' }
                )),
    async execute(interaction) {
        const division = interaction.options.getString('division');

        const standingsEmbed = new EmbedBuilder()
            .setColor('#D0021B')
            .setTitle(`📊 | Standings — ${division}`)
            .setDescription(`Aktuální tabulka pro **${division}**:`)
            .addFields(
                { name: '1. FC Schalke 04', value: '12 bodů (4W - 0D - 0L)', inline: false },
                { name: '2. Chemnitzer FC', value: '9 bodů (3W - 0D - 1L)', inline: false },
                { name: '3. Borussia Dortmund', value: '6 bodů (2W - 0D - 2L)', inline: false },
                { name: '4. 1.FC Köln', value: '3 body (1W - 0D - 3L)', inline: false }
            )
            .setFooter({ text: 'GVL Management' })
            .setTimestamp();

        await interaction.reply({ embeds: [standingsEmbed] });
    },
};
