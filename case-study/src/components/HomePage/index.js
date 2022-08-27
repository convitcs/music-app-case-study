import Header from "./Header";
import Tabs from "./Tabs";
import AudioList from "./AudioList";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config";
import Footer from "./Footer";

function HomePage() {
  const [type, setType] = useState();
  const [list, setList] = useState(false);
  const [appData, setAppData] = useState({});
  const [audioList, setAudioList] = useState();
  const [historyList, setHistoryList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(-1);
  const onClickBackButton = () => {
    setList(false);
  };

  const onTrackSelect = (index) => {
    console.log("cho nay ne:" + index);
    setTrackIndex(index);
    console.log({ trackIndex });
    console.log(audioList);
    let list = historyList;
    if (type !== "justlisten") {
      let list2 = list.splice(historyList.length, 0, audioList[index]);
    }
    console.log("type ne ba" + type);
    console.log({ historyList });
  };
  const onItemSelected = (tab, type) => {
    if (tab in appData) {
      if (type in appData[tab]) {
        const audioList = appData[tab][type];
        setAudioList(audioList);
        console.log("type ben home ne:" + type);
        setType(type);
      } else {
        setAudioList([]);
        setType(type);
      }
    } else {
      setAudioList([]);
      setType(type);
    }

    setList(true);
  };

  useEffect(() => {
    fetch(`${baseUrl}/song`)
      .then((res) => res.json())
      .then((jsonResp) => {
        setAppData(jsonResp.appData);
      })
      .catch((error) => console.log("loi ne ba:" + error));
  }, []);
  console.log({ appData });
  console.log({ historyList });
  return (
    <div>
      <div className="App m-20">
        <Header></Header>
        {/* <SearchInput></SearchInput> */}
        <Tabs
          onItemSelected={onItemSelected}
          tabData={appData.homeScreen}
        ></Tabs>
        {list ? (
          <AudioList
            type={type}
            audioList={audioList}
            onClickBackButton={onClickBackButton}
            onTrackSelect={onTrackSelect}
            historyList={historyList}
            setHistoryList={setAudioList}
          ></AudioList>
        ) : (
          ""
        )}
        <Footer trackIndex={trackIndex} audioList={audioList}></Footer>
      </div>
    </div>
  );
}

export default HomePage;
