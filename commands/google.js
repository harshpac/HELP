const Discord = require('discord.js');
let embed1 = new Discord.MessageEmbed();
let embed2 = new Discord.MessageEmbed();
let embed3 = new Discord.MessageEmbed();
const axios = require('axios');
const key = 'ec6604d9ab9a4041970bb1ee27ec2ae5';
const imageKey = '83a03040-8222-11eb-bc20-056f0c2381c3';
let val2;
let fine = true;



function szz( sz ) {
    let st = new Set();
    for(i=0; i<sz.length; i++){
       st.add(sz[i]);
    }
    return st.size;
}


module.exports = {
    name: 'google',
    description: 'dfgd',
    async execute(message, args){
       // console.log(args[0]);
        let qry = args.join('+');
      //  console.log(qry);
        let imageResult = async () => {
            let image = axios.get(`https://app.zenserp.com/api/v2/search?apikey=${imageKey}&q=${qry}&tbm=isch`)
            .then().catch(err => {
                fine = false;
                return message.channel.send(embed1.setDescription(`I am feeling sleepy 😴...\nI will google it later for you`));
            });
            return image;
        }
        if(!fine) return;
        let result = async () => {
            let search_result = axios.get(`http://api.serpstack.com/search?access_key=${key}&query=${qry}`)
            .then().catch(err => {
                fine = false;
                return message.channel.send(embed1.setDescription(`I am feeling sleepy 😴...\nI will google it later for you`));
            });
            return search_result;
        }
        if(!fine) return;
        let value = await result().then().catch(err => {fine = false;});
        let val2 =  await imageResult().then().catch(err => fine = false);

        if(!fine) return;

        //console.log(value.data.inline_images);

        
        
          let sz = [];
          let unq = [];
          while(szz(sz)<3){
          let v = Math.floor(Math.random()*15);
          sz.push(v);
           }

           sz.forEach((c) => {
           if (!unq.includes(c)) {
            unq.push(c);
           }
        });
        
        var url1 = val2.data.image_results[unq[0]].sourceUrl;
        var url2 = val2.data.image_results[unq[1]].sourceUrl;
        var url3 = val2.data.image_results[unq[2]].sourceUrl;
        sz = [];
        unq = [];

        //console.log(val2.data.image_results);
            embed1
            .setTitle(`${value.data.organic_results[0].title}`)
            .setDescription(`${value.data.organic_results[0].snippet}`)
            .setURL(`${value.data.organic_results[0].url}`)
            .setImage(`${url1}`);
            
            embed2
            .setTitle(`${value.data.organic_results[1].title}`)
            .setDescription(`${value.data.organic_results[1].snippet}`)
            .setURL(`${value.data.organic_results[1].url}`)
            .setImage(`${url2}`);

            embed3
            .setTitle(`${value.data.organic_results[2].title}`)
            .setDescription(`${value.data.organic_results[2].snippet}`)
            .setURL(`${value.data.organic_results[2].url}`)
            .setImage(`${url3}`);
            
            message.channel.send(embed1);
            message.channel.send(embed2);
            message.channel.send(embed3);
        return;
    }
}  


