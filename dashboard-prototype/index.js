import Selection from "./js/selection.js";

window.selection = Selection.create({
  startThreshold: 0,
  selectables: [".grid__item"],
  startareas: ["#select-area"],
  boundaries: ["#select-area"],

  onSelect({ target, originalEvent, selectedElements }) {
    console.log("onselect");
    // Check if clicked element is already selected
    const selected = target.classList.contains("selected");

    if (!selected) {
      // Select element
      selectElement(target);
      this.keepSelection();
    } else {
      // Unselect element
      unselectElement(target);
      this.removeFromSelection(target);
    }
  },

  validateStart(evt) {
    // Allow selection using the select checkbox
    if (evt.target.closest(".select-checkbox")) {
      return true;
    }

    // Cancel selection if we're not in selection mode and click a grid item
    if (evt.target.closest(".grid__item")) {
      if (
        window.selection._selectedStore.length === 0 ||
        evt.target.closest(".grid__item").classList.contains("selected")
      ) {
        return false;
      }
    }

    // Unselect everything if the user clicks the grid and isn't pressing the ctrl, meta, or shift key
    if (
      (evt.target.id === "select-area" || evt.target.classList.contains("grid")) &&
      !evt.ctrlKey &&
      !evt.metaKey &&
      !evt.shiftKey
    ) {
      for (let el of window.selection._selectedStore) {
        unselectElement(el);
      }
      window.selection._selectedStore = [];
      document.body.classList.remove("selection-mode");
    }

    return true;
  },

  onStart({ selectedElements, originalEvent }) {
    // Remove class if the user isn't pressing the ctrl, meta, or shift key
    if (
      !originalEvent.ctrlKey &&
      !originalEvent.metaKey &&
      !!originalEvent.shiftKey
    ) {
      // Unselect all elements
      for (const el of selectedElements) {
        unselectElement(el);
      }
      // Clear previous selection
      this.clearSelection();
    }
  },

  onMove({ selectedElements, changedElements: { removed } }) {
    // Add a custom class to the elements that where selected.
    for (const el of selectedElements) {
      selectElement(el);
    }

    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
      unselectElement(el);
    }
  },

  onStop() {
    this.keepSelection();
  }
});

const selectElement = el => {
  el.classList.add("selected");
  el.setAttribute("draggable", true);
  el.addEventListener("dragstart", ondragstart);
  el.addEventListener("dragend", ondragend);
  document.body.classList.add("selection-mode");
};

const unselectElement = el => {
  el.classList.remove("selected");
  el.setAttribute("draggable", false);
  if (window.selection._selectedStore.length === 0) {
    document.body.classList.remove("selection-mode");
  }
};

const ondragstart = e => {
  //ev.dataTransfer.setData("text/plain", window.selection._selectedStore.length);
  e.stopPropagation();
  // Set custom cursor image
  var elDragGhost = document.getElementById("drag-ghost");
  elDragGhost.lastElementChild.textContent = `${
    window.selection._selectedStore.length
    }
    project${window.selection._selectedStore.length > 1 ? "s" : ""}`;
  e.dataTransfer.setDragImage(elDragGhost, 25, 35);

  // Set drop effect
  document.body.classList.add("grabbing-cursor");
};

const ondragend = e => {
  document.body.classList.remove("grabbing-cursor");
};

const ondragenter = e => {
  e.target.classList.add("dragover");
};

const ondragover = e => {
  e.preventDefault();
};

const ondragleave = e => {
  e.target.classList.remove("dragover");
};

const ondrop = e => {
  e.preventDefault();
  for (let el of window.selection._selectedStore) {
    el.remove();
  }
  window.selection._selectedStore = [];
  document.body.classList.remove("selection-mode");
  e.target.classList.add("drop-success");
  setTimeout(() => {
    e.target.classList.remove("drop-success");
    e.target.classList.remove("dragover");
  }, 200);
};

for (let el of document.getElementsByClassName("dropzone")) {
  el.addEventListener("dragenter", ondragenter);
  el.addEventListener("dragover", ondragover);
  el.addEventListener("dragleave", ondragleave);
  el.addEventListener("drop", ondrop);
}
