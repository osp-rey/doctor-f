export default function servicesDrop() {
  const drop = document.querySelector("#services-drop");

  if (drop) {
    const header = document.querySelector(".header");
    const headerHeight = header.clientHeight;
    const headerZIndex = window.getComputedStyle(header).zIndex;
    const dropOverlay = document.querySelector("#services-drop-overlay");
    const btnToggle = document.querySelector("#services-drop-btn");

    document.body.addEventListener("click", handlerClose);

    drop.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    btnToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btnToggle.classList.contains("_active")) {
        handlerClose();
      } else {
        handlerOpen();
      }
    });

    function handlerOpen() {
      dropOverlay.classList.add("_open");
      drop.classList.add("_open");
      btnToggle.classList.add("_active");
      header.style.zIndex = "999";

      changeHeight();
    }
    function handlerClose() {
      dropOverlay.classList.remove("_open");
      drop.classList.remove("_open");
      btnToggle.classList.remove("_active");
      header.style.zIndex = headerZIndex;
    }

    function changeHeight() {
      drop.style.maxHeight = `${window.visualViewport.height - headerHeight}px`;
      drop.style.top = `${headerHeight}px`;
    }

    window.visualViewport.addEventListener("resize", changeHeight);
    window.visualViewport.addEventListener("scroll", changeHeight);
  }
}
