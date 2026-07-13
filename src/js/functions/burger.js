export default function burger() {
  const burger = document.querySelector("#burger");

  if (burger) {
    const burgerOpen = document.querySelector("#burger-open");
    const burgerCloses = document.querySelectorAll("[data-burger-close]");
    const burgerOverlay = document.querySelector("#burger-overlay");
    const header = document.querySelector(".header");
    const burgerAnchors = burger.querySelectorAll("a[href^='/#']");

    burgerAnchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        handleClose();
      });
    });
    burgerOverlay.addEventListener("click", handleClose);

    burgerOpen.addEventListener("click", () => {
      handleOpen();
    });
    burgerCloses.forEach((btn) => btn.addEventListener("click", handleClose));

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height}px`;
    }

    function handleOpen() {
      document.body.classList.add("body-hidden");
      burger.classList.add("_open");
      burgerOverlay.classList.add("_active");

      updateHeightBurger();
    }
    function handleClose() {
      document.body.classList.remove("body-hidden");
      burger.classList.remove("_open");
      burgerOverlay.classList.remove("_active");
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }

  const burgerTabBtns = burger.querySelectorAll("[data-burger-tab-btn]");

  if (burgerTabBtns.length) {
    const allTabs = burger.querySelectorAll(".burger__tab");

    burgerTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.burgerTabBtn;
        const tab = burger.querySelector(`[data-burger-tab="${id}"]`);

        if (tab) {
          allTabs.forEach((t) => {
            t.classList.remove("_show");

            setTimeout(() => {
              t.classList.remove("_active");
            }, 150);
          });

          setTimeout(() => {
            tab.classList.add("_active");

            setTimeout(() => {
              tab.classList.add("_show");
            }, 150);
          }, 150);
        }
      });
    });
  }
}
