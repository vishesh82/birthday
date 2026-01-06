function openBox(id, envId) {
  document.getElementById(id).style.display = "flex";
  document.getElementById(envId).classList.add("open");
}

function closeBox(id) {
  document.getElementById(id).style.display = "none";
}

function cutCake() {
  document.body.classList.add("darkRoom");
  startConfetti();
  alert("🎉 Cake Cut Successfully! Happy Birthday my love ❤️");
}

function startConfetti() {
  const canvas = document.getElementById("confetti");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 100
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
  }

  setInterval(draw, 40);
}

function enableMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const data = new Uint8Array(analyser.frequencyBinCount);

    function listen() {
      analyser.getByteFrequencyData(data);
      let volume = data.reduce((a,b)=>a+b)/data.length;
      if (volume > 40) {
        alert("✨ Candles blown successfully! Now cut the cake 🎂❤️");
        stream.getTracks().forEach(track => track.stop());
      } else {
        requestAnimationFrame(listen);
      }
    }
    listen();
  })
  .catch(()=> alert("Mic access denied ❌"));
}
document.body.addEventListener("click", () => {
  document.getElementById("bgMusic").play();
});

