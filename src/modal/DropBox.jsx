import React from "react";
import { useState } from "react";
import styled from "styled-components";

const DropBox = () => {
  const [Open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const selectMenu = () => setOpen(!Open);
  const options = [
    "서울시",
    "인천시",
    "세종시",
    "부산시",
    "대구시",
    "대전시",
    "광주시",
    "경기도",
    "강원도",
    "제주도",
  ];

  const options2 = ["강남구", "강동구", "강북구"];

  const onOptionClicked = (value) => {
    setSelectedOption(value);
    setOpen(false);
  };

  return (
    <>
      <StDropDownContainer>
        <StDropDownHeader onClick={selectMenu}>
          {selectedOption || "지역(시/도)"}
        </StDropDownHeader>
        {Open && (
          <StDropDownListContainer>
            <StDropDownList>
              {options.map((option, i) => (
                <StListItem
                  key={`options_${i}`}
                  onClick={() => onOptionClicked(option)}
                >
                  {option}
                </StListItem>
              ))}
            </StDropDownList>
          </StDropDownListContainer>
        )}
      </StDropDownContainer>
      <button>지역선택</button>
    </>
  );
};

export default DropBox;

const StDropDownContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const StDropDownHeader = styled.div`
  margin-bottom: 5px;
  padding: 4px 1px 4px 1px;
  font-weight: 500;
  font-size: 20px;
  color: #34495e;
  border-radius: 3px;
  border: 2px solid #34495e;
  cursor: pointer;
`;

const StDropDownListContainer = styled.div`
  width: 300px;
  text-align: center;
`;

const StDropDownList = styled.div`
  padding: 10px 0 0 0;
  background: #ffffff;
  border: 2px solid gray;
  border-radius: 15px;
  box-sizing: border-box;
  color: #34495e;
  font-size: 20px;
  font-weight: 500;
`;

const StListItem = styled.div`
  margin: 8px;
  cursor: pointer;
`;
