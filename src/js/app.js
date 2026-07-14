import burger from "./functions/burger.js";
import buttonsNote from "./functions/buttonsNote.js";
import changeModaltitle from "./functions/changeModalTitle.js";
import handlerSelect from "./functions/handlerSelect.js";
import inputmask from "./functions/inputmask.js";
import servicesDrop from "./functions/servicesDrop.js";
import sliders from "./functions/sliders.js";
import tab from "./functions/tab.js";

document.addEventListener("DOMContentLoaded", () => {
  servicesDrop();
  burger();
  sliders();
  tab();
  buttonsNote();
  changeModaltitle();
  inputmask();
  handlerSelect();

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
  // Fancybox.show([{src: "#modal-feedback", type: "inline"}], {closeButton: false})
});
