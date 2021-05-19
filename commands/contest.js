const Discord = require('discord.js');
var dateFormat = require('dateformat');
let embed = new Discord.MessageEmbed();
let embed2 = new Discord.MessageEmbed();
let embed3 = new Discord.MessageEmbed();
const axios = require('axios');
let fine = true;
let {logos} = require('../util/cpLogos.json');

let available = ["google", "codeforces", "codechef", "atcoder", "hackerearth", "hackerrank", "leetcode"];
let contests = [[]];
for(i=0; i<7; i++) contests.push(new Array());
//let google = []; codeforces = [], codechef =[] = [], atcoder = [], hackerearth = [], hackerrank = [], 
//     0              1                2                 3                4                5

let fill = (contestData) => {
    let mxDuration = 15000;

    contestData.forEach(contest => {

        if(contest.name.includes("Circuits")) {
            contests[4].push(contest);
        } 

        if(contest.name.includes("Long Challenge")) {
            contests[2].push(contest);
        } 

        if(contest.site === "Kick Start"){
           contests[0].push(contest);
        }
        if(contest.site === "CodeForces") {
            if(contest.duration <= mxDuration) contests[1].push(contest);
        }
        if(contest.site === "CodeChef") {
            if(contest.duration <= mxDuration) contests[2].push(contest);
        }
        if(contest.site === "AtCoder") {
            if(contest.duration <= mxDuration) contests[3].push(contest);
        }
        if(contest.site === "HackerEarth") {
            if(contest.duration <= mxDuration)  contests[4].push(contest);
        }
        if(contest.site === "HackerRank") {
            if(contest.duration <= mxDuration ) contests[5].push(contest);
        }
        if(contest.site.toLowerCase() === "leetcode") {
            contests[6].push(contest);
        }

    });
}

let get = (num) => {
    let n = num/(60*60).toPrecision(2);
    if(n<10)
    return parseFloat(n).toPrecision(3);
    else return parseFloat(n).toPrecision(5);
}

let printforme = (message, cc) => {
    let itsduration = get(cc.duration);
    var startTimeDate = new Date(cc.start_time);
    var d2 = new Date ( startTimeDate );
    d2.setMinutes ( startTimeDate.getMinutes() + 330 );
    let urrl = logos[i];
    message.channel.send(embed.setTitle(`${cc.site}`).setDescription(`${cc.name}`).setColor('#17A6DE')
    .setThumbnail(`${urrl}`)
    .setURL(cc.url)
    .setDescription(dateFormat(d2, `mmmm dS yyyy, h:MM TT`))
    .setTitle(cc.name)
    .setFooter(`${itsduration} HRS`)
    )
}


let render = (message) => {
    for(i=0; i<7; i++) {
        if(contests[i].length > 0) {
            for(j=0; j<Math.min(2, contests[i].length); j++) {
               printforme(message, contests[i][j]);
            }
        }
    }
}

let getIndex = (nm) => {
    for(i=0; i<available.length; i++) {
        if(available[i]===nm) return i;
    }
    return -1;
}


let print = (message, args) => {
        let name = args[0].toLowerCase();
        var ind = getIndex(name);
        if(ind!=-1) {
        if(contests[ind].length==0) {
            message.channel.send(embed3.setDescription(`No contests in near future for ` + args[0]));
        }
        else {
            for(j = 0; j<Math.min(4, contests[i].length); j++) {
               printforme(message, contests[i][j]);
            }
        }
      }
      else {
        message.channel.send(embed2.setDescription(`Can't find site ` + name));
      }
}

module.exports = {
    name: 'clist',
    description: 'fetches cp contest',
    async execute(message, args) {
        console.log('hii');
        let getContest = async() => {
            let response = await axios.get('https://kontests.net/api/v1/all')
            .then()
            .catch(err => {
                fine = false;
            });
            return response.data;
        }
        let contestData = await getContest().then().catch(err => {
            fine = false;
            return message.channel.send(embed.setDescription(`Can't find now. Visit this link.`).setURL("https://clist.by/").setTitle("clist.by"));
        });
        if(!fine) return;
        fill (contestData);
        if(args.length == 0)
        render(message);
        else {
            print(message, args);
        }
        for(i=0; i<7; i++) contests[i] = new Array();
    }
}