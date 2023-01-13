import React from "react";
import { useQuery } from "react-query";
import { getPosts } from "../Review/postsApi";

const Mypage = () => {
  const { data } = useQuery("reviews", getPosts);

  const deleteHandler = () => {};

  const updateHandler = () => {};

  return (
    <>
      {data &&
        data.map((reviews) => {
          return (
            <>
              <div key={reviews.id}>
                <div>{reviews.address_jibun}</div>
                <div>{reviews.star}</div>
              </div>
            </>
          );
        })}

      <h1>My Page</h1>
      <div>건물명: ?건물명 표시는 어려울 듯</div>
      <div>주소:</div>
      <div>별점:</div>

      <button onClick={updateHandler}>수정</button>
      <button onClick={deleteHandler}>삭제</button>

      <div>-- 내가 쓴 게시글이 보여질 부분 --</div>
    </>
  );
};

export default Mypage;
