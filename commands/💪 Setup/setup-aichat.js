var {
  MessageEmbed
} = require(`discord.js`);
const axios = require('axios');
const openai = require('openai');
var config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
var {
  databasing
} = require(`${process.cwd()}/handlers/functions`);
const { MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
  name: "setup-aichat",
  category: "💪 Setup",
  aliases: ["setupaichat", "aichat-setup", "aichatsetup"],
  cooldown: 5,
  usage: "setup-aichat  -->  Follow the Steps",
  description: "Specify a Channel used for Chatting with the AI of this BOT! | FOR FUN!",
  memberpermissions: ["ADMINISTRATOR"],
  type: "fun",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, 'embed');
    let ls = client.settings.get(message.guild.id, 'language');
    
    try {
      first_layer();
  
      async function first_layer() {
        // Your existing code for the first layer here...
  
        collector.on('collect', async menu => {
          if (menu?.user.id === cmduser.id) {
            collector.stop();
            let menuoptiondata = menuoptions.find(v => v.value == menu?.values[0]);
            if (menu?.values[0] == 'Cancel') return menu?.reply(eval(client.la[ls]['cmds']['setup']['setup-ticket']['variable3']));
            menu?.deferUpdate();
            let SetupNumber = menu?.values[0].split(' ')[0];
            handle_the_picks(menu?.values[0], SetupNumber, menuoptiondata);
          } else menu?.reply({ content: `<:no:833101993668771842> You are not allowed to do that! Only: <@${cmduser.id}>`, ephemeral: true });
        });
  
        collector.on('end', collected => {
          menumsg.edit({ embeds: [menumsg.embeds[0].setDescription(`~~${menumsg.embeds[0].description}~~`)], components: [], content: `${collected && collected.first() && collected.first().values ? `<a:yes:833101995723194437> **Selected: \`${collected ? collected.first().values[0] : 'Nothing'}\`**` : '❌ **NOTHING SELECTED - CANCELLED**' }` });
        });
      }
  
      async function handle_the_picks(optionhandletype, SetupNumber, menuoptiondata) {
        switch (optionhandletype) {
          case 'Enable Ai-Chat':
            {
              var tempmsg = await message.reply({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]['cmds']['setup']['setup-aichat']['variable5']))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]['cmds']['setup']['setup-aichat']['variable6']))
                    .setFooter(client.getFooter(es)),
                ],
              });
              
              await tempmsg.channel.awaitMessages({
                filter: m => m.author.id == message.author.id,
                max: 1,
                time: 90000,
                errors: ['time'],
              })
                .then(async collected => {
                  var message = collected.first();
                  if (!message) return message.reply('NO MESSAGE SENT');
                  
                  let channel = message.mentions.channels.filter(ch => ch.guild.id == message.guild.id).first() || message.guild.channels.cache.get(message.content.trim().split(' ')[0]);
                  
                  if (channel) {
                    // Make a request to OpenAI API to enable AI chat and store the channel and API response in the database
                    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                      prompt: '',
                      max_tokens: 0,
                      temperature: 0,
                    }, {

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(e.message ? e.message : e).substring(0, 2000)}\`\`\``)
      ]});
    }
