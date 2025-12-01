$('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
});

document.addEventListener("DOMContentLoaded", () => {
    const mainBox = document.querySelector(".main-box");
    const interactiveDots = document.getElementById("interactive-dots");

    const tl = gsap.timeline();
    
    const boxExpansionEnd = 2.2; 

    tl.set(".main-box", {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        transform: 'none',
    });


    tl.to(".main-box", {
        height: '30vh',
        width: '80vw',
        duration: 1.2, 
        delay: 0.5,
        ease: "back.inOut",
    }, 0);

    tl.to(".main-box h1 .char", {
        rotationY: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power3.out",
        stagger: {
            each: 0.3,
            from: "start"
        }
    });
    
    tl.to(".main-box", {
        height: '100vh',
        width: '100vw',
        borderRadius: '0px',
        top: '0%!important',
        duration: 1.2, 
        delay: 1,
        ease: "power3.inOut",
    }, 0);

    tl.to(".main-box h1", {
        fontSize: '10vw',
        mixBlendMode: 'difference',
        duration: 1.2,
        delay: 0.5,
        ease: "back.inOut",
    }, '0.6');
    
    tl.to("#interactive-dots", {
        opacity: 1, 
        scale: 1.1, 
        duration: 1.5, 
        ease: "power2.out"
    }, '1.0'); 

    tl.to(".info", {
        duration: 1.2,
        delay: 0,
        ease: "back.inOut",
    }, '1.6');

    tl.to(".word span", {
        rotationX: 0,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)",
        stagger: {
            amount: 1.0, 
            from: "start"
        }
    }, '+=0.2'); 

    tl.to("section:not(:first-child)", {
        y: 0,
        duration: 1,
        ease: "power3.inOut",
    }, boxExpansionEnd);

    tl.to(".mainImage", {
      transform: 'scale(1)',
      duration: 1.2,
      ease: "power3.in",
      delay: 1,
    }, 1);
    
    tl.set("section:not(:first-child)", {
        position: 'relative'
    }, '+=1');

    if (mainBox && interactiveDots) {
        mainBox.addEventListener('mousemove', (e) => {
            const rect = mainBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            gsap.to(interactiveDots, {
                x: x * 20,
                y: y * 20,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        mainBox.addEventListener('mouseleave', () => {
            gsap.to(interactiveDots, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            });
        });
    }
});

gsap.registerPlugin(ScrollTrigger);


const aboutPFP = ".pfp";
const aboutText = "#about .col-md-8 h3, #about .col-md-8 p, #about button";
const socialIcons = ".social-icons a";

gsap.set([aboutPFP, aboutText, socialIcons], { 
    opacity: 0, 
    y: 50 
});

gsap.timeline({
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
    }
})
.to(aboutPFP, {
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 1.2, 
    ease: "elastic.out(1, 0.5)"
}, "start")
.to(aboutText, {
    opacity: 1, 
    y: 0, 
    duration: 0.8,
    stagger: 0.1, 
    ease: "power2.out"
}, "start+=0.3")
.to(socialIcons, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out"
}, "start+=0.8");

const educationItems = "#education .education-item";

gsap.set(educationItems, { 
    opacity: 0, 
    x: -50 
});

gsap.timeline({
    scrollTrigger: {
        trigger: "#education",
        start: "top 80%", 
        end: "bottom center",
        toggleActions: "play none none none",
    }
})
.to(educationItems, {
    opacity: 1, 
    x: 0, 
    duration: 1, 
    stagger: 0.3, 
    ease: "power2.out"
});

gsap.utils.toArray(".progress-bar").forEach(bar => {
    gsap.set(bar, { width: 0 });

    const skillLevel = bar.getAttribute('data-skill-level');
    
    gsap.to(bar, {
        width: skillLevel + "%",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});


class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair")
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const {
      left,
      top,
      width,
      height
    } = this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top)
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2"
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});