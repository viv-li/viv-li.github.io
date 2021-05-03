interact(".image-resizer")
  .resizable({
    edges: {
      top: ".resize-top",
      left: ".resize-left",
      bottom: ".resize-bottom",
      right: ".resize-right"
    },

    modifiers: [
      interact.modifiers.restrictSize({
        min: { width: 50 },
        max: { width: 800 }
      })
    ],

    inertia: true
  })
  .on("resizemove", function(event) {
    var target = event.target;
    var x = parseFloat(target.getAttribute("data-x")) || 0;
    var y = parseFloat(target.getAttribute("data-y")) || 0;

    // update the element's style
    target.style.width = event.rect.width + "px";

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px," + y + "px)";
  });

window.editorFns = {
  unselectAllWidgets: () => {
    for (let el of document.getElementsByClassName("image-resizer")) {
      el.classList.remove("selected");
    }
    for (let el of document.getElementsByClassName("editor-widget")) {
      el.classList.remove("selected");
    }
    window.editorFns.hideAllToolbars();
  },
  onClick: e => {
    window.editorFns.unselectAllWidgets();
  },
  onKeyDown: e => {
    const key = event.key; // const {key} = event; ES6+
    if (key === "Backspace" || key === "Delete") {
      const selectedWidget = document.querySelector(".selected");
      if (selectedWidget !== null) {
        e.preventDefault();
        selectedWidget.remove();
        window.editorFns.hideAllToolbars();
      }
      return false;
    } else if (key === "Enter") {
      const selectedWidget = document.querySelector(".selected");
      if (selectedWidget !== null) {
        e.preventDefault();
        const $newLine = $(
          `<p
              contenteditable="true"
              onkeydown="window.editorFns.onKeyDownEditor(event)"
              onfocus="window.editorFns.onFocusEditor(event)"
              onblur="window.editorFns.onBlurEditor(event)"
            ></p>`
        );
        $newLine.insertAfter(selectedWidget);
        $newLine.focus();
        return false;
      }
    }
    return true;
  },
  positionToolbar: (elToolbar, elWidget) => {
    const { top, left, width } = elWidget.getBoundingClientRect();
    elToolbar.style.top = `${window.scrollY + top - 80}px`;
    elToolbar.style.left = `${window.scrollX + left + width / 2}px`;
  },
  hideAllToolbars: () => {
    for (let elToolbar of document.getElementsByClassName("toolbar")) {
      elToolbar.style.top = "-100px";
      elToolbar.style.right = "-100px";

      for (let elButton of elToolbar.getElementsByClassName(
        "toolbar__main__button"
      )) {
        elButton.classList.remove("open");
      }
      for (let elPanel of elToolbar.getElementsByClassName("toolbar__panel")) {
        elPanel.classList.remove("show");
      }
    }
  },
  onKeyDownEditor: e => {
    const key = event.key; // const {key} = event; ES6+
    if (key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      const $newLine = $(
        `<p
            contenteditable="true"
            onkeydown="window.editorFns.onKeyDownEditor(event)"
            onfocus="window.editorFns.onFocusEditor(event)"
            onblur="window.editorFns.onBlurEditor(event)"
          ></p>`
      );
      $newLine.insertAfter(e.target);
      $newLine.focus();
      return false;
    } else if (key === "Backspace" || key === "Delete") {
      e.stopPropagation();
      if (
        e.target.textContent === "" &&
        !e.target.classList.contains("undeletable")
      ) {
        try {
          e.target.previousElementSibling.focus();
        } finally {
          e.target.remove();
        }
      }
      return false;
    }
    return true;
  },
  onFocusEditor: e => {
    const elWA = document.getElementById("widget-adder");
    window.editorFns.unselectAllWidgets();

    // position the widget adder to the focussed line
    const { top, left, height } = e.target.getBoundingClientRect();
    elWA.style.top = `${window.scrollY + top + height / 2}px`;
    elWA.style.left = `${window.scrollX + left - 40}px`;

    window.lastFocussedLine = e.target;
  },
  onBlurEditor: e => {
    if (e.target.id !== "widget-adder") {
      window.editorFns.hideWidgetAdder();
    }
  },
  hideWidgetAdder: () => {
    const elWA = document.getElementById("widget-adder");
    elWA.style.top = `-100px`;
    elWA.style.left = `-100px`;
    elWA.classList.remove("show-menu");
  },
  onClickWidgetAdder: e => {
    e.preventDefault();
    const elWA = document.getElementById("widget-adder");
    elWA.classList.toggle("show-menu");
  },

  onClickModalImage: e => {
    if (window.elImagePlaceholder !== null) {
      window.editorFns.addImageToImagePlaceholder(e.target.src);
    } else {
      window.editorFns.addImageToEditor(e.target.src);
    }

    $("#image-gallery-modal").modal("toggle");
  },

  onClickAddImage: e => {
    e.preventDefault();
    window.elImagePlaceholder = null;
    $("#image-gallery-modal").modal();
  },

  addImageToEditor: imageUrl => {
    const $imageResizer = $(
      `<div class="image-resizer">
        <div class="resize-handle resize-top resize-left"></div>
        <div class="resize-handle resize-top resize-right"></div>
        <div class="resize-handle resize-bottom resize-left"></div>
        <div class="resize-handle resize-bottom resize-right"></div>
      </div>`
    );

    var elImg = new Image();
    elImg.onload = function() {
      // Get image width and set the resizer to that width
      const width = elImg.width;
      $imageResizer.width(width);
    };
    elImg.src = imageUrl;
    elImg.addEventListener("click", window.editorFns.onClickImage);
    $imageResizer.append(elImg);
    $imageResizer.insertBefore(window.lastFocussedLine);
  },

  onClickToolbarDelete: e => {
    e.stopPropagation();
    const selectedWidget = document.querySelector(".selected");
    if (selectedWidget !== null) {
      selectedWidget.remove();
      window.editorFns.hideAllToolbars();
    }
  }
};

document.addEventListener("click", window.editorFns.onClick);
document.addEventListener("keydown", window.editorFns.onKeyDown);
