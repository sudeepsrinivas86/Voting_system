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
