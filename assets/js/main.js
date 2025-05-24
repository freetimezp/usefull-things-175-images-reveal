gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({ autoRaf: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document
        .querySelectorAll(".img:not([data-origin])")
        .forEach((img, index) => {
            img.setAttribute("data-origin", index % 2 === 0 ? "left" : "right");
        });

    // Animate each row of images with a single ScrollTrigger
    document.querySelectorAll(".row").forEach((row) => {
        const rowImages = row.querySelectorAll(".img");

        if (rowImages.length > 0) {
            gsap.fromTo(
                rowImages,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    force3D: true,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );
        }
    });

    gsap.to(".work", {
        backgroundPosition: "50% 20%",
        ease: "none",
        scrollTrigger: {
            trigger: ".work",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    // Refresh ScrollTrigger on resize
    window.addEventListener("resize", () => {
        ScrollTrigger.refresh(true);
    });
});
