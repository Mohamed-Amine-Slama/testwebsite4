// constants
const body = document.querySelector("body"),
  loader = document.querySelector(".loader-wrap"),
  links = document.querySelectorAll('a[href="#"]'),
  nav = document.querySelector("header nav"),
  navToggle = document.querySelector("header nav .toggle"),
  navSpanMiddle = document.querySelector("header nav .toggle .middle"),
  navNavigationBar = document.querySelector("header nav .navigation-bar"),
  navNavigationBarLi = document.querySelectorAll(
    "header nav .navigation-bar li"
  ),
  headerText = document.querySelector("header .text"),
  headerSection = document.querySelector("header"),
  aboutSection = document.querySelector(".about-us"),
  recipeSection = document.querySelector(".recipes"),
  menuSection = document.querySelector(".menu"),
  fixedImageSection = document.querySelector(".fixed-image"),
  footerSection = document.querySelector("footer"),
  dotOne = document.querySelector(".dots .one"),
  dotTwo = document.querySelector(".dots .two"),
  dotThree = document.querySelector(".dots .three"),
  dots = document.querySelectorAll(".dots > div"),
  logoImage = document.querySelector("header nav .logo img"),
  svgDown = document.querySelector("header .arrow-down"),
  svgUp = document.querySelector(".copyright .arrow-up"),
  menuImgs = document.querySelectorAll(".menu .menu-image-container img"),
  boxModel = document.querySelector(".menu .box-model"),
  menuImageContainer = document.querySelector(".menu-image-container"),
  boxModelArrow = document.querySelector(".menu .box-model .arrow"),
  boxModelImage = document.querySelector(".menu .box-model img"),
  pageTitle = document.querySelector("title");

// remove loader
function fadeOutEffect() {
  const fadeEffect = setInterval(function () {
    if (!loader.style.opacity) {
      loader.style.opacity = 1;
    }
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.4;
    } else {
      body.classList.remove("stop-scroll");
      loader.classList.add("remove");
      clearInterval(fadeEffect);
    }
  }, 100);
}
window.addEventListener("load", fadeOutEffect);

// prevent links click hash
links.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
  })
);

// toggle hamburger menu button
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navSpanMiddle.classList.toggle("hide");
  navNavigationBar.classList.toggle("show");
});

// show active navigationbar li
navNavigationBarLi.forEach((li) =>
  li.addEventListener("click", () => {
    const arr = Array.from(li.parentElement.children);
    arr.forEach((li) => li.classList.remove("active"));
    li.classList.add("active");
  })
);

// svg-up smooth scroll
svgUp.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

window.onscroll = function () {
  // make navbar fixed & change logo color
  if (window.pageYOffset > headerSection.offsetHeight - 75) {
    nav.classList.add("active");
    logoImage.src =
      "https://res.cloudinary.com/abdel-rahman-ali/image/upload/v1535988525/logo-rosa.png";
  } else {
    nav.classList.remove("active");
    logoImage.src =
      "https://res.cloudinary.com/abdel-rahman-ali/image/upload/v1535988515/logo-rosa-white.png";
  }

  // header welcome fade out and in
  if (window.pageYOffset > 0) {
    headerText.style.opacity = -window.pageYOffset / 300 + 1;
  }
  // home page JS
  if (pageTitle.text === "ROSA- Restaurant") {
    //change dots background color
    if (window.pageYOffset < headerSection.offsetHeight * 0.5) {
      dots.forEach((dot) => dot.classList.remove("black"));
      dotTwo.classList.remove("active");
      dotOne.classList.add("active");
    } else if (
      window.pageYOffset > headerSection.offsetHeight * 0.5 &&
      window.pageYOffset < recipeSection.offsetTop * 0.72
    ) {
      dots.forEach((dot) => dot.classList.add("black"));
    } else if (
      window.pageYOffset > recipeSection.offsetTop * 0.75 &&
      window.pageYOffset < menuSection.offsetTop * 0.81
    ) {
      dots.forEach((dot) => dot.classList.remove("black"));
      dotOne.classList.remove("active");
      dotThree.classList.remove("active");
      dotTwo.classList.add("active");
    } else if (
      window.pageYOffset > menuSection.offsetTop * 0.81 &&
      window.pageYOffset < fixedImageSection.offsetTop * 0.86
    ) {
      dots.forEach((dot) => dot.classList.add("black"));
      dotThree.classList.remove("active");
      dotTwo.classList.add("active");
    } else if (
      window.pageYOffset > fixedImageSection.offsetTop * 0.86 &&
      window.pageYOffset < footerSection.offsetTop * 0.72
    ) {
      dots.forEach((dot) => dot.classList.remove("black"));
      dotTwo.classList.remove("active");
      dotThree.classList.add("active");
    } else if (
      window.pageYOffset > footerSection.offsetTop * 0.72 &&
      window.pageYOffset < footerSection.offsetTop * 0.901
    ) {
      dots.forEach((dot) => dot.classList.add("black"));
    } else if (window.pageYOffset > footerSection.offsetTop * 0.901) {
      dots.forEach((dot) => dot.classList.remove("black"));
    }
  }
};

