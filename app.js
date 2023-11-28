let isClosed = true;
let previous = "";
let previousId = "";

// ARRAY OF ACCORDION CONTENT
const detailsArray = [
  {
    title: "Customize your Online Store",
    text: "Choose a theme and add your logo, colors, and images to reflect your brand.",
    btn1: "Cutomize theme",
    img: "https://crushingit.tech/hackathon-assets/customise-store.png",
  },
  {
    title: " Add your First Product",
    text: "Write a description, add photos, and set pricing for the products you plan to sell.",
    btn1: "Add Product",
    btn2: "Import Product",
    img: "https://crushingit.tech/hackathon-assets/product.png",
  },
  {
    title: " Add a Custom Domain",
    text: "Your current domain is 222219.myshopify.com but you can add a custom domain to help customers find your online store.",
    btn1: "Add Domain",
    img: "https://crushingit.tech/hackathon-assets/website.png",
  },
  {
    title: " Name your store",
    text: " Your temporary store name is currently Davii collections. The store name appears in your admin and your online store.",
    btn1: "Name Store",
    img: "https://crushingit.tech/hackathon-assets/name-store.png",
  },
  {
    title: "Set up a payment Provider",
    text: "Choose a payment provider to start accepting payments. You’ll need to create an account with the payment provider and set it up with your Shopify store.",
    btn1: "Set up Payment",
    img: "https://crushingit.tech/hackathon-assets/payment.png",
  },
];

// RECEIVES PARAMETER TO HOW OR HIDE AN ELEMENT,RECEIVES THE ID OF THE ELEMENT TO SHOW OR HIDE AND A BOOLEAN WHETHER TO SHOW(TRUE) OR HIDE(FALSE)
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

// FUNCTION TO SHOW OR HIDE ACCORDION
function showContent() {
  const button = document.getElementById("toggle-content");
  const list = document.getElementById("list");
  dismissTrialCallout("list", isClosed);
  toggleArrow();
  if (button.getAttribute("aria-expanded") === "false") {
    button.setAttribute("aria-expanded", true);
    list.setAttribute("aria-hidden", false);
  } else {
    button.setAttribute("aria-expanded", false);
    list.setAttribute("aria-hidden", true);
  }
}

// TOGGLE DROPDOWN FUNCTION TO CHANGE SVG BEING DISPLAYED BASED ON THE STATE OF THE ACCORDION
function toggleArrow() {
  const getSvg = document.getElementById("toggle-content").querySelector("svg");
  const arrowUp =
    "M15.0303 12.2803C14.7374 12.5732 14.2626 12.5732 13.9697 12.2803L10.5 8.81066L7.03033 12.2803C6.73744 12.5732 6.26256 12.5732 5.96967 12.2803C5.67678 11.9874 5.67678 11.5126 5.96967 11.2197L9.96967 7.21967C10.2626 6.92678 10.7374 6.92678 11.0303 7.21967L15.0303 11.2197C15.3232 11.5126 15.3232 11.9874 15.0303 12.2803Z";
  const arrowDown =
    "M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197 8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197 13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z";
  const arrow = document.getElementById("arrow");
  getSvg.classList.add("rotate");
  if (isClosed) {
    arrow.setAttribute("d", arrowUp);
    isClosed = false;
  } else {
    arrow.setAttribute("d", arrowDown);
    isClosed = true;
  }
  setTimeout(() => {
    getSvg.classList.remove("rotate");
  }, 2000);
}

// ADD CLICK EVENT LISTENER TO ALL ACCORDION ELEMENTS
function addClick() {
  document.querySelectorAll("div.li-style").forEach((element) => {
    element.querySelector("button.heading").addEventListener("click", (ele) => {
      closeOthers();
      const isExpanded = ele.target.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        ele.target.setAttribute("aria-expanded", !isExpanded);
      } else {
        ele.target.setAttribute("aria-expanded", !isExpanded);
      }
      element.classList.add("ashBg");
      const imgBox = element.querySelector("div.img-box");
      imgBox.classList.toggle("closed");
      imgBox.classList.toggle("flex");
      imgBox.setAttribute("aria-hidden", false);
    });
  });
}

