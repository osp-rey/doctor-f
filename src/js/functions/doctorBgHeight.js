export default function doctorBgHeight() {
  const section = document.querySelector(".s-doctor");

  if (section) {
    function changeHeight() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        const headHeight = section.querySelector(".s-doctor__head").clientHeight;
        section.style.setProperty("--bg-height", `${headHeight}px`);
      }
    }

    changeHeight();
    window.visualViewport.addEventListener("resize", changeHeight);
  }
}
