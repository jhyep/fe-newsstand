## 📰 뉴스스탠드 구현 과제 - 2주차

## 🖥 화면

#### 1. 최신 뉴스 자동 롤링 영역

#### 2. 전체 언론사: 그리드 보기

#### 3. 전체 언론사: 리스트 보기

## 디렉토리 구조

```
fe-newsstand
├─ assets
│  ├─ dark
│  ├─ light
│  └─ others
├─ data
│  └─ newsContents.js
├─ icons
│  ├─ .DS_Store
│  ├─ darkmode_logo
│  ├─ others
│  └─ press_logo
├─ main-style.css
├─ main.html
├─ app.js
└─ src
   ├─ bringDate.js
   ├─ changeView.js
   ├─ initialDisplay.js
   ├─ listNews.js
   ├─ progressBar.js
   ├─ randomGrid.js
   └─ rollingBanner.js

```

## CSS 고려사항

- 재사용성을 위해 자주 사용되는 폰트 속성을 묶어서 사용하였습니다.

```
.font-init {
  color: var(--text-text-default, #5f6e76);
  font-family: Pretendard;
  font-style: normal;
}

.bold-font-init {
  color: var(--text-text-strong, #14212b);
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
```

- 프로그레스바는 keyframe 애니메이션을 사용하여 구현하였습니다.

```.progress-bar {
  background: var(--progress-before);
  display: flex;
  width: 166px;
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
  color: white !important;
  position: relative;
  z-index: 2;
}

.progress-bar:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 0;
  background: var(--progress-after);
  animation: progress 20s linear;
  z-index: -1;
}

@keyframes progress {
  0% {
    width: 0px;
  }
  100% {
    width: 100%;
  }
}

```

- 롤링 모션을 위해 transition을 사용하였습니다.
  (./src/rollingBanner.js에서 추가적인 구현 진행하였음)

```
.rollingbanner li.prev {
  top: 17px;
  transition: top 0.5s linear;
}
```

## JAVASCRIPT 고려사항

- 날짜를 가져올 때 0을 더해주는 함수를 추가하였습니다.

```
function addZero(date) {
  if (date < 10) {
    const zeroDate = ("00" + date).slice(-2);
    return zeroDate;
  }
  return date;
}
```

- 무한 롤링 구현 시 prev, current, next와 같은 클래스를 제거하고, 더해주는 방식으로 구현하였습니다.

## 어려웠던 점 / 고민했던 점

- 무한 롤링 구현시 두가지 배너 사이에 1초 간격을 만들어내야했는데, setTimeout과 setInterval을 적절히 사용하여 구현하는 것이 어려웠습니다.

- 프로그레스바 구현 시 처음에만 바가 다 채워지지 않고 돌아가는 현상이 발생되어 원인을 찾는 것이 쉽지 않았습니다.

  - 초기 화면이 그리드뷰이기 때문에 그 동안에 interval의 시간이 지나가고 있어 해당 현상이 벌어졌던 것이었습니다. 이는 간단히 리스트뷰로 바꾸었을 때 프로그레스바를 작동시키는 방식으로 해결하였습니다.

- ESM을 처음 적용해보았는데, import/export를 쓰는 것이 생소했지만 외부에서 어떤 변수나 클래스, 함수를 사용할지 명시적으로 알려줄 수 있기 때문에 의존성 관리가 된다는 큰 장점이 있어 좋았습니다.

## 그룹 활동에서 배운 점

- 피어세션과 스쿼드세션을 거치며 설계의 중요성을 깨달았습니다. 좋은 설계로 인해 개발에 걸리는 시간이 크게 줄어들기도 하고, 기능 구현과 리팩토링을 쉽고 빠르게 할 수 있다는 것을 알게되었습니다.

## 아쉬운 점 / 개선할 점

- 기능 구현에 급급해서 설계를 꼼꼼히 하지 못했습니다. 이로 인해서 기능 구현을 할 때 더 많은 시간이 걸렸으며, 앞으로 리팩토링에 더 많은 시간을 투자해야할 것으로 예상됩니다.

- 스크립트 파일과 css도 더 세분화하여 나눌 수 있었으나 시간 부족으로 인해 해당 부분까지는 진행하지 못하였습니다.
