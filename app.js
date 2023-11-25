let isClosed = true;
let previous = "";
function dismissTrialCallout(id, toShow = false) {
  let toClose = document.getElementById(id);
  let opacity = toShow ? 0 : 1;
  let intervalId = setInterval(function () {
    if (toShow) {
      opacity += 0.04;
    } else {
      opacity -= 0.04;
    }
    toClose.style.opacity = opacity;
    if (toShow) {
      if (opacity >= 1) {
        toClose.style.display = "flex";
        clearInterval(intervalId);
      }
    } else {
      if (opacity <= 0) {
        toClose.style.display = "none";
        clearInterval(intervalId);
      }
    }
  }, 15);
}
function showContent() {
  dismissTrialCallout("list", isClosed);
  toggleArrow();
}
function toggleArrow() {
  const arrowUp =
    "M15.0303 12.2803C14.7374 12.5732 14.2626 12.5732 13.9697 12.2803L10.5 8.81066L7.03033 12.2803C6.73744 12.5732 6.26256 12.5732 5.96967 12.2803C5.67678 11.9874 5.67678 11.5126 5.96967 11.2197L9.96967 7.21967C10.2626 6.92678 10.7374 6.92678 11.0303 7.21967L15.0303 11.2197C15.3232 11.5126 15.3232 11.9874 15.0303 12.2803Z";
  const arrowDown =
    "M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197 8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197 13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z";
  const arrow = document.getElementById("arrow");
  if (isClosed) {
    arrow.setAttribute("d", arrowUp);
    isClosed = false;
  } else {
    arrow.setAttribute("d", arrowDown);
    isClosed = true;
  }
}

document.querySelectorAll("div.li-style").forEach((element) => {
  element.querySelector("button.heading").addEventListener("click", () => {
    closeOthers();
    element.classList.add("ashBg");
    element.querySelector("div.img-box").classList.toggle("closed");
    element.querySelector("div.img-box").classList.toggle("flex");
  });
});

function closeOthers() {
  document.querySelectorAll("div.li-style").forEach((element) => {
    if (!element.querySelector("div.img-box").classList.contains("closed")) {
      element.querySelector("div.img-box").classList.add("closed");
      element.querySelector("div.img-box").classList.remove("flex");
      element.classList.remove("ashBg");
    }
  });
}
document.querySelectorAll("button.svgDiv").forEach((element, index) => {
  let indexx = "";
  let count = 0;
  element.addEventListener("click", () => {
    indexx = index;
    element.querySelectorAll("svg").forEach((elem) => {
      console.log(elem);
      if (elem.classList.contains("hide")) {
        elem.classList.remove("hide");
      } else {
        if (
          elem.classList.contains("checked") &&
          !elem.classList.contains("hide")
        ) {
          console.log("yes");
          elem.classList.add("hide");
          elem.closest("div.li-style").classList.remove("alreadyChecked");
          calcCompleted();
          return;
        }
        elem.classList.add("hide");
        const parent = element.closest("div.li-style");
        parent.classList.add("alreadyChecked");
        const allElements = document.querySelectorAll("div.li-style");
        const elementsArr = Array.from(allElements);
        elementsArr.forEach((element) => {
          if (!element.classList.contains("alreadyChecked")) {
            count++;
          }
        });
        for (let i = index; i < elementsArr.length; i++) {
          //   console.log(count);
          if (
            count > 1 &&
            indexx !== elementsArr.length - 1 &&
            !elementsArr[i].classList.contains("alreadyChecked")
          ) {
            {
              console.log("working");
              elementsArr[i].querySelector("button.heading").click();
            }
            break;
          } else if (count > 1 && indexx == elementsArr.length - 1) {
            indexx = 0;
            i = -1;
            console.log("gretaer than indexx");
          } else if (
            count == 1 &&
            elementsArr[i].classList.contains("alreadyChecked") &&
            indexx !== elementsArr.length - 1
          ) {
            elementsArr.forEach((element) => {
              if (!element.classList.contains("alreadyChecked")) {
                element.querySelector("button.heading").click();
              }
            });
          } else if (count == 1) {
            let indx = elementsArr.findIndex(
              (element) => !element.classList.contains("alreadyChecked")
            );
            elementsArr[indx].querySelector("button.heading").click();
          } else if (count === 0) {
            closeOthers();
          }
        }
      }
    });
    calcCompleted();
  });
});
function calcCompleted() {
  let clicked = 0;
  document.querySelectorAll("div.li-style").forEach((div) => {
    if (div.classList.contains("alreadyChecked")) {
      clicked++;
    }
  });
  document.getElementById("comp").innerHTML = `${clicked}/5 completed`;
  document.getElementById("progress").setAttribute("value", `${clicked * 20}`);
}

function popUpp(query) {
  if (previous && previous == query) {
    if (document.querySelector(query).classList.contains("closed")) {
      document.querySelector(query).classList.replace("closed", "flex");
    } else {
      document.querySelector(query).classList.replace("flex", "closed");
    }
  } else if (
    previous &&
    previous !== query &&
    !document.querySelector(previous).classList.contains("closed")
  ) {
    document.querySelector(previous).classList.replace("flex", "closed");
    previous = query;
    popUpp(query);
  } else {
    previous = query;
    popUpp(query);
  }
}
