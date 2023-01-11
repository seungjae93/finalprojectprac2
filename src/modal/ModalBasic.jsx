import styled from "styled-components";

import DropBox from "./DropBox";

function ModalBasic({ setModalOpen }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalBackdrop>
      <StContainer>
        <StCloseBut onClick={closeModal}>X</StCloseBut>
        <DropBox />
      </StContainer>
    </ModalBackdrop>
  );
}
export default ModalBasic;

const ModalBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const StContainer = styled.div`
  width: 500px;
  height: 400px;
  /* 최상단 위치 */
  z-index: 10;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
`;

const StCloseBut = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;
