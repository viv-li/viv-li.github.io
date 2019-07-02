import Selection from "./js/selection.js";

window.selection = Selection.create({
  startThreshold: 0,
  selectables: [".grid__item"],
  startareas: [".grid"],
  boundaries: [".grid"],

  onSelect({ target, originalEvent, selectedElements }) {
    // Check if clicked element is already selected
    const selected = target.classList.contains("selected");

    // Remove class if the user isn't pressing the control key or ⌘ key and the
    // current target is not already selected
    if (!originalEvent.ctrlKey && !originalEvent.metaKey && !selected) {
      // Remove class from every element that is selected
      for (const el of selectedElements) {
        el.classList.remove("selected");
      }

      // Clear previous selection
      this.clearSelection();
    }

    if (!selected) {
      // Select element
      target.classList.add("selected");
      this.keepSelection();
    } else {
      // Unselect element
      target.classList.remove("selected");
      this.removeFromSelection(target);
    }
  },

  validateStart(evt) {
    // Allow selection using the select checkbox
    if (evt.target.closest(".select-checkbox")) {
      return true;
    }
    // Cancel selection if it starts on a grid item
    if (evt.target.closest(".grid__item")) {
      return false;
    }

    if (
      (evt.target.id = "grid" && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey)
    ) {
      for (const el of window.selection._selectables) {
        el.classList.remove("selected");
      }
    }
    return true;
  },

  onStart({ selectedElements, originalEvent }) {
    // Remove class if the user isn't pressing the control key or ⌘ key
    if (!originalEvent.ctrlKey && !originalEvent.metaKey) {
      // Unselect all elements
      for (const el of selectedElements) {
        el.classList.remove("selected");
      }
      // Clear previous selection
      this.clearSelection();
    }
  },

  onMove({ selectedElements, changedElements: { removed } }) {
    // Add a custom class to the elements that where selected.
    for (const el of selectedElements) {
      el.classList.add("selected");
    }

    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
      el.classList.remove("selected");
    }
  },

  onStop() {
    this.keepSelection();
  }
});
