$(function() {
  setTimeout(function() {
    var modal = document.getElementById("modal");
    modal.classList.add("show");
  },5000);

  $(".js-modal-close").on("click", function() {
    $(".js-modal").fadeOut();
    return false;
  });
});
