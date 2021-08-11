import { ipcMain } from "electron";

import pathsToRows from "./pathsToRows";
import prepareData from "./prepareData";
import groupWords from "./groupWords";

ipcMain.on("process-subtitles", async (event, paths) => {
  await pathsToRows(paths)
    .then(async (rows) => await prepareData(rows))
    .then(async (words) => await groupWords(words))
    .then((words) => {
      console.log(words);
      return words;
    })
    .then((groupedWords) => {
      event.reply("process-subtitles", groupedWords);
    })
    .catch((e) => console.log(e.toString()));
});
