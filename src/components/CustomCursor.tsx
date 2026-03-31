import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const animate = () => {
      if (curRef.current) {
        curRef.current.style.left = mx + "px";
        curRef.current.style.top = my + "px";
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={curRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          background: "hsl(var(--primary))",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, background 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998]"
        style={{
          border: "1.5px solid hsl(8 100% 56% / 0.5)",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.18s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
