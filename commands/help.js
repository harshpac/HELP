const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();


const mycmd = ['agenda', 'clear', 'link', 'setlink', 'stop', 'spam', 'listen', 'joke', 'change', 'help'];

module.exports = {
    name: 'help',
    description: 'dfgd',
    execute(message, pre){
       embed
       .setColor('#33FFC0')
       .setTitle('Hey, I am here to help you with commands')
       .setDescription(" ⭐ Use command **`prefix`** to get the current prefix and then \n use this current prefix **without space** before using any command below ")
       .addFields(

            {
               name: "**`prefix`**",
               value: 'I will tell you the current prefix',
               inline: false
            }, 

           {
               name: "**`setagenda <..>`**",
               value: 'I will set the agenda of the chat ',
               inline: false
           },

           {
            name: "**`agenda`**",
            value: 'I will tell you the current agenda  ',
            inline: false
           },

           {
            name: "**`setlink <..>`**",
            value: 'I will set the link for the chat ',
            inline: false
           },

           {
            name: "**`link`**",
            value: 'I will provide the link ',
            inline: false
           },
           
           {
               name: "**`change <..>`**",
               value: 'I will change the prefix',
               inline: false
           },

           {
               name: "**`joke`**",
               value: 'I will crack a joke for you',
               inline: false
           },

           {
            name: "**`clear <number>`**",
            value: 'I will delete <number> recent messages (ADMIN ONLY) ',
            inline: false
           },

           {
            name: "**`clear all`**",
            value: 'I will delete messages in bulk (ADMIN ONLY)',
            inline: false
           },
         
           {
            name: "**`spam <..>`**",
            value: 'I will start spamming until someone asks me to stop',
            inline: false
           },

           {
            name: "**`stop`**",
            value: 'I will stop spamming ',
            inline: false
           },

           {
               name: "**`allow all`**",
               value: 'Allow group members to delete messages'
           },

           {
            name: "**`allow admin`**",
            value: 'Allow only admin to delete messages'
           },

           {
            name: "**`tea <tag>`**",
            value: 'You can provide a cup of tea to the tagged user (Just for fun)'
           },

           {
            name: "**`tea forme`**",
            value: 'Check how many cups of tea you have been provided by your friends'
           },
           {
            name: "**`google <query>`**",
            value: 'I will google a query for you'
           },

           {
            name: "**`typing <tag_user1> <tag_user2> ...`** ",
            value: 'I will start a 2 min typing speed test '
           }

       );
       message.channel.send(embed);
    }
}   