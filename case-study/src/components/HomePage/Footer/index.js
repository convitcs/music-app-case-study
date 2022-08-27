import React, { useEffect, useRef, useState } from "react";
import {
  closeIcon,
  homeIcon,
  nextIcon,
  pauseGreyIcon,
  playBlackIcon,
  playGreyIcon,
  prevIcon,
  userIcon,
} from "../../../assets";
import { baseUrl } from "../../../config";
import BigPlayer from "./BigPlayer";
import "./style.css";

const Footer = ({ trackIndex, audioList }) => {
  const [slideUp, setSlideUp] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(trackIndex);
  const [trackProgress, setTrackProgress] = useState("");
  const { artist, audioFile, avatar, title } =
    currentTrackIndex === -1 ? {} : audioList[currentTrackIndex];
  // console.log(artist||"")
  const audioSrc = `${baseUrl}/${audioFile}`;
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  };

  const [isPlaying, setIsPlaying] = useState("false");
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    audioRef.current.play();
    setIsPlaying(true);
    startTimer();
  }, [currentTrackIndex]);
  // console.log({audioRef})

  useEffect(() =>{
    setCurrentTrackIndex(trackIndex)
  },[trackIndex])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    // console.log("moi bam cai kia phai hong" + isPlaying);
  }, [isPlaying]);

  // console.log("src ne:"+audioSrc)
  // console.log({ trackProgress });

  const onChangeTrackProgress = (event) => {
    // console.log({event})
    setTrackProgress(event.target.value);
    audioRef.current.currentTime = event.target.value;
  };

  const nextTrack = () => {
    // console.log('co bam next roi ne')
    if (currentTrackIndex == audioList.length-1){return setCurrentTrackIndex(0);console.log("dong nay hien ra la bai cuoi")}
    setCurrentTrackIndex(currentTrackIndex+1)
  }

  const previousTrack = () => {
    if (currentTrackIndex == 0){return setCurrentTrackIndex(audioList.length-1);console.log("dong nay hien ra la bai cuoi")}
    setCurrentTrackIndex(currentTrackIndex-1)

  }
  return (
    <div className={`footer ${currentTrackIndex !== -1 ? "choosed" : ""} ${slideUp ? "active" : ""} `}>
      <div
        className="slide-up-button align-center"
        onClick={() => {if (currentTrackIndex === -1){}
                    else setSlideUp(!slideUp)}}
      ></div>

      {slideUp && (
        <BigPlayer
          artist={artist}
          title={title}
          avatar={avatar}
          duration={audioRef.current.duration}
          trackProgress={trackProgress}
          onChangeTrackProgress={onChangeTrackProgress}
          playPause={() => setIsPlaying(!isPlaying)}
          isPlaying={isPlaying}
          nextTrack={nextTrack}
          previousTrack={previousTrack}
        ></BigPlayer>
      )}

      {!slideUp && (
        <>
          {/* {console.log({ trackIndex })} */}
          <div className="mini-player flex justify-sb">
          {currentTrackIndex !== -1 && (
            <>
              <div className="flex align-center">
                <div className="cover-img">
                  <img src={`${baseUrl}/${avatar}`} alt="" className="avatar" />
                </div>
                <div className="mini-player-info mlr-5">
                  <p>{title} </p>
                  <p>{artist}</p>
                </div>
              </div>
              <div className="control-button flex">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {!isPlaying ? (
                    <img src={pauseGreyIcon} alt=""></img>
                  ) : (
                    <img src={playGreyIcon} alt=""></img>
                  )}
                </button>
                <button
                  onClick={() => {
                    // audioRef.current.pause();
                    setCurrentTrackIndex(-1)
                  }}
                >
                  <img src={closeIcon}></img>
                </button>
              </div>
            </>
          )}
          </div>

          {/* <div className="navigation-menu flex justify-evenly">
            <a>
              <img src={homeIcon}></img>
              <p>Home</p>
            </a>
            <a>
              <img src={userIcon}></img>
              <p>User</p>
            </a>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Footer;
