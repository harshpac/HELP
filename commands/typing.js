const {words} = require('../util/game-words.json');
let {gifts} = require('../util/gifts.json');
const games = {};
const Discord = require('discord.js');
let embed = new Discord.MessageEmbed();
let embed2 = new Discord.MessageEmbed();
let embed3 = new Discord.MessageEmbed();

let max = -1;
let first, second;
let pos = [];

let set = new Set();




function get(points) {  
    let str = ''; 
    for(i=0; i<points; i++) {
        str+='✅'
    }
    return str;
}

const select = (game) => {
    game.currentWord = game.remainingWords[Math.floor(Math.random()*game.remainingWords.length)];
    const index = game.remainingWords.indexOf(game.currentWord);
    game.remainingWords.splice(index, 1);
}
const stages = {
    'STARTING': (counter) => {
       return  `This will be a 2 minutes game. \n Starting in **${counter}** sec`
    },
    'INGAME': (word) => {
        let spacedword = "";

        for(const character of [...word]){
            spacedword+=character;
            spacedword+=' ';
        }

        return `TYPE :    **${spacedword}**`;
    },
    'ENDING': (points) => {
        const sorted = Object.keys(points).sort((a,b) => {
            return points[b] - points[a]
        });

        let results = '';
       
        for(const key of sorted){
            const amount = points[key];
            let str = get(amount);
            set.add(amount);
            pos.push(key);
            results += `<@${key}>:       ${amount==0?'  ❌':str}\n`;
        }

        return `${results}...`;
    }
}

const gameLoop = () => {
    for(const key in games) {
        const game = games[key];
        const {message, stage} = game;

        if(stage==='STARTING'){
            let string = stages[stage](game.counter);
            message.edit(string);
            
            if(game.counter <= 0){
                game.stage = 'INGAME';
                game.counter = 60;

                select(game);
                string = stages[game.stage](game.currentWord);
                message.edit(string);
            }
        }

        else if (stage==='INGAME'){
            if(game.counter <= 0){
                game.stage = 'ENDING';
                
                const string = stages[game.stage](game.points);
                message.channel.send(embed.setTitle('Times UP!!! \nResults').setDescription(`${string}`).setColor('#17A6DE'));
                var it = set.values();
                var first = it.next();
                var value1 = first.value;
               // console.log(value);

                if(set.size==1){
                    if(value1>0)
                        message.channel.send(embed3.setDescription(`**T I E**`).setColor('#17A6DE'));
                    else if(value1==0){
                        message.channel.send(embed3.setDescription(`Damn!!! Everyone scores 🥚`).setColor('#17A6DE'))
                    }
                }  
               
                else if(set.size>1){
                    let urrl = gifts[Math.floor(Math.random()*gifts.length)];
                    message.channel.send(embed2.setTitle(`**Winner** 🥇 `).setDescription(`<@${pos[0]}>  has:   ${value1} ✅ \n **This is your gift**`).setColor('#17A6DE')
                    .setImage(`${urrl}`)
                    )
                }

                delete games[key];
                set.clear();
                pos=[];

                return;
            
            }
        }
        --game.counter;
    }

    setTimeout(gameLoop, 1000);
}

module.exports = {
    
    name: 'typing',
    description: 'dfgd',
    async execute(message, client, args){
        let tmp = new Set();
        for( i=0; i<args.length; i++){
            tmp.add(args[i]);
        }
        if(args.length==0){
            return message.channel.send(embed.setDescription(`Tag atleast 2 players to compete`));
        }
        if(tmp.size==1){
            let s = `<@!${message.member.id}>`;
            let s2 = `${args[0]}`;
          if(s===s2)
            return message.channel.send(embed.setDescription(`LOL!!! ${args[0]} wants to compete alone and win alone.`).setColor('#DE1735'));
          else return message.channel.send(embed.setDescription(`If you do want to compete, then tag yourself too.`).setColor('#DE1735'));  
        }
        let players = [];
        for(i=0; i<args.length; i++){
            let str = args[i];
            str = str.substr(3, str.length-4);
            players.push(str);
        }
      client.on('message', message => {
          const {channel, content, member} = message;
          const {id} = channel;

          const game = games[id];

          if(game && game.currentWord && !member.user.bot) {
              message.delete();

              if(game.stage==='INGAME' && content.toLowerCase()===game.currentWord.toLowerCase()){
                  game.currentWord = null;
                  const seconds = 1;

                  const {points} = game;
                  points[member.id] = points[member.id] || 0;
                  message.reply(`✅  correct. +1 point  ( Score: ${++points[member.id]} )`).then(newMessage => {
                      newMessage.delete({
                          timeout: 1000*seconds
                      })
                  })

                  setTimeout(() => {
                      if(game.stage==='INGAME'){
                          select(game);

                          const string = stages[game.stage](game.currentWord);
                          game.message.edit(string);
                      }
                  }, 1000*seconds)
              }
          }
      })  

       gameLoop();
       const {channel} = message;
       message.delete()
       channel.send('Preparing game...').then((message) => {
           games[channel.id] = {
               message,
               stage: 'STARTING',
               counter: 3,
               remainingWords: [...words],
               points:{}
           }
           for(i=0; i<args.length; i++){
            games[channel.id].points[players[i]] = 0;
           } 
       })

    }
}
