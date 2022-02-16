const { TelegramClient, tl, Api } = require('telegram')
const { StringSession } = require('telegram/sessions')
const fs = require("fs/promises")
const input = require('input') // npm i input
require("dotenv").config()

const apiId = 11755904
const apiHash = 'e1052317070b9bc4a568b491ba71a58e'
const stringSession = new StringSession(process.env.TELEGRAM_TOKEN); // fill this later with the value from session.save()
(async () => {
    console.log('Loading interactive example...')
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })

    // console.log('You should now be connected.')
    // console.log(client.session.save()) // Save this string to avoid logging in again

    await client.connect(); // This assumes you have already authenticated with .start()
    // await client.sendMessage('me', { message: 'HOW ARE U MIHIR?!' });

    // const result = await client.invoke(
    //     new Api.channels.GetFullChannel({
    //       channel: "AnimeKaizoku",
    //     })
    //   );


    const channel = await client.invoke(
        new Api.channels.GetFullChannel({
            channel: "AnimeLibrary_Wallpapers",
        })
    );

    //   const mapped = result.map()
    //   const jsonObj = JSON.parse(result)

    // await fs.writeFile("allChat.json", jsonObj, (err) => {console.log("error is;", err)})
    // let chatId = channel.chats[0].id
    console.log("channel......", channel.fullChat.id)
    console.log("channel....more info....", channel.chats[0].id.value)


    const allChat = await client.invoke(
        new Api.messages.GetAllChats({
            exceptIds: [43],
        })
    );

    fs.writeFile("chat.json", new Buffer.from(JSON.stringify(allChat)), (err) => {
        if (err) {
            console.log("error.....", err)
            return
        }
        console.log("done")
    })

    const chat = await client.invoke(
        new Api.messages.GetChats({
            id: ["-1310421686"]
        })
    )


    const animeWallpaper = await client.invoke(
        new Api.messages.GetHistory({
            peer: "-1375781470",
            // offsetId: 1,
            // offsetDate: 43,
            addOffset: 0,
            limit: 10000,
            maxId: 0,
            minId: 0,
            hash: 0,
        })
    );

    console.log("animeWallper",animeWallpaper)

    fs.writeFile("animeWallpaper.json", new Buffer.from(JSON.stringify(animeWallpaper)), (err) => {
        if (err) {
            console.log("error.....", err)
            return
        }
        console.log("done")
    })


    // console.log("chat ...........is..........", chat)

})()

