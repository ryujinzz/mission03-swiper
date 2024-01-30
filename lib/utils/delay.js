import { getNode } from "../dom/getNode.js";
import { insertLast } from "../dom/insert.js";
import { isNumber, isObject } from "./typeOf.js";
import { xhrPromise } from "./xhr.js";

function delay(callback, timeout = 1000) {
  setTimeout(callback, timeout);
}

const first = getNode(".first");
const second = getNode(".second");

// delay(() => {
//   first.style.top = "-100px";

//   delay(() => {
//     first.style.transform = "rotate(360deg)";
//     delay(() => {
//       first.style.top = "0px";
//     });
//   });
// });

//Promise API

const defaultOptions = {
  shouldReject: false,
  timeout: 1000,
  data: "success",
  errorMessage: "알 수 없는 오류 발생",
};
export function delayP(options) {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    config.timeout = options;
  }
  if (isObject(options)) {
    config = { ...defaultOptions, ...options };
  }
  const { shouldReject, timeout, data, errorMessage } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldReject) {
        resolve("아싸 성공");
      } else {
        reject("실패");
      }
    }, timeout);
  });
}

delayP(true)
  .then((res) => {
    // console.log(res);
  })
  .catch((err) => {
    // console.log(err);
  });

// console.log(delayP(false));
//promise object

// async - 함수가 promise 객체를 반환 하도록
//       - await 사용 -> promise 객체

// await - 코드의 실행 흐름 제어 (멈춤)
//       - result값 가져오기

async function delayA(data) {
  return data;
}

const value = delayA("이슬기나");

// console.log(value);

// value.then((res)=>{
//   console.log(res);
// })

// console.log(await value);

async function getData() {
  const data = await xhrPromise.get("https://pokeapi.co/api/v2/pokemon/3");
  // console.log(data);
  insertLast(
    document.body,
    `<img src="${data.sprites["front_default"]}" alt="독침붕" />`
  );
}

// getData();