// CLOSE EVERY OTHER ACCORDION TAB
function closeOthers() {
  document.querySelectorAll("button.heading").forEach((button) => {
    button.setAttribute("aria-expanded", false);
  });
  document.querySelectorAll("div.li-style").forEach((element) => {
    const imgBox = element.querySelector("div.img-box");
    if (!imgBox.classList.contains("closed")) {
      imgBox.classList.add("closed");
      imgBox.classList.remove("flex");
      element.classList.remove("ashBg");
      imgBox.setAttribute("aria-hidden", true);
    }
  });
}
// ADD EVENT LISTENER TO CHECKBOXES AND ALTERNATE THE CHECKBOX BEING SHOWN
function checkBoxes() {
  document.querySelectorAll("button.svgDiv").forEach((element, index) => {
    let indexx = "";
    let count = 0;
    element.addEventListener("click", () => {
      indexx = index;
      element.querySelectorAll("svg").forEach((svg) => {
        // SWITCH THE CHECKBOX BEING SHOWN
        if (svg.classList.contains("hide")) {
          if (svg.classList.contains("checked")) {
            setTimeout(() => {
              svg.classList.remove("hide");
            }, 400);
          } else if (svg.classList.contains("spin-svg")) {
            svg.classList.remove("hide");
            setTimeout(() => {
              svg.classList.add("hide");
            }, 400);
          } else {
            setTimeout(() => {
              svg.classList.remove("hide");
            }, 400);
          }
        } else {
          if (
            (svg.classList.contains("spin-svg") ||
              svg.classList.contains("checked")) &&
            !svg.classList.contains("hide")
          ) {
            svg.classList.add("hide");
            svg.closest("div.li-style").classList.remove("alreadyChecked");
            document
              .querySelectorAll("button.svgDiv")
              [indexx].setAttribute("aria-checked", false);

            calcCompleted();
            return;
          }
          svg.classList.add("hide");
          const parent = element.closest("div.li-style");
          parent.classList.add("alreadyChecked");
          document
            .querySelectorAll("button.svgDiv")
            [indexx].setAttribute("aria-checked", true);
          const allElements = document.querySelectorAll("div.li-style");
          const elementsArr = Array.from(allElements);
          elementsArr.forEach((element) => {
            if (!element.classList.contains("alreadyChecked")) {
              count++;
            }
          });
          // LOOP THROUGH ALL ACCORDION TABS TO CHECK FOR NEXT TAB WHICH IS NOT YET CHECKED AND OPEN IT
          for (let i = index; i < elementsArr.length; i++) {
            if (
              count > 1 &&
              indexx !== elementsArr.length - 1 &&
              !elementsArr[i].classList.contains("alreadyChecked")
            ) {
              {
                elementsArr[i].querySelector("button.heading").click();
              }
              break;
            } else if (count > 1 && indexx == elementsArr.length - 1) {
              indexx = 0;
              i = -1;
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
}

// FUNCTION TO CALCULATE THE NUMBER OF ACCORDION TABS WHICH ARE ALREADY CHECKED
function calcCompleted() {
  const span = document.getElementById("comp");
  const progress = document.getElementById("progress");
  let clicked = 0;
  document.querySelectorAll("div.li-style").forEach((div) => {
    if (div.classList.contains("alreadyChecked")) {
      clicked++;
    }
  });
  span.innerHTML = `${clicked}/5 completed`;
  span.setAttribute("aria-label", `Progress completed: ${clicked} out of 5`);
  progress.setAttribute("value", `${clicked * 20}`);
  progress.setAttribute("aria-valuenow", `${clicked * 20}`);
}

// FUNCTION TO SHOW OR HIDE POPUPS (NOTIFCATION POPUP AND PROFILE POPUP)
function popUpp(query, id) {
  const button = document.getElementById(id);
  const popUp = document.getElementById(query);
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const ishidden = popUp.getAttribute("aria-hidden") === "true";
  if (previous && previous == query) {
    if (document.getElementById(query).classList.contains("closed")) {
      document.getElementById(query).classList.replace("closed", "flexDiv");
      popUp.setAttribute("aria-hidden", !ishidden);
      button.setAttribute("aria-expanded", !isExpanded);
    } else {
      document.getElementById(query).classList.replace("flexDiv", "closed");
      popUp.setAttribute("aria-hidden", !ishidden);
      button.setAttribute("aria-expanded", !isExpanded);
    }
  } else if (
    previous &&
    previous !== query &&
    !document.getElementById(previous).classList.contains("closed")
  ) {
    document.getElementById(previous).classList.replace("flexDiv", "closed");
    document.getElementById(previous).setAttribute("aria-hidden", true);
    document.getElementById(previousId).setAttribute("aria-expanded", false);
    previous = query;
    previousId = id;
    popUpp(query, id);
  } else {
    console.log("thisss");
    previous = query;
    previousId = id;
    popUpp(query, id);
  }
}

// FUNCTION TO LOOP AND DISPLAY THE ACCORDION CONTENTS INTO THE DOM,CALLED ON LOAD OF THE PAGE
function loadDetails() {
  detailsArray.forEach((detail, index) => {
    document.getElementById("list").innerHTML += ` <div class="li-style">
    <div class="li-style-div">
      <button class="svgDiv" aria-checked="false" role="menuitemcheckbox">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
          fill="none"
          id="unchecked"
          class="unchecked"
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="#8a8a8a"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray="4 6"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 28 28" fill="none" class="hide spin-svg">
          <path
            d="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2"
            stroke="#000"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="40"
          id="checked"
          class="checked hide"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" fill="#303030"></circle>
          <path
            d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
            fill="#8a8a8a"
            id="checkedpath"
          ></path>
        </svg>
      </button>
      <button
        class="heading"
        role="menuitem"
        aria-label="Option ${index + 1}: ${detail.title}"
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${detail.title}
      </button>
    </div>
    <div class="closed img-box" aria-hidden="true" aria-live="polite">
      <div>
        <p
          class="text-mid"
          aria-label="Description of ${detail.title}"
        >
          ${detail.text}

          <a
            href="#"
            aria-label="learn more about ${detail.title}"
            class="focused"
            >Learn more</a
          >
        </p>
        <button  aria-label="${detail.btn1}">${detail.btn1}</button>
      </div>
      <img
        src="${detail.img}"
        alt="${detail.title}"
        aria-label="Image representing ${detail.title}"
      />
    </div>
  </div>`;
    if (detail.btn2) {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = detail.btn2;
      buttonElement.classList.add("no-style");
      const all = document.querySelectorAll("div.li-style");
      all[all.length - 1]
        .querySelector("div.img-box div")
        .appendChild(buttonElement);
    }
  });
  // ADD EVENT LISTENERS TO ACCORDION TABS AND CHECKBOXES
  addClick();
  checkBoxes();
  document
    .querySelectorAll("div.li-style")[0]
    .querySelector("button.heading")
    .click();
  //CALL SHOWCONTENT TO DISPLAY THE ACCORDION
  showContent();
}
loadDetails();
