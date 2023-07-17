import { categoryList } from "../data/NewsContents.js";
import { drawListView } from "./listNews.js";
import { countDisplayNone } from "./initialDisplay.js";

const CATEGORY_NUM = 7;
const PROGRESS_TIME = 2000;
let current_category = 0;
let up_count = 1;
let total_count = 0;
let progress_interval;

//html에 카운트+탭 넘버 추가
function appendCategoryTabNum() {
  for (let i = 0; i < CATEGORY_NUM; i++) {
    const tab = document.querySelectorAll(".progress-item .count");
    const tab_num = `<span class="now-count">${up_count}</span> <span>/</span> <span>${categoryList[i].tabs}`;
    tab[i].innerHTML = tab_num;
  }
}

function checkTotalCount() {
  total_count = parseInt(
    document.querySelectorAll(".progress-bar span")[2].innerHTML
  );
}

function putUpCountToNowCount() {
  document.querySelector(".progress-bar .now-count").innerHTML =
    up_count.toString();
}

//카운트 올릴 시 프로그레스바 다시 차오르게 해주는 함수
function reloadProgressAnimation() {
  const currentCategory = document.querySelector(".progress-bar");
  currentCategory.classList.remove("progress-bar");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("progress-bar");
}

//마지막 카테고리인지 아닌지 판별
function isLastCategory() {
  return current_category === CATEGORY_NUM - 1;
}

function isNotLastCategory() {
  return current_category < CATEGORY_NUM - 1 && current_category >= 0;
}

/***** 카운트 올리고, total_count에 도달하면 다음 카테고리로 넘어가는 함수 *****/
function countUpInSameCategory() {
  document.querySelector(".progress-bar .now-count").innerHTML =
    up_count.toString();
  reloadProgressAnimation();
  drawListView(current_category, up_count - 1);
  up_count++;
}

function countUp() {
  checkTotalCount();
  if (up_count > total_count) {
    document.querySelector(".progress-bar .now-count").innerHTML = "1";
    if (current_category === CATEGORY_NUM - 1) {
      changeCategory(current_category, 0);
      drawListView(0, 0);
      up_count = 1;
      current_category = 0;
    } else if (isNotLastCategory) {
      changeCategory(current_category, current_category + 1);
      drawListView(current_category + 1, 0);
      up_count = 2;
      current_category++;
    }
  } else {
    if (current_category === 0 && up_count === 1) {
      up_count = 2;
    }
    countUpInSameCategory();
  }
}

function countUpInterval() {
  return window.setInterval(() => countUp(), PROGRESS_TIME);
}

function runProgress() {
  progress_interval = countUpInterval();
}

function clearProgress() {
  clearInterval(progress_interval);
}

/***** 프로그레스바 카테고리 이동 함수 *****/
function changeCategory(idx_1, idx_2) {
  document
    .getElementsByClassName("progress-item")
    [idx_1].classList.remove("progress-bar");
  document.getElementsByClassName("count")[idx_1].style.display = "none";

  document
    .getElementsByClassName("progress-item")
    [idx_2].classList.add("progress-bar");
  document.getElementsByClassName("count")[idx_2].style.display = "block";
}

/***** 프로그레스바 카테고리 누르면 이동 *****/
const categories = document.querySelectorAll(".progress-item");
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", () => {
    countDisplayNone();
    const counts = document.querySelectorAll(".count");
    counts[i].style.display = "block";
    clearProgress();
    document.querySelector(".progress-bar .now-count").innerHTML = "1";
    document.querySelector(".progress-bar").classList.remove("progress-bar");
    categories[i].classList.add("progress-bar");
    current_category = i;
    up_count = 2;
    runProgress();
    drawListView(i, 0);
  });
}

/***** list 넘기는 화살표 관련 함수 *****/
/* 다음으로 넘기기 */
const list_next = document.getElementById("list-next");
list_next.addEventListener("click", () => {
  up_count = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  checkTotalCount();
  up_count++;
  if (up_count <= total_count) {
    clearProgress();
    putUpCountToNowCount();
    reloadProgressAnimation();
    up_count++;
    runProgress();
    drawListView(current_category, up_count - 2);
  } else {
    up_count = 1;
    clearProgress();
    putUpCountToNowCount();
    reloadProgressAnimation();
    if (current_category === CATEGORY_NUM - 1) {
      changeCategory(current_category, 0);
      drawListView(0, 0);
      current_category = 0;
    } else if (isNotLastCategory) {
      changeCategory(current_category, current_category + 1);
      drawListView(current_category + 1, 0);
      current_category++;
    }
    runProgress();
  }
});

/* 앞으로 넘기기 */
const list_prev = document.getElementById("list-prev");
list_prev.addEventListener("click", () => {
  up_count = parseInt(
    document.querySelector(".progress-bar .now-count").innerHTML
  );
  up_count--;
  if (up_count >= 1) {
    clearProgress();
    putUpCountToNowCount();
    reloadProgressAnimation();
    drawListView(current_category, up_count - 1);
  } else if (up_count === 0) {
    clearProgress();
    reloadProgressAnimation();
    if (current_category > 0) {
      changeCategory(current_category, current_category - 1);
      current_category--;
    } else if (current_category === 0) {
      changeCategory(current_category, CATEGORY_NUM - 1);
      current_category = CATEGORY_NUM - 1;
    }
    up_count = categoryList[current_category].tabs;
    putUpCountToNowCount();
    checkTotalCount();
    drawListView(current_category, total_count - 1);
  }
  up_count++;
  runProgress();
});

function initializeProgress() {
  current_category = 0;
  up_count = 2;
  document.querySelector(".now-count").innerHTML = "1";
  document.getElementsByClassName("count")[0].style.display = "block";
}

export {
  runProgress,
  clearProgress,
  initializeProgress,
  reloadProgressAnimation,
  appendCategoryTabNum,
  CATEGORY_NUM,
};
