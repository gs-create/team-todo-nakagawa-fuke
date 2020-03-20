$(function() {
  setTimeout(function() {
    $(".modal").fadeIn();
  }, 2000);

  $(".js-modal__close").on("click", function() {
    $(".modal-wrapper").fadeOut();
  });
});

