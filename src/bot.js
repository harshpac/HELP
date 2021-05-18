require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
let embed = new Discord.MessageEmbed();
let delAll = false;

const fs = require('fs');
const { finished } = require("stream");
const { serialize } = require("v8");
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`../commands/${file}`);
 
    client.commands.set(command.name, command);
}

let tospam = "";
let tostop = "stopped";
let pre = "-";
let link = "";
let agenda = "";

client.on('ready', () => {
    console.log(`${client.user.tag}`);
    client.user.setActivity('use -help for more', {type: "LISTENING"}).catch(err => console.log(err));
    client.user.setUsername('-help').catch(err => console.log(err));
});

 
 client.on('message', async (message)  => {

     const [cmd, ...args] = message.content
    .trim()
    .substring(pre.length)
    .split(/\s+/);

     if(message.content.startsWith(pre)){
      
       if(cmd==="spam"){
        tospam = args.join(" ");
        tostop = "start";
        client.commands.get('spam').execute(message, tospam, tostop);
        return;
       }


       if(cmd==="stop" && args.length == 0){
         if(tostop==="stopped"){
           embed.setDescription("Alright! I am not spamming now  👍")
           .setColor('#00FF00');
           message.channel.send(embed);
           return;
         }
         tospam = "stop";
         tostop = "stopped";
         return;
       }


       if(cmd==="listen"){
       
        client.commands.get('listen').execute(message, args);
       }

       if(cmd==="clear"){
         //console.log(delAll);
        client.commands.get('clear').execute(message, args, delAll);
       }

       if(cmd==="setlink"){
          if(args.length == 1){
            link = args[0];
          } 
       }

       if(cmd==="typing"){
         client.commands.get('typing').execute(message, client, args);
       }

       if(cmd==="google"){
         client.commands.get('google').execute(message, args);
       }

       if(cmd==="link" && args.length==0){
          client.commands.get('link').execute(message, link);
       }
       

       if(cmd==="setagenda"){
         if(args.length == 0) return message.channel.send(embed.setDescription('Provide agenda with the command'))
         if(args.length > 0) agenda = args;
       }

       if(cmd==="agenda" && args.length==0){
        client.commands.get('agenda').execute(message, agenda);
       }

       if(cmd==="joke"){
         client.commands.get('joke').execute(message);
       }

       if(cmd=="clist"){
        client.commands.get('clist').execute(message, args);
      }

       if(cmd==="sps"){
         client.commands.get('sps').execute(message, args, client);
       }

       if(cmd==="change"){
         if(args.length > 1) return message.channel.send('invalid');
         pre = args[0];
         message.channel.send(embed.setDescription(`✅ prefix changed to ${pre}`).setColor('#00FF00'));
       }

       if(cmd==="help"){
         client.commands.get('help').execute(message, pre);
       }

         if(cmd==="tea"){
           if(args[0]==="forme"){
           client.commands.get('tea').execute(message,args, client, true);
           }
           else {
            client.commands.get('tea').execute(message,args, client, false);
           }
         }

       if(cmd==="allow"){
          client.commands.get('toggle').execute(message, args);
          let to = args[0];
          if(to==="all") delAll = true;
          if(to==="admin") delAll = false;
          //console.log(delAll)
       }

       client.commands.get('check').execute(message, cmd, pre, true);       

     }

     if(message.content.length<=20){
     let [...arr] = message.content.split(' ');
     if(arr.length <=2 )
     client.commands.get('check').execute(message, arr[0], pre, false);
     }

    

     if(message.content==="prefix"){
        message.channel.send(embed.setDescription(`Current prefix is  **${pre}**`).setColor('#33FFC0'));
      }
    
     if(message.content===`**${tospam}**`){
        client.commands.get('spam').execute(message, tospam, tostop);
     }

 })

client.login(process.env.DISCORDJS_BOT_TOKEN);
