const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { appData } = require("./mock");
const app = express();
const PORT = 9000;

const yourMusic_type = {
  UPLOADED: "uploaded",
  FAVORITE: "favorite",
  JUSTLISTEN: "justlisten",
};

const popular_type = {
  VIETNAM: "vietnam",
  USUK: "usuk",
  KPOP: "kpop",
};

function getDirectories(parentDir, type) {
  return fs.readdirSync(`./${parentDir}/${type}`);
}

function getSongDetails(parentDir, type, dir) {
  try {
    const path = `${parentDir}/${type}/${dir}/media`;
    console.log(path + "|||");
    const audioData = fs.readdirSync(path);
    const audioInfo = fs.readFileSync(
      `./${parentDir}/${type}/${dir}/info.json`
    );
    const parsedData = JSON.parse(audioInfo);
    return {
      audioFile: `${path}/${audioData[0]}`,
      avatar: `${path}/${audioData[1]}`,
      ...parsedData,
    };
  } catch (error) {
    return false;
  }
}

app.use(cors());

app.use("/yourmusic", express.static("yourmusic"));
app.use("/popular", express.static("popular"));

app.get(`/song`, (req, res) => {
  const songData = {};
  for (let type in yourMusic_type) {
    const directoryItems = getDirectories("yourmusic", yourMusic_type[type]);
    directoryItems.forEach((item) => {
      const audioData = getSongDetails("yourmusic", yourMusic_type[type], item);
      if (audioData) {
        if (yourMusic_type[type] in songData) {
          songData[yourMusic_type[type]].push(audioData);
        } else {
          songData[yourMusic_type[type]] = [audioData];
        }
      }
    });
  }
  appData.yourmusic = songData;

  const favoriteSongData = {};
  for (let type in popular_type) {
    const directoryItems = getDirectories("popular", popular_type[type]);
    directoryItems.forEach((item) => {
      const audioData = getSongDetails("popular", popular_type[type], item);
      if (audioData) {
        if (popular_type[type] in favoriteSongData) {
          favoriteSongData[popular_type[type]].push(audioData);
        } else {
          favoriteSongData[popular_type[type]] = [audioData];
        }
      }
    });
  }
  appData.popular = favoriteSongData;

  res.status(200).json({ appData });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
