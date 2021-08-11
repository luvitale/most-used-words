export default (rows: any[]) => {
  return new Promise((resolver, reject) => {
    try {
      const words = rows
        .filter(filterValidRow)
        .map(removePunctuation)
        .map(removeTags)
        .reduce(mergeRows)
        .split(" ")
        .map((word: string) => word.toLowerCase())
        .map((word: string) => word.replace('"', ""));

      resolver(words);
    } catch (e) {
      reject(e);
    }
  });
};

const filterValidRow = (row: string) => {
  const notNumber = !parseInt(row.trim());
  const notEmpty = !!row.trim();
  const notInterval = !row.includes("-->");

  return notNumber && notEmpty && notInterval;
};

const removePunctuation = (row: string) => row.replace(/[,?!.-]/g, "");

const removeTags = (row: string) => row.replace(/(<[^>]+)>/gi, "").trim();

const mergeRows = (fullText: any, row: any) => `${fullText} ${row}`;
