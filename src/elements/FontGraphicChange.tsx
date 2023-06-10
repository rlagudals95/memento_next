import React, { useEffect } from "react"

interface Elements {
  text1: HTMLElement
  text2: HTMLElement
}


export const FontGraphicChange = () => {

  useEffect(() => {
    const text1 = document.getElementById("text1")!!
    const text2 = document.getElementById("text2")!!
    const elts: Elements = {
      text1,
      text2
    };

    const texts: string[] = [
      "You",
      "Should",
      "Die",
      "Mementomori",
      "By",
      "hmk1995",
      ":)",
    ];

    const morphTime: number = 1;
    const cooldownTime: number = 0.25;

    let textIndex: number = texts.length - 1;
    let time: Date = new Date();
    let morph: number = 0;
    let cooldown: number = cooldownTime;

    let textContent = "";

    if (elts.text1) {
      textContent = texts[textIndex % texts.length] as string
      elts.text1.textContent = textContent;
    }

    if (elts.text2) {
      textContent = texts[(textIndex + 1) % texts.length] as string
      elts.text2.textContent = textContent;
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction: number = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setMorph(fraction);
    }

    function setMorph(fraction: number) {
      if (elts.text2) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${fraction ** 0.4 * 100}%`;
      }

      // eslint-disable-next-line no-param-reassign
      fraction = 1 - fraction;

      let text = "";
      if (elts.text1) {
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${fraction ** 0.4 * 100}%`;

        text = texts[textIndex % texts.length] as string;
        elts.text1.textContent = text;
      }

      if (elts.text2) {
        text= texts[(textIndex + 1) % texts.length] as string;
        elts.text2.textContent = text
      }
    }

    function doCooldown() {
      morph = 0;

      if (elts.text2) {
        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";
      }

      if (elts.text1) {
        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      const newTime: Date = new Date();
      const shouldIncrementIndex: boolean = cooldown > 0;
      const dt: number = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex += 1;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

  }, [])

  return (
    <>
      <div id="container">
        <span id="text1"></span>
        <span id="text2"></span>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
    </>
  )
}