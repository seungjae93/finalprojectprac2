import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { throttle } from "lodash";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import TotalModal from "../components/MapModal/TotalModal";
import SubModal from "../components/MapModal/SubModal";

const { kakao } = window;

// 주소 입력후 검색 클릭 시 원하는 주소로 이동
const MainMap = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.450705, lng: 126.570677 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [map, setMap] = useState(); //지도
  const [pos, setPos] = useState(); //경도 위도
  const [_level, _setLevel] = useState(); //지도 줌레벨

  // const handleMapInfo = () => {
  //   {
  //     map &&
  //       setPos({
  //         center: {
  //           lat: map.getCenter().getLat(),
  //           lng: map.getCenter().getLng(),
  //         },
  //         swLatLng: {
  //           lat: map.getBounds().getSouthWest().getLat(),
  //           lng: map.getBounds().getSouthWest().getLng(),
  //         },
  //         neLatLng: {
  //           lat: map.getBounds().getNorthEast().getLat(),
  //           lng: map.getBounds().getNorthEast().getLng(),
  //         },
  //       });
  //   }
  // };

  const positions = [
    {
      title: "카카오",
      latlng: { lat: 33.450705, lng: 126.570677 },
    },
    {
      title: "생태연못",
      latlng: { lat: 33.450936, lng: 126.569477 },
    },
    {
      title: "텃밭",
      latlng: { lat: 33.450879, lng: 126.56994 },
    },
    {
      title: "근린공원",
      latlng: { lat: 33.451393, lng: 126.570738 },
    },
  ];

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const onAddressHandler = throttle(async (e) => {
    const { value } = e.target;
    setSearchAddress(value);
    try {
      const response = await axios.get(
        `https://spart-instagram.shop/search/${value}`,
        {
          search: value,
        }
      );
      console.log("response.data", response.data);
      const { data } = response.data;
      searchData(data);
      console.log("searchData!!!!!!!!", searchData);
    } catch (error) {}
  }, 500);

  //장소 검색 객체 생성
  const ps = new kakao.maps.services.Places();

  //장소검색이 완료됐을 때 호출되는 콜백함수
  const placesSearchCB = function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
      const newSearch = data[0];
      setState({
        center: { lat: newSearch.y, lng: newSearch.x },
      });
    }
  };

  //검색시 리렌더링 줄이기
  const onSearchHandler = useCallback(async () => {
    //키워드로 장소를 검색
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    try {
      await axios.post(`https://spart-instagram.shop/search`, {
        text: `${searchAddress}`,
      });
    } catch (error) {}
    setSearchAddress("");
  }, [searchAddress]);

  // useEffect(() => {
  //   handleMapInfo();
  //   console.log(pos);
  // }, [map, state, pos]);
  console.log(pos);

  const onPosHandler = async () => {
    try {
      await axios.post(`https://spart-instagram.shop/map`, {
        swLatLng: {
          lat: map.getBounds().getSouthWest().getLat(),
          lng: map.getBounds().getSouthWest().getLng(),
        },
        neLatLng: {
          lat: map.getBounds().getNorthEast().getLat(),
          lng: map.getBounds().getNorthEast().getLng(),
        },
      });
      console.log("들어갔니???????");
    } catch (error) {
      console.log("post에러를 잡았어", error);
    }
  };

  return (
    <>
      {modalOpen && <TotalModal modalHandler={modalHandler} />}
      {modalOpen && <SubModal modalHandler={modalHandler} />}
      <StContainer>
        <SearchContainer>
          <StSearch
            type="text"
            onChange={onAddressHandler}
            value={searchAddress}
          />
          {searchAddress && (
            <AutoSearchContainer>
              <AutoSearchWrap>
                <AutoSearchData></AutoSearchData>
              </AutoSearchWrap>
            </AutoSearchContainer>
          )}
          <button onClick={onSearchHandler}>검색</button>
          <button
            onClick={() => {
              navigate("/review");
            }}
          >
            리뷰
          </button>
        </SearchContainer>
        <StMapContainer>
          <Map // 지도를 표시할 Container
            center={{
              // 지도의 중심좌표
              lat: state.center.lat,
              lng: state.center.lng,
            }}
            isPanto={state.isPanto}
            style={{
              // 지도의 크기
              width: "100%",
              height: "100%",
            }}
            level={3} // 지도의 확대 레벨
            onDragEnd={(map) => {
              setPos({
                center: {
                  lat: map.getCenter().getLat(),
                  lng: map.getCenter().getLng(),
                },
                swLatLng: {
                  lat: map.getBounds().getSouthWest().getLat(),
                  lng: map.getBounds().getSouthWest().getLng(),
                },
                neLatLng: {
                  lat: map.getBounds().getNorthEast().getLat(),
                  lng: map.getBounds().getNorthEast().getLng(),
                },
              });
              onPosHandler();
            }}
          >
            {positions.map((position) => {
              return (
                <MapMarker
                  key={`${position.title}-${position.latlng}`}
                  position={position.latlng}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                    size: {
                      width: 24,
                      height: 35,
                    }, // 마커이미지의 크기입니다
                  }}
                  title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  onClick={modalHandler}
                />
              );
            })}
          </Map>
        </StMapContainer>
      </StContainer>
    </>
  );
};
export default MainMap;

const StContainer = styled.div`
  max-width: 1920px;
  min-width: 680px;
  height: 855px;
`;
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
`;
const StSearch = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 20%;
  height: 70%;
  outline: 1px;
`;
const AutoSearchContainer = styled.div`
  z-index: 3;
  width: 23%;
  height: 20vh;
  background-color: #fff;
  position: absolute;
  top: 45px;
`;
const AutoSearchWrap = styled.ul`
  list-style: none;
`;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  margin: auto;
  width: 90%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  position: relative;
`;
const StMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
