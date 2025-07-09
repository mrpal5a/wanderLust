
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scrollProgress").style.width = scrollPercent + "%";
    console.log("Scrolled to", scrollPercent + "%");
  });

