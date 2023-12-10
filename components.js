console.log("comp exec");
var idleTimer;
var slideInterval;
// bitmaps cause texture issues on iOS this workaround prevents black textures and crashes
const IS_IOS =
  /^(iPad|iPhone|iPod)/.test(window.navigator.platform) ||
  (/^Mac/.test(window.navigator.platform) &&
    window.navigator.maxTouchPoints > 1);
if (IS_IOS) {
  window.createImageBitmap = undefined;
}

const video = document.querySelector("video");
const constraints = {
  audio: false,
  video: {
    facingMode: "environment",
  },
};

let streamStarted = false;

const placementUI = document.querySelector("#skipInstructionsButton");
const instructionScreen = document.getElementById("instructionScreen");
const splashScreen = document.getElementById("splashScreen");

const showInstructionScreen = () => {
  splashScreen.style.display = "none"; // Hide the splash screen
  instructionScreen.style.display = "flex"; // Show the instruction screen
  document.querySelector(".nav-btn").style.display = "block";

  splashScreen.remove();
};


placementUI.addEventListener("click", function () {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});

// const animation = { progress: 0 };

// const tween = new TWEEN.Tween(animation)
//   .to({ progress: 1 }, 5000)
//   .onUpdate(() => {
//     document
//       .getElementById("mid_00Img")
//       .setAttribute("sprite-sheet", "progress", animation.progress);
//     document.getElementById("mid_00Img").setAttribute("animation", {
//       property: "components.material.material.opacity",
//       dur: 800,
//       isRawProperty: true,
//       easing: "easeInOutQuad",
//       loop: false,
//       to: "1",
//     });
//   });

// tween.onComplete(() => {
//   animation.progress = 0;
// });
// tween.chain(tween);
// tween.start();

// function animate(time) {
//   requestAnimationFrame(animate);
//   TWEEN.update(time);
// }
// requestAnimationFrame(animate);


function loadImagesAndHideSplashScreen(callback) {

  var images = document.getElementsByClassName("ins-img");
  var totalImages = images.length;
  var loadedImages = 0;

  // Function to check if all images have loaded
  function checkAllImagesLoaded() {
    loadedImages++;
    if (loadedImages === totalImages) {
      // All images have loaded, hide the splash screen

      callback();
    }
  }

  // Loop through each image and attach a load event listener
  for (var i = 0; i < totalImages; i++) {
    images[i].addEventListener('load', checkAllImagesLoaded);
    images[i].src = images[i].getAttribute('src');
    // Optionally, you can also handle errors by adding an error event listener:
    // images[i].addEventListener('error', checkAllImagesLoaded);
  }
}

// Example usage:
// Assuming your HTML has a splash screen with id "splash" and images with class "my-image"



