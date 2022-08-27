import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { backIcon } from "../../../assets";
import { baseUrl } from "../../../config";
import SearchInput from "./SearchInput";
import "./style.css";

const AudioList = ({
  type,
  onClickBackButton,
  audioList,
  onTrackSelect,
  historyList,
  setHistorylist,
}) => {
  // console.log({ audioList });
  console.log("type ne ba:" + type);
  const [history, setHistory] = useState(false);
  const [currentAudioList, setCurrentAudioList] = useState(audioList);

  const uploadAudio = () => {
    alert("function is under development");
  };
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (type === "justlisten") {
      setCurrentAudioList(historyList);
      setHistory(true);
    } else setHistory(false);
  });

  return (
    <div className="audio-ls">
      <div className="audio-ls-header m-10">
        <img
          className="mtb-10"
          src={backIcon}
          alt=""
          onClick={onClickBackButton}
        />
        <SearchInput
          searchParam={searchParams.get("filter" || "")}
          setSearchParams={setSearchParams}
        ></SearchInput>
        {type === "uploaded" ? (
          <div className="uploadWrapper m-10" onClick={uploadAudio}>
            +
          </div>
        ) : (
          ""
        )}
      </div>

      <ul className="song-list">
        {currentAudioList.length ? (
          currentAudioList
            .filter((item) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let songName = item.title.toLowerCase();
              return songName.startsWith(filter.toLowerCase());
            })
            .map((item, index) => (
              <li
                className="audio-ls-container flex"
                onClick={() => {
                  onTrackSelect(index);
                  console.log(index);
                }}
              >
                <div className="audio-img mtb-10 align-center">
                  <img src={`${baseUrl}/${item.avatar}`} alt="" />
                </div>
                <div className="audio-info">
                  <p>{item.title}</p>
                  <p>{item.artist}</p>
                </div>
              </li>
            ))
        ) : (
          <div style={{ textAlign: "center" }}>No audio avaiable</div>
        )}
      </ul>
    </div>
  );
};

export default AudioList;
