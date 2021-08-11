import { ipcMain } from "electron";

import pathsToRows from "@/backend/pathsToRows";
import prepareData from "@/backend/prepareData";
import groupWords from "@/backend/groupWords";

ipcMain.on("process-subtitles", async (event, paths) => {
  await pathsToRows(paths)
    .then(async (rows: any) => await prepareData(rows))
    .then(async (words: any) => await groupWords(words))
    .then((words: any) => {
      console.log(words);
      return words;
    })
    .then((groupedWords: any) => {
      event.reply("process-subtitles", groupedWords);
    })
    .catch((e: { toString: () => any }) => console.log(e.toString()));
});
