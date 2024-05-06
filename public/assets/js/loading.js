function progress() {
  let percent = document.querySelector(".percent");
  let progress = document.querySelector(".progress");
  let text = document.querySelector(".text");

  let count = 4;
  let per = 16;

  let loading = setInterval(animate, 50);
  function animate() {
    if (count == 100 && per == 400) {
      percent.classList.add("text-blink");
      // text.style.display = "block"; (ERROR)
      clearInterval(loading);
      window.location.href = "/login";
    } else {
      per = per + 4;
      count = count + 1;
      progress.style.width = per + "px";
      percent.textContent = count + "%";
    }
  }
}
progress();
