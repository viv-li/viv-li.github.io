function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

window.gallerySettings = {
  // widgetId: {
  //   galleryType: 'grid' | 'carousel',
  //   gridLayout: 'regular' | 'masonry'
  // }
};

const $galleryWidgetTemplate = $(`
<div class="gallery-widget gallery-type-grid grid-layout-regular editor-widget">
  <div class="widget-selector" onclick="window.galleryFns.onClickGalleryWidget(event)"></div>

  <div class="image-grid widget-container">
    <div class="js-light-gallery-grid grid layout-grid-regular">
      <div class="grid-item" data-src="assets/images/rainforest01.jpg">
        <img src="assets/images/rainforest01.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest02.jpg">
        <img src="assets/images/rainforest02.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest03.jpg">
        <img src="assets/images/rainforest03.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest04.jpg">
        <img src="assets/images/rainforest04.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest05.jpg">
        <img src="assets/images/rainforest05.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest09.jpg">
        <img src="assets/images/rainforest09.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest07.jpg">
        <img src="assets/images/rainforest07.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest08.jpg">
        <img src="assets/images/rainforest08.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest10.jpg">
        <img src="assets/images/rainforest10.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest06.jpg">
        <img src="assets/images/rainforest06.jpg"/>
      </div>
      <div class="grid-item" data-src="assets/images/rainforest11.jpg">
        <img src="assets/images/rainforest11.jpg"/>
      </div>
    </div>
  </div>

  <div class="image-carousel widget-container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="8"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="9"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="10"></li>
      </ol>
      <div class="js-light-gallery-carousel carousel-inner">
        <div class="carousel-item active" data-src="assets/images/rainforest01.jpg">
          <img class="d-block w-100" src="assets/images/rainforest01.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest02.jpg">
          <img class="d-block w-100" src="assets/images/rainforest02.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest03.jpg">
          <img class="d-block w-100" src="assets/images/rainforest03.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest04.jpg">
          <img class="d-block w-100" src="assets/images/rainforest04.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest05.jpg">
          <img class="d-block w-100" src="assets/images/rainforest05.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest06.jpg">
          <img class="d-block w-100" src="assets/images/rainforest06.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest07.jpg">
          <img class="d-block w-100" src="assets/images/rainforest07.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest08.jpg">
          <img class="d-block w-100" src="assets/images/rainforest08.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest09.jpg">
          <img class="d-block w-100" src="assets/images/rainforest09.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest10.jpg">
          <img class="d-block w-100" src="assets/images/rainforest10.jpg">
        </div>
        <div class="carousel-item" data-src="assets/images/rainforest11.jpg">
          <img class="d-block w-100" src="assets/images/rainforest11.jpg">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>
`);

window.galleryFns = {
  onClickAddImageGallery: e => {
    e.preventDefault();

    const uuid = uuidv4();
    window.gallerySettings[uuid] = {
      galleryType: "grid",
      gridLayout: "regular"
    };
    const $galleryWidget = $galleryWidgetTemplate.clone(true, true);
    $galleryWidget.attr("id", uuid);
    $galleryWidget.find(".js-light-gallery-grid").attr("id", `lg-grid-${uuid}`);
    $galleryWidget
      .find(".js-light-gallery-carousel")
      .attr("id", `lg-carousel-${uuid}`);
    $galleryWidget.insertBefore(window.lastFocussedLine);
    window.editorFns.hideWidgetAdder();

    $(`#lg-grid-${uuid}`).lightGallery({
      selector: ".grid-item",
      thumbnail: true
    });

    $(`#lg-carousel-${uuid}`).lightGallery({
      selector: ".carousel-item",
      thumbnail: true
    });
  },

  onClickGalleryWidget: e => {
    e.stopPropagation();

    window.editorFns.unselectAllWidgets();
    window.editorFns.hideAllToolbars();

    const elGalleryWidgetToolbar = document.getElementById(
      "gallery-widget-toolbar"
    );
    const elGalleryWidget = e.target.closest(".editor-widget");
    elGalleryWidget.classList.toggle("selected");

    if (elGalleryWidget.classList.contains("selected")) {
      window.editorFns.positionToolbar(elGalleryWidgetToolbar, elGalleryWidget);
    }
  },

  onClickGalleryStyles: e => {
    e.stopPropagation();
    e.target.classList.toggle("open");
    window.galleryFns.redrawStylesPanel();
    const elStylesPanel = e.target
      .closest(".toolbar")
      .querySelector(".styles-panel");
    elStylesPanel.classList.toggle("show");
  },

  onClickGalleryTypeGrid: e => {
    e.stopPropagation();
    const elGalleryWidget = document.querySelector(".selected");
    elGalleryWidget.classList.add("gallery-type-grid");
    elGalleryWidget.classList.remove("gallery-type-carousel");
    window.gallerySettings[elGalleryWidget.id]["galleryType"] = "grid";
    window.galleryFns.redrawStylesPanel();
  },

  onClickGalleryTypeCarousel: e => {
    e.stopPropagation();
    const elGalleryWidget = document.querySelector(".selected");
    elGalleryWidget.classList.add("gallery-type-carousel");
    elGalleryWidget.classList.remove("gallery-type-grid");
    window.gallerySettings[elGalleryWidget.id]["galleryType"] = "carousel";
    window.galleryFns.redrawStylesPanel();
  },

  onClickGridLayoutRegular: e => {
    e.stopPropagation();
    const elGalleryWidget = document.querySelector(".selected");
    elGalleryWidget.classList.add("grid-layout-regular");
    elGalleryWidget.classList.remove("grid-layout-masonry");
    window.gallerySettings[elGalleryWidget.id]["gridLayout"] = "regular";
    window.galleryFns.redrawStylesPanel();
  },

  onClickGridLayoutMasonry: e => {
    e.stopPropagation();
    const elGalleryWidget = document.querySelector(".selected");
    elGalleryWidget.classList.add("grid-layout-masonry");
    elGalleryWidget.classList.remove("grid-layout-regular");
    window.gallerySettings[elGalleryWidget.id]["gridLayout"] = "masonry";
    window.galleryFns.redrawStylesPanel();
  },

  redrawStylesPanel: () => {
    const uuid = document.querySelector(".selected").id;
    const { galleryType, gridLayout } = window.gallerySettings[uuid];
    const $stylesPanel = $("#gallery-widget-toolbar .styles-panel");

    if (galleryType === "grid") {
      $stylesPanel.find(".option-grid").addClass("active");
      $stylesPanel.find(".option-carousel").removeClass("active");
      $stylesPanel.find(".options-grid-layout").removeClass("hide");
    } else if (galleryType === "carousel") {
      $stylesPanel.find(".option-carousel").addClass("active");
      $stylesPanel.find(".option-grid").removeClass("active");
      $stylesPanel.find(".options-grid-layout").addClass("hide");
    }

    if (gridLayout === "regular") {
      $stylesPanel.find(".option-regular").addClass("active");
      $stylesPanel.find(".option-masonry").removeClass("active");
    } else if (gridLayout === "masonry") {
      $stylesPanel.find(".option-masonry").addClass("active");
      $stylesPanel.find(".option-regular").removeClass("active");
    }
  }
};
