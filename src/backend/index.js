import { ipcMain } from 'electron';

ipcMain.on("blabla", (event, args) => {
  console.log(args)

  event.reply("blabla", "pong")
})