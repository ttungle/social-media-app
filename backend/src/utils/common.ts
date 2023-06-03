import * as fs from 'fs';

export function calculateMetaData(queryString: any, totalCount: number) {
  return {
    page: queryString?.page * 1 || 1,
    pageSize: queryString?.pageSize * 1 || 50,
    total: totalCount || 0,
  };
}

export function removeOldFiles(folder: string, fileNameCheck: string, amountTime: number = 10 * 1000) {
  fs.readdir(folder, (err: NodeJS.ErrnoException | null, files: string[]) => {
    files.forEach((fileName) => {
      if (fileName.startsWith(fileNameCheck)) {
        if (parseInt(fileName.split('-')?.[3]) < Date.now() - amountTime) fs.rmSync(`${folder}/${fileName}`);
      }
    });
  });
}
