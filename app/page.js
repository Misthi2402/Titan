'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 🔥 Smooth scrolling
    const lenis = new Lenis({ smooth: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 🔥 Configurable values
    const frameCount = 76;       // total frames you have
    const scrollDistance = 2500; // smaller = faster, larger = slower

    const currentFrame = (i) =>
      `/frames/frames_${String(i).padStart(4, "0")}.png`;

    const img = new Image();
    img.src = currentFrame(1);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    let render = (index) => {
      img.src = currentFrame(index);
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    };

    render(1);

    let obj = { frame: 1 };
    gsap.to(obj, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: `+=${scrollDistance}`, // 👈 control playback speed
        scrub: true,
        pin: true,
      },
      onUpdate: () => render(obj.frame),
    });
  }, []);

  return (
    <main style={{ background: "#000", color: "#fff" }}>
      <div className="scroll-container" style={{ height: "100vh" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100vh", display: "block" }}
        />

        {/* Content appears on top */}
        
      </div>

      {/* Next section */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111",
        }}
      >
        <h2 style={{ fontSize: "2rem" }}>✨ Next Section Content</h2>
      </section>
    </main>
  );
}
