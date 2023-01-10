import React from "react";
import DaumPostcode from "react-daum-postcode";
const PostCode = ({ setAddress }) => {
  const handle = {
    selectAddress: (data) => {
      setAddress(data.address);
    },
  };
  const postCodeStyle = {
    width: "400px",
    height: "300px",
  };
  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
      />
    </div>
  );
};
export default PostCode;
