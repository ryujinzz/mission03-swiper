/* global gsap*/
import {
  tiger,
  getNode as $,
  renderUserCard,
  renderEmptyCard,
  clearContents,
} from "./lib/index.js";

const END_POINT = "http://localhost:3000/test";
//phase - 1

const userCardInner = $(".swiper-wrapper");
//1. user 데이터를 fetch하기
//2. 함수 안에 넣기
async function renderUserList() {
  try {
    const response = await tiger.get(END_POINT);
    const userData = response.data;
    userData.forEach(
      (data) => renderUserCard(userCardInner, data)
      //3. 유저 테이터 (이름만) 화면에 렌더링
    );
  } catch (err) {
    renderEmptyCard(userCardInner);
  }
}

renderUserList();

function handleDelete(e) {
  //이벤트 위임
  const button = e.target.closest("button");
  //버튼만 수집
  const article = e.target.closest("article");
  //아티클만 수집
  if (!article || !button) return;
  const id = article.dataset.index.slice(5);
  tiger.delete(`${END_POINT}/${id}`).then(() => {
    clearContents(userCardInner);
    renderUserList();
  });
}

userCardInner.addEventListener("click", handleDelete);

const createButton = $(".create");
const cancelButton = $(".cancel");
const doneButton = $(".done");

function handleCreate() {
  gsap.to(".pop", { autoAlpha: 1 });
}

function handleCancel(e) {
  e.stopPropagation();
  gsap.to(".pop", { autoAlpha: 0 });
}

function handleDone(e) {
  e.preventDefault();

  const name = $("#nameField").value;
  const email = $("#emailField").value;

  const obj = {
    name,
    email,
  };

  tiger.post(END_POINT, obj).then(() => {
    clearContents(userCardInner);
    renderUserList();
    gsap.to(".pop", { autoAlpha: 0 });
  });
}

createButton.addEventListener("click", handleCreate);
cancelButton.addEventListener("click", handleCancel);
doneButton.addEventListener("click", handleDone);
