// const {words} = require('../util/game-words.json');
// const games = {};

// const select = (game) => {
//     game.currentWord = game.remainingWords[Math.floor(Math.random()*game.remainingWords.length)];
//     const index = game.remainingWords.indexOf(game.currentWord);
//     game.remainingWords.splice(index, 1);
// }
// const stages = {
//     'STARTING': (counter) => {
//        return  `Game starts in ${counter}s`
//     },
//     'INGAME': (word) => {
//         let spacedword = "";

//         for(const character of [...word]){
//             spacedword+=character;
//             spacedword+=' ';
//         }

//         return `word is **${spacedword}**`;
//     },
//     'ENDING': (points) => {
//         const sorted = Object.keys(points).sort((a,b) => {
//             return points[b] - points[a]
//         });

//         let results = '';

//         for(const key of sorted){
//             const amount = points[key];
//             results += `<@${key}> had ${amount} points${amount===1 ? '': 's'}\n`;
//         }

//         return `Game over. results: ${results}...`;
//     }
// }

// const gameLoop = () => {
//     for(const key in games) {
//         const game = games[key];
//         const {message, stage} = game;

//         if(stage==='STARTING'){
//             let string = stages[stage](game.counter);
//             message.edit(string);
            
//             if(game.counter <= 0){
//                 game.stage = 'INGAME';
//                 game.counter = 50;

//                 select(game);
//                 string = stages[game.stage](game.currentWord);
//                 message.edit(string);
//             }
//         }

//         else if (stage==='INGAME'){
//             if(game.counter <= 0){
//                 game.stage = 'ENDING';
                
//                 const string = stages[game.stage](game.points);
//                 message.edit(string);

//                 delete games[key];

//                 continue;
            
//             }
//         }
//         --game.counter;
//     }

//     setTimeout(gameLoop, 1000);
// }

// module.exports = {
    
//     name: 'typing',
//     description: 'dfgd',
//     async execute(message, client){

//       client.on('message', message => {
//           const {channel, content, member} = message;
//           const {id} = channel;

//           const game = games[id];

//           if(game && game.currentWord && !member.user.bot) {
//               message.delete();

//               if(game.stage==='INGAME' && content.toLowerCase()===game.currentWord.toLowerCase()){
//                   game.currentWord = null;
//                   const seconds = 2;

//                   const {points} = game;
//                   points[member.id] = points[member.id] || 0;
//                   message.reply(`You won ! +1 point (${++points[member.id]} total)`).then(newMessage => {
//                       newMessage.delete({
//                           timeout: 1000*seconds
//                       })
//                   })

//                   setTimeout(() => {
//                       if(game.stage==='INGAME'){
//                           select(game);

//                           const string = stages[game.stage](game.currentWord);
//                           game.message.edit(string);
//                       }
//                   }, 1000*seconds)
//               }
//           }
//       })  

//        gameLoop();
//        const {channel} = message;
//        message.delete()
//        channel.send('Preparing game...').then((message) => {
//            games[channel.id] = {
//                message,
//                stage: 'STARTING',
//                counter: 5,
//                remainingWords: [...words],
//                points:{
//                   '810189846773235762': 0,
//                   '705404598290087986': 0,
//                   '717353738087432243': 0,
//                   '549549133652819968': 0
//                }
//            }
//        })        
//     }
// }












































// const {words} = require('../util/game-words.json');
// const games = {};
// let tym;

// function get(points) {  
//     let str = ''; 
//     for(i=0; i<points; i++) {
//         str+='🍎'
//     }
//     return str;
// }



// const select = (game) => {
//     game.currentWord = game.remainingWords[Math.floor(Math.random()*game.remainingWords.length)];
//     const index = game.remainingWords.indexOf(game.currentWord);
//     game.remainingWords.splice(index, 1);
//     //console.log(words);
// }
// const stages = {
//     'STARTING': (counter) => {
//        return  `Game starts in ${counter}s`
//     },
//     'INGAME': (word) => {
//         let spacedword = "";

//         for(const character of [...word]){
//             spacedword+=character;
//             spacedword+=' ';
//         }

//         return `word is **${spacedword}**`;
//     },
//     'ENDING': (points) => {
//         const sorted = Object.keys(points).sort((a,b) => {
//             return points[b] - points[a]
//         });
       
//        let results = ''; 
//        var set = new Set();
//         for(const key of sorted){
//             const amount = points[key];
//             let str = get(amount);
//             set.add(amount);
//             results += `<@${key}>          ${str} \n`;
//         }

//         console.log(set);

//         return `Game over. results:\n\n ${results}...`;

//     }
// }

// const gameLoop = () => {
//     for(const key in games) {
//         const game = games[key];
//         const {message, stage} = game;

//         if(stage==='STARTING'){
//             let string = stages[stage](game.counter);
//             message.edit(string);
            
//             if(game.counter <= 0){
//                 game.stage = 'INGAME';
//                 game.counter = tym;

//                 select(game);
//                 string = stages[game.stage](game.currentWord);
//                 message.edit(string);
//             }
//         }

//         else if (stage==='INGAME'){
//             if(game.counter <= 0){
//                 game.stage = 'ENDING';
                
//                 const string = stages[game.stage](game.points);
//                 message.edit(string);

//                 delete games[key];

//                 continue;
            
//             }
//         }
//         --game.counter;
//     }

//     setTimeout(gameLoop, 1000);
// }

// module.exports = {
    
//     name: 'typing',
//     description: 'dfgd',
//     async execute(message, client, args){
//       let players = [];
//       for(i=0; i<args.length-1; i++){
//           let str = args[i];
//           str = str.substr(3, str.length-4);
//           players.push(str);
//       }
//       tym = args[args.length-1];
//       console.log(tym)
//       console.log(players);
//       client.on('message', message => {
//           const {channel, content, member} = message;
//           const {id} = channel;

//           const game = games[id];

//           if(game && game.currentWord && !member.user.bot) {
//               message.delete();

//               if(game.stage==='INGAME' && content.toLowerCase()===game.currentWord.toLowerCase()){
//                   game.currentWord = null;
//                   const seconds = 2;

//                   const {points} = game;
//                   points[member.id] = points[member.id] || 0;
//                   message.reply(`You won ! +1 point (${++points[member.id]} total)`).then(newMessage => {
//                       newMessage.delete({
//                           timeout: 1000*seconds
//                       })
//                   })

//                   setTimeout(() => {
//                       if(game.stage==='INGAME'){
//                           select(game);

//                           const string = stages[game.stage](game.currentWord);
//                           game.message.edit(string);
//                       }
//                   }, 1000*seconds)
//               }
//           }
//       })  

//        gameLoop();
//        const {channel} = message;
//        message.delete()
//        channel.send('Preparing game...').then((message) => {
//            games[channel.id] = {
//                message,
//                stage: 'STARTING',
//                counter: 5,
//                remainingWords: [...words],
//                points:{
//                    '810189846773235762': 0,
//                    '705404598290087986': 0
//                }
//            }
//         for(i=0; i<args.length; i++){
//             games[channel.id].points[players[i]] = 0;
//         } 
//        })        

//        var k = channel.id;
      
//        delete games[k];
//     }
// }
