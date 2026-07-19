const nameWrap = document.getElementById("nameWrap");
const scrollHint = document.getElementById("scrollHint");
const profileImg = document.getElementById("profileImg");
const roleText = document.getElementById("roleText");
const accentLine = document.getElementById("accentLine");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function animateOnScroll() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const introProgress = clamp(y / (vh * 0.7), 0, 1);
  const profileProgress = clamp((y - vh * 0.35) / (vh * 0.75), 0, 1);
  const roleProgress = clamp((y - vh * 0.75) / (vh * 0.45), 0, 1);
  const lockProgress = clamp((y - vh * 0.92) / (vh * 0.2), 0, 1);
  const liftProgress = clamp((y - vh * 1.12) / (vh * 0.58), 0, 1);
  const sharedLift = -240 * liftProgress;
  const profileExitProgress = clamp((y - vh * 1.45) / (vh * 0.35), 0, 1);
  const profileOpacity = 1 - profileExitProgress;

  nameWrap.classList.toggle("is-behind", profileProgress > 0.08);
  nameWrap.style.opacity = "1";
  nameWrap.style.transform =
    `translate(-50%, -50%) translateY(${sharedLift}px) scale(1)`;
  nameWrap.style.filter = "blur(0px)";
  scrollHint.style.opacity = String(1 - introProgress * 1.6);

  const imgBaseY = 130 - profileProgress * 145;
  const imgY = imgBaseY + sharedLift;
  const imgScale = 0.72 + profileProgress * 0.35;
  profileImg.style.opacity = String(profileProgress * profileOpacity);
  profileImg.style.transform = `translateY(${imgY}px) scale(${imgScale})`;

  accentLine.style.opacity = String(roleProgress * profileOpacity);
  accentLine.style.transform =
    `translateX(-50%) translateY(${sharedLift}px) scaleX(${roleProgress})`;

  roleText.style.opacity = String(roleProgress * profileOpacity);
  roleText.style.transform =
    `translateX(-50%) translateY(${(1 - roleProgress) * 24 + sharedLift}px)`;
  nameWrap.style.opacity = String(profileOpacity);
}

window.addEventListener("scroll", animateOnScroll, { passive: true });
window.addEventListener("load", animateOnScroll);
window.addEventListener("resize", animateOnScroll);

if (
  window.gsap &&
  window.ScrollTrigger &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".about-section.reveal-section").forEach((section) => {
    const elements = section.querySelectorAll(".about-anim");
    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerWidth <= 520 ? 2200 : 1800}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    aboutTimeline.fromTo(
      elements,
      {
        opacity: 0,
        y: 56,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.32,
        ease: "power3.out"
      }
    );

    aboutTimeline.to({}, { duration: 0.9 });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
