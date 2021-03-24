module.exports = {
    name: 'spam',
    description: 'dfgd',
    execute(message, tospam , tostop){
        if(!tospam) return;
        message.channel.send(`**${tospam}**`);
       
    }
}  