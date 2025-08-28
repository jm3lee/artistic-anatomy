/**
 * Client-side helpers for Press pages.
 *
 * Uses jQuery for robust DOM handling instead of ad-hoc utilities. Two
 * behaviours are provided:
 *  - show the page title in the navbar once the hero header scrolls away
 *  - convert top-level <h2> elements into a Bootstrap accordion
 */


$(function () {
  setupNavbarTitleObserver();
  convertH2ToAccordion();
});

/**
 * Display the current page title in the navbar when the hero header leaves
 * the viewport.
 */
function setupNavbarTitleObserver() {
  const $title = $(".navbar .page-title");
  if ($title.length === 0) return;

  const hero = document.querySelector(".hero-header");
  if (!hero) {
    $title.removeClass("d-none");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      $title.toggleClass("d-none", entry.isIntersecting);
    },
    { rootMargin: "-56px 0px 0px 0px" }
  );

  observer.observe(hero);
}

/**
 * Wrap each top-level <h2> and its subsequent content in a Bootstrap
 * accordion item. This keeps long lessons tidy for beginners.
 */
function convertH2ToAccordion() {
  const $container = $("main.container");
  if ($container.length === 0) return;

  const $headings = $container.children("h2");
  if ($headings.length === 0) return;

  const $accordion = $("<div/>", {
    class: "accordion mb-4",
    id: "accordion",
  });

  $headings.first().before($accordion);

  $headings.each(function (i) {
    const idx = i + 1;
    const $h2 = $(this);
    const headerId = `heading-${idx}`;
    const collapseId = `collapse-${idx}`;

    const $item = $("<div/>", { class: "accordion-item" });
    const $header = $("<h2/>", { class: "accordion-header", id: headerId });

    const $button = $("<button/>", {
      class: "accordion-button collapsed",
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#${collapseId}`,
      "aria-expanded": "false",
      "aria-controls": collapseId,
      text: $h2.text(),
    });

    const $collapse = $("<div/>", {
      id: collapseId,
      class: "accordion-collapse collapse",
      "aria-labelledby": headerId,
      "data-bs-parent": "#accordion",
    });

    const $body = $("<div/>", { class: "accordion-body" });

    let $next = $h2.next();
    while ($next.length && $next.prop("tagName") !== "H2") {
      const $temp = $next.next();
      $body.append($next);
      $next = $temp;
    }

    $collapse.append($body);
    $header.append($button);
    $item.append($header, $collapse);
    $accordion.append($item);
    $h2.remove();
  });
}

