import React, { useState } from "react";
import { baseUrl } from "../../../config";
import "./style.css";

const Tabs = ({ tabData, onItemSelected }) => {
  const [active, setActive] = useState("popular");
  // console.log({tabData})
  return (
    <div className="tab-container">
      <div className="tab-header flex ">
        {tabData &&
          Object.keys(tabData).map((tab, index) => (
            <a
              key={tab}
              className={active === tab ? "active" : ""}
              onClick={() => {
                setActive(tab);
              }}
              href={"#" + tab}
            >
              {tabData[tab].label}
            </a>
          ))}
      </div>

      {tabData &&
        Object.keys(tabData).map((tab, index) => (
          <div className="tab-content">
            <div
              className={`tab-content ${active === tab ? "active" : ""} `}
              id={tab}
            >
              <div className="content-wrapper flex justify-sb m-10">
                {tabData[tab].items.map((item, index) => (
                  <div
                    onClick={() => onItemSelected(tab, item.key)}
                    key={index}
                    className="content-item m-10"
                  >
                    <div className="d-visilibity z-0"></div>
                    <img
                      src={`${baseUrl}/${tab}/${item.key}/${item.key}.jpg`}
                      alt=""
                    ></img>
                    <div className="content-label flex justify-center align-center">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabs;
