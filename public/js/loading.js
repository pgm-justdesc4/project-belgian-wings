function progress(){
    const percent = document.querySelector('.percent');
    const progress = document.querySelector('.progress');
    const text = document.querySelector('.text');

    let count = 4;
    let per = 16;
    
    const loading = setInterval(animate, 50);
    function animate(){
      if(count == 100 && per == 400){
        percent.classList.add("text-blink");
        text.style.display = "block";
        clearInterval(loading);
      }else{
        per = per + 4;
        count = count + 1;
        progress.style.width = per + 'px';
        percent.textContent = count + '%';
      }
    }
  }
  progress();
