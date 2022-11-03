const { TelegramClient, tl, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs/promises");
const input = require("input");
const express = require("express");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();

// --- express setup --- //
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function connectToTelegram() {
  const apiId = process.env.API_ID;
  const apiHash = process.env.API_HASH;
  const stringSession = new StringSession("");
  const client = new TelegramClient(stringSession, +apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  return client.session.save();
}

async function telegramSetup() {
  try {
    console.log(" --- Main Function --- \n");
    let telegramSessionToken = process.env.TELEGRAM_SESSION_TOKEN;
    if (!telegramSessionToken) {
      let telegramSessionToken = await connectToTelegram();
      await fs.appendFile(
        ".env",
        `\nTELEGRAM_SESSION_TOKEN=${telegramSessionToken}`
      );
    }
    const stringSession = new StringSession(telegramSessionToken);
    const apiId = Number(process.env.API_ID);
    const apiHash = process.env.API_HASH;

    if (!apiId || !apiHash) throw Error("Please Provide API_ID and API_HASH");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.connect();
    return true;
  } catch (err) {
    console.log("--- Telegram SetUp Error ---\n");
    console.log(err);
  }
}
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log("Express Server Started At: " + port);
  let done = await telegramSetup();
  done ? console.log("telegram conection done") : console.log("failed");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Telegram Pinteret Initial Route" });
});

app.use("/api", router);
