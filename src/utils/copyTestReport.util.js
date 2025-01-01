const fs = require('fs-extra');
const sourceDir = 'src/reports/results/html'
destDir = 'src/reports/'

async function dateTimeOfDestFolder(){
    const now = new Date();
    formattedDate = now.toLocaleString('sv-SE').toString();
    formattedDate = formattedDate.replace(", ", "_");
    formattedDate = formattedDate.replaceAll(":", "");
    formattedDate = formattedDate.replaceAll("-", "");
    formattedDate = formattedDate.replace(" ", "");
    destDir = destDir+formattedDate;
}

async function copyFolder() {
  console.log('Copying history from previous run...')
  try {
    dateTimeOfDestFolder();

    // if directory is defined
    if (!sourceDir) {
      console.log(`${sourceDir} is not defined. Failed to copy.`)
      return
    }

    // if source directory exists
    if (!fs.pathExistsSync(sourceDir)) {
      console.log(`${sourceDir} does not exist. Failed to copy.`)
      return
    }
    // if destination directory is defined
    if (!destDir) {
      console.log(`${destDir} is not defined. Failed to copy.`)
      return
    }
    // Ensure destination directory exists
    await fs.mkdir(destDir, { recursive: true })

    fs.copySync(sourceDir, destDir)
    console.log('Report for last test copied successfully!')
  } catch (error) {
    console.error('Error during copy:', error)
  }
}

copyFolder()
