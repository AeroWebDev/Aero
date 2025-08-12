const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("mouseover", focusFunc);
  input.addEventListener("focus", focusFunc);
  input.addEventListener("input", focusFunc);
  
  input.addEventListener("blur", blurFunc);
  input.addEventListener("mouseout", blurFunc);
  input.addEventListener("mouseleave", blurFunc);
});