// home page JS
if (pageTitle.text === "ROSA- Restaurant") {
  // svg-down smooth scroll
  svgDown.addEventListener("click", () => {
    window.scroll({
      top: aboutSection.offsetTop - 30,
      behavior: "smooth",
    });
  });

  // dots smooth scroll
  dots.forEach((dot) =>
    dot.addEventListener("click", function () {
      window.scrollTo({
        top: document.querySelector(this.dataset.x).offsetTop - 100,
        behavior: "smooth",
      });
    })
  );

  // show box model
  menuImgs.forEach((img) =>
    img.addEventListener("click", function () {
      const arr = Array.from(this.parentElement.parentElement.children);

      arr.forEach((div) => div.classList.remove("active"));

      this.parentElement.classList.add("active");
      boxModel.classList.add("active");
      boxModelImage.src = this.src;
      boxModelImage.classList.add("active");
      body.classList.add("hide-scroll");
    })
  );

  // box model functions
  function boxModelFun(e) {
    // close box model
    if (
      e.code === "Escape" ||
      (e.target.tagName === "DIV" && !e.target.classList.contains("arrow")) ||
      e.target.classList.contains("close")
    ) {
      boxModel.classList.remove("active");
      body.classList.remove("hide-scroll");
    }

    if (boxModel.classList.contains("active")) {
      if (
        e.code === "ArrowRight" ||
        e.code === "ArrowLeft" ||
        e.target.classList.contains("arrow-right") ||
        e.target.classList.contains("arrow-left")
      ) {
        const arr = Array.from(menuImageContainer.children);
        const active = arr.find((div) => div.classList.contains("active"));

        // change box model image
        if (
          e.target.classList.contains("arrow-right") ||
          e.code === "ArrowRight"
        ) {
          if (active.nextElementSibling === null) {
            active.parentElement.firstElementChild.classList.add("active");
            boxModelImage.src =
              active.parentElement.firstElementChild.firstElementChild.src;
          } else {
            active.nextElementSibling.classList.add("active");
            boxModelImage.src = active.nextElementSibling.firstElementChild.src;
          }
        }

        // change box model image
        else if (
          e.target.classList.contains("arrow-left") ||
          e.code === "ArrowLeft"
        ) {
          if (active.previousElementSibling === null) {
            active.parentElement.lastElementChild.classList.add("active");
            boxModelImage.src =
              active.parentElement.lastElementChild.lastElementChild.src;
          } else {
            active.previousElementSibling.classList.add("active");
            boxModelImage.src =
              active.previousElementSibling.firstElementChild.src;
          }
        }
        active.classList.remove("active");
      }
    }
  }

  window.addEventListener("keydown", boxModelFun);
  window.addEventListener("click", boxModelFun);
  boxModelArrow.addEventListener("click", boxModelFun);
}
var Canvas = document.getElementById("canvas");
var ctx = Canvas.getContext("2d");

var resize = function () {
  Canvas.width = Canvas.clientWidth;
  Canvas.height = Canvas.clientHeight;
};
window.addEventListener("resize", resize);
resize();

var elements = [];
var presets = {};

presets.o = function (x, y, s, dx, dy) {
  return {
    x: x,
    y: y,
    r: 12 * s,
    w: 5 * s,
    dx: dx,
    dy: dy,
    draw: function (ctx, t) {
      this.x += this.dx;
      this.y += this.dy;

      ctx.beginPath();
      ctx.arc(
        this.x + +Math.sin((50 + x + t / 10) / 100) * 3,
        this.y + +Math.sin((45 + x + t / 10) / 100) * 4,
        this.r,
        0,
        2 * Math.PI,
        false
      );
      ctx.lineWidth = this.w;
      ctx.strokeStyle = "#f44d85";
      ctx.stroke();
    },
  };
};

presets.x = function (x, y, s, dx, dy, dr, r) {
  r = r || 0;
  return {
    x: x,
    y: y,
    s: 20 * s,
    w: 5 * s,
    r: r,
    dx: dx,
    dy: dy,
    dr: dr,
    draw: function (ctx, t) {
      this.x += this.dx;
      this.y += this.dy;
      this.r += this.dr;

      var _this = this;
      var line = function (x, y, tx, ty, c, o) {
        o = o || 0;
        ctx.beginPath();
        ctx.moveTo(-o + (_this.s / 2) * x, o + (_this.s / 2) * y);
        ctx.lineTo(-o + (_this.s / 2) * tx, o + (_this.s / 2) * ty);
        ctx.lineWidth = _this.w;
        ctx.strokeStyle = c;
        ctx.stroke();
      };

      ctx.save();

      ctx.translate(
        this.x + Math.sin((x + t / 10) / 100) * 5,
        this.y + Math.sin((10 + x + t / 10) / 100) * 2
      );
      ctx.rotate((this.r * Math.PI) / 1500);

      line(-1, -1, 1, 1, "#f44d85");
      line(1, -1, -1, 1, "#481ea7");

      ctx.restore();
    },
  };
};

for (var x = 0; x < Canvas.width; x++) {
  for (var y = 0; y < Canvas.height; y++) {
    if (Math.round(Math.random() * 25000) == 1) {
      var s = (Math.random() * 5 + 1) / 10;
      if (Math.round(Math.random()) == 1)
        elements.push(presets.o(x, y, s, 0, 0));
      else
        elements.push(
          presets.x(
            x,
            y,
            s,
            0,
            0,
            (Math.random() * 3 - 1) / 10,
            Math.random() * 360
          )
        );
    }
  }
}

setInterval(function () {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);

  var time = new Date().getTime();
  for (var e in elements) elements[e].draw(ctx, time);
}, 10);
