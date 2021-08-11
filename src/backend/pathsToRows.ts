import fs from "fs";

export default (paths: any[]) => {
  return new Promise((resolver, reject) => {
    try {
      const rows = paths
        .map((path: any) => fs.readFileSync(path).toString("utf-8"))
        .reduce((fullText: any, fileText: any) => `${fullText}\n${fileText}`)
        .split("\n");

      resolver(rows);
    } catch (e) {
      reject(e);
    }
  });
};
