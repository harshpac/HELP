const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();
const axios = require('axios');
let fine = true;
module.exports = {
    name: 'joke',
    description: 'cracks joke',
    async execute(message) {
        let getJoke = async() => {
            let response = await axios.get('https://official-joke-api.appspot.com/random_joke')
            .then()
            .catch(err => {
                fine = false;
            });
            return response.data;
        }
        let jokeValue = await getJoke().then().catch(err => {
            fine = false;
            return message.channel.send(embed.setDescription(`I can't think of a joke right now!\nI will tell you after sometime`));
        });
        if(!fine) return;
        
        embed.setTitle(`${jokeValue.setup}\n\n${jokeValue.punchline}`).setColor('#00FF00');
        message.channel.send(embed);
    }
}