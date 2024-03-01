import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })


const apiKey = process.env.GEMINI_SECRET

const ignorePrefix = "!"
const Channels = ['1212667625377890367']


const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

const chat = model.startChat({
    history: "",

})
client.on('messageCreate', async (message) => {
    // console.log('messa', message)
    if (message.author.bot) return;

    if (message.content.startsWith(ignorePrefix)) return;
    if (!Channels.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;
    if (message.content.startsWith('create')) {
        const url = message.content.split('create')[1]
        return message.reply({
            content: "Generating Short Url for" + url
        })
    }

 
    const result = await chat.sendMessage(message.content)

    const response = await result.response

    const text = response.text()




    message.reply({
        content: text
    })


})



client.on('interactionCreate', async interaction => {      
   

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.BOT_SECRET_TOKEN);