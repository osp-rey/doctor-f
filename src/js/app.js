import burger from "./functions/burger.js";
import servicesDrop from "./functions/servicesDrop.js";
import sliders from "./functions/sliders.js";

document.addEventListener("DOMContentLoaded", () => {
  servicesDrop();
  burger();
  sliders();

  Fancybox.bind("[data-fancybox]", {
    closeButton: false,
    on: {
      destroy: (instance) => {
        const id = instance.getSlide().src;

        if (id.includes("#modal")) {
          const modal = document.querySelector(id);
          const inputNote = modal.querySelector(".input-note");
          const modalTitle = modal.querySelector(".modal__title[data-text]");

          if (inputNote) inputNote.value = "";
          if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
        }
      },
    },
  });
  Fancybox.show([{src: "#modal-feedback", type: "inline"}], {closeButton: false})
});
