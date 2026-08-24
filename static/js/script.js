document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });

});
function closeVotingPopup() {
    const popup = document.getElementById("votingPopup");

    if (popup) {
        popup.style.opacity = "0";
        popup.style.pointerEvents = "none";

        setTimeout(() => {
            popup.style.display = "none";
        }, 250);
    }
}
/* =========================================================
   TECH INNOVA EVENT SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("techInnovaTrack");

    if (!track) {
        return;
    }

    const slides = document.querySelectorAll(".event-slide");

    const dots = document.querySelectorAll(".event-dot");

    const prevButton =
        document.querySelector(".event-prev");

    const nextButton =
        document.querySelector(".event-next");


    let currentSlide = 0;

    let autoSlide;


    function showSlide(index) {

        if (index < 0) {

            currentSlide = slides.length - 1;

        } else if (index >= slides.length) {

            currentSlide = 0;

        } else {

            currentSlide = index;

        }


        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(
            nextSlide,
            4000
        );

    }


    nextButton.addEventListener(
        "click",
        function () {

            nextSlide();

            startAutoSlide();

        }
    );


    prevButton.addEventListener(
        "click",
        function () {

            previousSlide();

            startAutoSlide();

        }
    );


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            function () {

                showSlide(index);

                startAutoSlide();

            }
        );

    });


    /* Start */

    showSlide(0);

    startAutoSlide();

});

/* =========================================================
   VOTING ANNOUNCEMENT SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("votingTrack");

    const slides = document.querySelectorAll(
        ".voting-slide"
    );

    const dots = document.querySelectorAll(
        ".voting-dot"
    );

    const nextButton = document.querySelector(
        ".voting-next"
    );

    const prevButton = document.querySelector(
        ".voting-prev"
    );


    /* CHECK */

    if (!track || slides.length === 0) {
        console.log("Voting slider not found");
        return;
    }


    let currentSlide = 0;

    let autoTimer = null;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showVotingSlide(index) {

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }


        currentSlide = index;


        /* ACTUAL SLIDE MOVEMENT */

        track.style.transform =
            "translateX(-" +
            (currentSlide * 100) +
            "%)";


        /* DOT UPDATE */

        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextVotingSlide() {

        showVotingSlide(
            currentSlide + 1
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousVotingSlide() {

        showVotingSlide(
            currentSlide - 1
        );

    }


    /* =====================================================
       AUTO SLIDE
    ===================================================== */

    function startVotingAutoSlide() {

        clearInterval(autoTimer);

        autoTimer = setInterval(
            nextVotingSlide,
            4000
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextVotingSlide();

                startVotingAutoSlide();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                previousVotingSlide();

                startVotingAutoSlide();

            }
        );

    }


    /* =====================================================
       DOT BUTTONS
    ===================================================== */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                showVotingSlide(index);

                startVotingAutoSlide();

            }
        );

    });


    /* =====================================================
       PAUSE ON MOUSE
    ===================================================== */

    const slider = document.querySelector(
        ".voting-announcement"
    );


    if (slider) {

        slider.addEventListener(
            "mouseenter",
            function () {

                clearInterval(autoTimer);

            }
        );


        slider.addEventListener(
            "mouseleave",
            function () {

                startVotingAutoSlide();

            }
        );

    }


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showVotingSlide(0);

    startVotingAutoSlide();


    console.log(
        "Voting slider started successfully"
    );

});