// Listen for when the user taps the UI
const handleUIComponent = () => {
  const superfanScreen = document.getElementById("superfanScreen");
  // superfanScreen.style.display = "flex";
  window.soundEffectAllowed = true;
  console.log("ui compoenet exec");
  // add your js code here
  //
  // event to check if scene ready
  // new WOW({
  //   animateClass: "animate__animated",
  // }).init();
  // Menu Button
  const button = document.getElementById("hamburger-menu");
  const span = button.getElementsByTagName("span")[0];

  button.addEventListener("click", () => {
    span.classList.toggle("hamburger-menu-button-close");
    toggleOnClass();
  });

  function toggleOnClass() {
    const toggleElementId = `#${button.getAttribute("data-toggle")}`;
    const element = document.querySelector(toggleElementId);
    if (element.classList.contains("on")) {
      element.classList.remove("on");
    } else {
      element.classList.add("on");
    }
  }

  const musicToggleButton = document.getElementById("musicToggle");
  //const onOffSoundButton = document.getElementById("onOffSound");
  const stopFilmButton = document.getElementById("stopFilm");
  const tutorialButton = document.getElementById("tutorial");
  const closeCardButton = document.getElementById("closeCard");
  const closeCardButtonIos = document.getElementById("closeCard-ios");
  const musicIcon = document.getElementById("musicIcon");
  // const soundIcon = document.getElementById("soundIcon");
  musicToggleButton.addEventListener("click", () => {
    console.log("music");
    let audio = document.querySelector("#audio");
    // Play bg music
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      musicIcon.src = "assets/images/musicoff.png";
    } else {
      audio.volume = 0.6;
      audio.play();
      musicIcon.src = "assets/images/musicToggle.png";
    }
  });
  // onOffSoundButton.addEventListener("click", () => {
  //   if (soundIcon.src.includes("onOffSound.png")) {
  //     window.soundEffectAllowed = false;
  //     soundIcon.src = "assets/images/offSound.png";
  //   } else {
  //     window.soundEffectAllowed = true;
  //     soundIcon.src = "assets/images/onOffSound.png";
  //   }
  // });
  stopFilmButton.addEventListener("click", () => {
    console.log("Stop Film");
  });
  tutorialButton.addEventListener("click", () => {
    console.log("Tutorial");
    instructionScreen.style.display = "flex";
    gameScreen.style.display = "none";
    currentSlide = 5; // Reset currentSlide to start from slide 1
    showNextSlide(currentSlide); // Show the first slide

  });

  // // Close hamburger menu after clicking a
  // const menuLinks = document.querySelectorAll('.menu li button')
  // menuLinks.forEach((link) => {
  //   link.addEventListener('click', () => {
  //     button.click()
  //   })
  // })

  // Menu Button Ends
  // Select the splash and instruction screens
  const skipInstructionsButton = document.getElementById(
    "skipInstructionsButton"
  );
  const letsgoButton = document.getElementById("letsgoButton");
  const submitButton = document.getElementById("submitButton");
  const superfanButton = document.getElementById("superfanButton");

  const splashScreen = document.getElementById("splashScreen");
  const instructionScreen = document.getElementById("instructionScreen");
  const gameScreen = document.getElementById("gameScreen");
  const typeScreen = document.getElementById("typeScreen");


  let idleTime = 0;
  const idleThreshold = 10000; // 30 seconds in milliseconds

  function resetIdleTime() {
    idleTime = 0;
  }

  function checkIdleTime() {
    idleTime += 2000; // Increment idle time by 1 second

    if (idleTime >= idleThreshold) {
      const creatorsText = document.querySelector(".creators-text");
      // console.log('5 reached')
      creatorsText.innerHTML =
        " <p>Don't lose momentum! Keep going 💪</p>";

      setTimeout(() => {
        creatorsText.innerHTML =
          "";
      }, 3000)


      // You can perform other actions here, such as logging out the user or redirecting them to a login page
      resetIdleTime();
    }
  }

  function startIdleTimer() {
    // Reset idle time when the user interacts with the page
    document.addEventListener("click", resetIdleTime); // Added click event listener
    document.addEventListener("touchstart", resetIdleTime); // Added touchstart event listener for tap
    // Check idle time every second
    idleTimer = setInterval(checkIdleTime, 2000);


  }

  // Start the idle timer when the page loads



  loadImagesAndHideSplashScreen(() => {

    document.getElementById("tapnow").style.display = "block";
    document.getElementById("loading-pulse").style.display = "none";

    // Event listener for click or tap on the splash screen
    splashScreen.addEventListener("click", () => {
      showInstructionScreen(); // Show the instruction screen immediately
      setTimeout(() => {
        showSlide(currentSlide);
      }, 4000);
      const handleStream = (stream) => {
        video.srcObject = stream;
        streamStarted = true;
      };
      navigator.mediaDevices.getUserMedia(constraints).then(
        (stream) => handleStream(stream),
        (err) => console.log(err)
      );
      console.log("clicked", streamStarted);
      if (streamStarted) {
        video.play();
        // placementUI.remove();
      }

      const animation = { progress: 0 };

      const tween = new TWEEN.Tween(animation)
        .to({ progress: 1 }, 5000)
        .onUpdate(() => {
          document
            .getElementById("mid_00Img")
            .setAttribute("sprite-sheet", "progress", animation.progress);
          document.getElementById("mid_00Img").setAttribute("animation", {
            property: "components.material.material.opacity",
            dur: 800,
            isRawProperty: true,
            easing: "easeInOutQuad",
            loop: false,
            to: "1",
          });
        });

      tween.onComplete(() => {
        animation.progress = 0;
      });
      tween.chain(tween);
      tween.start();

      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    });
  });

  //setTimeout(showInstructionScreen, 5000)

  skipInstructionsButton.addEventListener("click", () => {

    startIdleTimer();
    setTimeout(() => {
      instructionScreen.style.display = "none";
      gameScreen.style.display = "flex";
    }, 500);

    setTimeout(() => {
      const creatorsText = document.querySelector(".creators-text");
      creatorsText.innerHTML = "";
    }, 5000)

    let playing = false;
    let audio = document.querySelector("#audio");
    // Play bg music
    if (!playing) {
      audio.volume = 0.6;
      audio.play();

      musicIcon.src = 'assets/images/musicToggle.png';
    } else {
      audio.pause();
      audio.currentTime = 0;
      musicIcon.src = 'assets/images/musicoff.png';
    }
  });

  letsgoButton.addEventListener("click", () => {
    try {
      window.analyticsLog(`LetsGo`, "Experience Completed");
    } catch (e) {
      console.log(e);
    }
    gameScreen.style.display = "none";
    typeScreen.style.display = "flex";
    document.getElementById("confettiIframe").style.display = "none";
  });

  submitButton.addEventListener("click", () => {
    const val = document.getElementById("inputText").value;
    // console.log('submitButton click', val)
    if (val) {
      window.analyticsLog(`Certificate Generated:${val}`);
      document.getElementById("userName").innerHTML = val;
      typeScreen.style.display = "none";
      superfanScreen.style.display = "flex";
    } else {
      console.log("invalid input");
    }
  });

  superfanButton.addEventListener("click", () => {
    // superfanScreen.style.display = "none";
    // superfanScreen.style.display = "flex";

    window.analyticsLog(`Certificate Shared`);

    const element = document.querySelector(".sf-card-box");

    superfanButton.style.display = "none";

    const loadingBtn = document.getElementById("loading-share");
    const superMainImg = document.getElementById("superfan-img-main");
    const superMainPrv = document.getElementById("superfan-img-preview");

    closeCardButton.style.opacity = 0;
    loadingBtn.style.display = "block";
    superMainImg.style.display = "none";
    superMainPrv.style.display = "block";
    // Use html2canvas to capture the content of the element
    html2canvas(element, { backgroundColor: "#6EA2FF" }).then(function (canvas) {
      // Convert the canvas to data URL
      // const imageDataURL = canvas.toDataURL("image/png");

      // Check if the Web Share API is supported
      /*  if (navigator.share) {
           // Use the Web Share API to share the image
           navigator.share({
               title: '#15YearsofYouTube',
               text: '#15YearsofYouTube Superfan Challenge',
               files: [new File([dataURItoBlob(imageDataURL)], 'youtube.png', { type: 'image/png' })],
           })
               .then(() => console.log('Image shared successfully'))
               .catch((error) => console.error('Error sharing image:', error));

           superfanButton.style.opacity = 1;
       } else { */
      // Web Share API not supported

      const link = document.createElement("a");
      // Convert the canvas to data URL
      const imageDataURL = canvas.toDataURL("image/png");

      document.getElementById("ios-img").src = imageDataURL;
      /*   document.getElementById("ios-img").setAttribute("download","15yearsofyoutube.png");
        document.getElementById("ios-img").setAttribute("filename","15yearsofyoutube.png"); */
      loadingBtn.style.opacity = 0;
      superfanScreen.style.display = "none";
      document.getElementById("superfanScreen-ios").style.display = "block";

      superMainImg.style.display = "block";
      superMainPrv.style.display = "none";

      // Set the href attribute with the data URL
      /*  link.href = imageDataURL;
       // Set the download attribute with the desired file name
       link.download = "#15yearsyoutube.png";
       // Append the "a" element to the document
       document.body.appendChild(link);
       // Trigger a click event on the "a" element
       link.click();
       // Remove the "a" element from the document
       document.body.removeChild(link); */
      // Handle sharing in a different way if needed

      /*   } */
    });
  });
  closeCardButton.addEventListener("click", () => {

    superfanScreen.style.display = "none";
    gameScreen.style.display = "flex";


  });

  closeCardButtonIos.addEventListener("click", () => {
    superfanScreen.style.display = "flex";
    closeCardButton.style.opacity = 1;
    superfanButton.style.display = "block";
    document.getElementById("loading-share").style.display = "none";
    document.getElementById("superfanScreen-ios").style.display = "none";
  });
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  let currentSlide = 0;

  function startSlideShow() {
    // Call showNextSlide initially

    // Set an interval to call showNextSlide every 4 seconds and reset the timer
    slideInterval = setInterval(() => {
      showNextSlide();
    }, 8000);
  }

  function showSlide(index) {
    if (slideInterval) {

      clearInterval(slideInterval);
    }
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slides[index].classList.add("active");

    // Hide previous button if on the first slide, else show
    if (index === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
    }

    // Hide next button if on the last slide, else show
    if (index === slides.length - 1) {
      nextBtn.style.display = "none";
      document.querySelector(".step-btn button").innerHTML = "BEGIN";
    } else {
      nextBtn.style.display = "block";
      document.querySelector(".step-btn button").innerHTML =
        "SKIP INSTRUCTIONS <br />AND BEGIN";
    }

    setTimeout(startSlideShow, 8000);

  }

  function showNextSlide() {

    currentSlide = (currentSlide + 1) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    showSlide(currentSlide);

  }

  function showPrevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    showSlide(currentSlide);
  }
  nextBtn.addEventListener("click", showNextSlide);
  prevBtn.addEventListener("click", showPrevSlide);



  // init ends
};
document.querySelector("a-scene").addEventListener("loaded", handleUIComponent);
