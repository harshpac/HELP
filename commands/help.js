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
               inline: true
            }, 

           {
               name: "**`setagenda <..>`**",
               value: 'I will set the agenda of the chat ',
               inline: true
           },

           {
            name: "**`agenda`**",
            value: 'I will tell you the current agenda  ',
            inline: true
           },

           {
            name: "**`setlink <..>`**",
            value: 'I will set the link for the chat ',
            inline: true
           },

           {
            name: "**`link`**",
            value: 'I will provide the link ',
            inline: true
           },
           
           {
               name: "**`change <..>`**",
               value: 'I will change the prefix',
               inline: true
           },

           {
               name: "**`joke`**",
               value: 'I will crack a joke for you',
               inline: true
           },

           {
            name: "**`clear <number>`**",
            value: 'I will delete <number> recent messages (ADMIN ONLY) ',
            inline: true
           },

           {
            name: "**`clear all`**",
            value: 'I will delete messages in bulk (ADMIN ONLY)',
            inline: true
           },
         
           {
            name: "**`spam <..>`**",
            value: 'I will start spamming until someone asks me to stop',
            inline: true
           },

           {
            name: "**`stop`**",
            value: 'I will stop spamming ',
            inline: true
           },

           {
               name: "**`allow all`**",
               value: 'Allow group members to delete messages',
               inline: true
           },

           {
            name: "**`allow admin`**",
            value: 'Allow only admin to delete messages',
            inline: true
           },

           {
            name: "**`tea <tag>`**",
            value: 'You can provide a cup of tea to the tagged user (Just for fun)',
            inline: true
           },

           {
            name: "**`tea forme`**",
            value: 'Check how many cups of tea you have been provided by your friends',
            inline: true
           },
           {
            name: "**`google <query>`**",
            value: 'I will google a query for you',
            inline: true
           },

           {
            name: "**`typing <tag_user1> <tag_user2> ...`** ",
            value: 'I will start a 2 min typing speed test ',
            inline: true
           },

           {
            name: "**`clist`**",
            value: 'I will show the list of upcoming CP contests ',
            inline: true
           }, 

           {
            name: "**`clist <sitename>`**",
            value: 'I will show the Contest for particular site',
            inline: true
           }

       );
       message.channel.send(embed);
    }
}   
