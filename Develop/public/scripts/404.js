const goBackBtn = document.getElementById("back");
goBackBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  history.back();
});
