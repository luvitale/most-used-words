import { expect } from "chai";
import path from "path";
import fs from "fs";

import pathsToRows from "@/backend/pathsToRows";
import prepareData from "@/backend/prepareData";
import groupWords from "@/backend/groupWords";
import { GroupedWord } from "@/index";

describe("Most Used Words", () => {
  it("Grouped words is equal to expected grouped words", async () => {
    const testPath = path.join(process.cwd(), "tests");

    const srtPath = path.join(
      testPath,
      "srt",
      "The Simpsons - 19x01 - He Loves To Fly And He D'ohs.en.srt"
    );
    const paths = [srtPath];

    const expectedPath = path.join(testPath, "groupedWords", "19x01.json");
    const expectedGroupedWordsBuffer = fs.readFileSync(expectedPath);

    const expectedGroupedWords = JSON.parse(
      expectedGroupedWordsBuffer.toString()
    );

    await pathsToRows(paths)
      .then(async (rows: any) => await prepareData(rows))
      .then(async (words: any) => await groupWords(words))
      .then((groupedWords: any) => {
        // expect(expectedGroupedWords).to.deep.equal(groupedWords)
        expectedGroupedWords.map((eW: GroupedWord, i: any) => {
          expect(eW.name).to.equal(groupedWords[i].name);
          expect(eW.amount).to.equal(groupedWords[i].amount);
        });
      })
      .catch((error: { toString: () => any }) => {
        console.log(error.toString());
        expect(expectedGroupedWords).to.equal(error);
      });
  });
});
