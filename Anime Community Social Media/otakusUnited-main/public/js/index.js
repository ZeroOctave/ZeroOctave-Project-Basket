function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
  }
  resize();
  window.addEventListener("resize", resize);
}

var sphereAnimation = (function () {
  var sphereEl = document.querySelector(".sphere-animation");
  var spherePathEls = sphereEl.querySelectorAll(".sphere path");
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function () {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(
          anime({
            targets: spherePathEls[i],
            stroke: {
              value: ["#00ADB5", "rgba(80,80,80,.35)"],
              duration: 500,
            },
            translateX: [2, -4],
            translateY: [2, -4],
            easing: "easeOutQuad",
            autoplay: false,
          })
        );
      }
    },
    update: function (ins) {
      aimations.forEach(function (animation, i) {
        var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false,
  });

  var introAnimation = anime
    .timeline({
      autoplay: false,
    })
    .add(
      {
        targets: spherePathEls,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          duration: 3900,
          easing: "easeInOutCirc",
          delay: anime.stagger(190, { direction: "reverse" }),
        },
        duration: 2000,
        delay: anime.stagger(60, { direction: "reverse" }),
        easing: "linear",
      },
      0
    );

  var shadowAnimation = anime(
    {
      targets: "#sphereGradient",
      x1: "25%",
      x2: "25%",
      y1: "0%",
      y2: "75%",
      duration: 30000,
      easing: "easeOutQuint",
      autoplay: false,
    },
    0
  );

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  init();
})();

// Wrap every letter in a span
var textWrapper = document.querySelector(".ml12");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter' style='background: transparent';>$&</span>"
);

anime.timeline({ loop: false }).add({
  targets: ".ml12 .letter",
  translateX: [40, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: "easeOutExpo",
  duration: 1200,
  delay: (el, i) => 500 + 30 * i,
});
// .add({
//   targets: ".ml12 .letter",
//   translateX: [0, -30],
//   opacity: [1, 0],
//   easing: "easeInExpo",
//   duration: 1100,
//   delay: (el, i) => 100 + 30 * i,
// });
