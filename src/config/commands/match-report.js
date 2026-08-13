const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('match-report')
        .setDescription('Odešle výsledek a detailní statistiky zápasu')
        .addStringOption(o => o.setName('home_team').setDescription('Domácí tým').setRequired(true))
        .addStringOption(o => o.setName('away_team').setDescription('Hostující tým').setRequired(true))
        .addStringOption(o => o.setName('score').setDescription('Výsledek (např. 2-1)').setRequired(true))
        .addStringOption(o => o.setName('stadium').setDescription('Stadion').setRequired(true))
        .addStringOption(o => o.setName('competition').setDescription('Soutěž / Divize').setRequired(true))
        .addStringOption(o => o.setName('home_goals').setDescription('Střelci domácích').setRequired(false))
        .addStringOption(o => o.setName('away_goals').setDescription('Střelci hostů').setRequired(false)),
    async execute(interaction) {
        const home = interaction.options.getString('home_team');
        const away = interaction.options.getString('away_team');
        const score = interaction.options.getString('score');
        const stadium = interaction.options.getString('stadium');
        const comp = interaction.options.getString('competition');
        const homeGoals = interaction.options.getString('home_goals') || '-';
        const awayGoals = interaction.options.getString('away_goals') || '-';

        const embed = new EmbedBuilder()
            .setColor('#F1C40F')
            .setTitle(`⚽ ${home} vs ${away}`)
            .setDescription(
                `**Score:** ${score}\n` +
                `**Stadium:** ${stadium}\n` +
                `**Competition:** ${comp}\n` +
                `**Reviewed by:** <@${interaction.user.id}>\n\n` +
                `**Home GoalScorer:**\n${homeGoals}\n\n` +
                `**Away GoalScorer:**\n${awayGoals}`
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
