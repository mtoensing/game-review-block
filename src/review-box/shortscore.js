document.addEventListener("DOMContentLoaded", function () {
    // Get the elements
    const ratingElem = document.querySelector(".shortscore");
    const hreviewElem = document.querySelector(".shortscore-hreview");
  
    // Set the initial class value to 'shortscore-0'
    ratingElem.className = "shortscore shortscore-0";
  
    // Variable to store the animation state
    let isAnimating = false;
  
    // Function to run the animation
    const animateScore = () => {
      if (isAnimating) return; // Ignore clicks if the animation is running
  
      isAnimating = true; // Set the animation state to 'running'
      let currentScore = 0;
      const targetScore = parseInt(ratingElem.querySelector(".value").innerText);
  
      const intervalID = setInterval(() => {
        if (currentScore <= targetScore) {
          ratingElem.className = `shortscore shortscore-${currentScore}`;
          currentScore++;
        } else {
          clearInterval(intervalID);
          // Add the 'pressed' class to the rating element
          ratingElem.classList.add("pressed");
          // Remove the 'pressed' class after a short delay
          setTimeout(() => {
            ratingElem.classList.remove("pressed");
            isAnimating = false; // Set the animation state to 'not running'
          }, 500);
        }
      }, 200);
    };
  
    // Create an observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateScore();
            observer.unobserve(ratingElem);
          }
        });
      },
      { threshold: 1 } // Adjust the threshold value here
    );
  
    // Observe the element
    observer.observe(ratingElem);
  
    // Add click event listener
    hreviewElem.addEventListener("click", () => {
      animateScore();
    });
  });
  