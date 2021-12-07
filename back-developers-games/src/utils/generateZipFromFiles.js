const AdmZip = require('adm-zip');

async function generateZipFromFiles(files, gcBucket) {
  const zip = new AdmZip();

  const unresolvedThing = [];
  files.forEach((selectedChallenge) => {
    let { filename } = selectedChallenge;
    filename = `${selectedChallenge.teamId?.name}-${filename}`;

    const unresolvedFile = Promise.resolve({
      filename,
      data: gcBucket.file(selectedChallenge.gcloudName).download(),
    });

    unresolvedThing.push(unresolvedFile);
  });

  const resolvedDownloadedFiles = await Promise.all(unresolvedThing);

  resolvedDownloadedFiles.forEach((file) => {
    zip.addFile(file.filename, file.data[0]);
  });

  const gcloudFileName = `c_challenge-${files[0].challengeNumber}.zip`;
  const fileHandle = gcBucket.file(gcloudFileName);
  const [fileExists] = await fileHandle.exists();

  if (fileExists) {
    await gcBucket.file(gcloudFileName).delete();
  }

  await fileHandle.save(zip.toBuffer());

  return gcloudFileName;
}

module.exports = generateZipFromFiles;
