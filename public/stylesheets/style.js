$(function() {
  setTimeout(function() {
    $("#modal").fadeIn();
  }, 5000);

  $(".js-modal__close").on("click", function() {
    $("#modal").fadeOut();
  });
});

