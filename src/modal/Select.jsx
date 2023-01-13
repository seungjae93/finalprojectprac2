import React from "react";
import { useState } from "react";
import { hangjungdong } from "./hangjungdong";

export default function Select() {
  const [selected, setSelected] = useState({});

  const { state, city } = hangjungdong;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  return (
    <div>
      <select name="state" onChange={handleChange}>
        <option value="">시,도 선택</option>
        {state.map((el) => (
          <option key={el.state} value={el.state}>
            {el.codeNm}
          </option>
        ))}
      </select>
      <select name="city" onChange={handleChange}>
        <option value="">구,군 선택</option>
        {city
          .filter((el) => el.state === selected.state)
          .map((el) => (
            <option key={el.city} value={el.codeNm}>
              {el.codeNm}
            </option>
          ))}
      </select>
    </div>
  );
}
