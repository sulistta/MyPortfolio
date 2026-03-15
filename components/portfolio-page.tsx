"use client";

import { useEffect, useRef, useState } from "react";
import type {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Code2,
  Eye,
  Heart,
  Mail,
  MapPin,
  Menu,
  Send,
  X,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaDribbble,
  FaGithub,
  FaLinkedinIn,
  FaWandMagicSparkles,
  FaXTwitter,
} from "react-icons/fa6";
import {
  SiFigma,
  SiGit,
  SiGraphql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

type NavItem = {
  name: string;
  href: string;
};

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

type Skill = {
  name: string;
  icon: IconType;
  color: string;
  level: number;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  color: string;
  accentColor: string;
};

type SocialLink = {
  name: string;
  icon: IconType;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

const STATS: Stat[] = [
  { value: 5, suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 50, suffix: "+", label: "PROJECTS DELIVERED" },
  { value: 999, suffix: "+", label: "CUPS OF COFFEE" },
];

const SKILLS: Skill[] = [
  { name: "React", icon: SiReact, color: "#00F5FF", level: 95 },
  { name: "TypeScript", icon: SiTypescript, color: "#FFE900", level: 90 },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 88 },
  { name: "Node.js", icon: SiNodedotjs, color: "#FF006E", level: 85 },
  { name: "Three.js", icon: SiThreedotjs, color: "#00F5FF", level: 80 },
  { name: "GSAP", icon: FaWandMagicSparkles, color: "#FFE900", level: 85 },
  { name: "Tailwind", icon: RiTailwindCssFill, color: "#00F5FF", level: 95 },
  { name: "Figma", icon: SiFigma, color: "#FF006E", level: 75 },
  { name: "Git", icon: SiGit, color: "#FFE900", level: 90 },
  { name: "GraphQL", icon: SiGraphql, color: "#FF006E", level: 70 },
];

const PROJECTS: Project[] = [
  {
    title: "NEON DREAMS",
    description:
      "An immersive WebGL experience exploring the boundaries of browser-based 3D graphics. Features real-time ray tracing, particle systems, and interactive environments.",
    tech: ["Three.js", "React", "WebGL", "GLSL"],
    color: "#1a0a2e",
    accentColor: "#FF006E",
  },
  {
    title: "CODE CANVAS",
    description:
      "A creative coding platform for artists and developers to experiment with generative art. Includes live preview, code sharing, and community galleries.",
    tech: ["TypeScript", "Canvas API", "Web Workers", "Monaco Editor"],
    color: "#0a1a0a",
    accentColor: "#00F5FF",
  },
  {
    title: "DATA FLOW",
    description:
      "Real-time data visualization dashboard for monitoring complex systems. Processes millions of data points with sub-second latency and beautiful animations.",
    tech: ["D3.js", "React", "WebSocket", "Node.js"],
    color: "#0a0a1a",
    accentColor: "#FFE900",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", icon: FaGithub, href: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { name: "Twitter", icon: FaXTwitter, href: "#" },
  { name: "Dribbble", icon: FaDribbble, href: "#" },
];

const HERO_COPY = "I BUILD DIGITAL EXPERIENCES THAT DEFY EXPECTATIONS";
const SKILL_ROTATIONS = [-8, 7, -6, 5, -4, 8, -5, 6, -7, 4];

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  ...props
}: Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={(event) => {
        if (!ref.current) {
          return;
        }

        const bounds = ref.current.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        setOffset({
          x: (event.clientX - centerX) * strength,
          y: (event.clientY - centerY) * strength,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: number | undefined;
    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(intervalId);
          timeoutId = window.setTimeout(onComplete, 500);
          return 100;
        }

        return current + 15 * Math.random();
      });
    }, 100);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-ink-black flex flex-col items-center justify-center"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="font-heading text-4xl md:text-6xl text-white mb-8">
          LOADING
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>
            ...
          </motion.span>
        </h2>
        <div className="w-64 md:w-96 h-4 bg-gray-800 border-4 border-white overflow-hidden">
          <motion.div
            className="h-full bg-electric-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="font-mono text-white mt-4 text-xl">{Math.min(Math.round(progress), 100)}%</p>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-16 h-16 border-4 border-hot-magenta"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-20 h-20 border-4 border-cyan-blast rounded-full"
      />
    </motion.div>
  );
}

function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const primaryX = useSpring(mouseX, { damping: 25, stiffness: 400 });
  const primaryY = useSpring(mouseY, { damping: 25, stiffness: 400 });
  const trail1X = useSpring(mouseX, { damping: 35, stiffness: 270 });
  const trail1Y = useSpring(mouseY, { damping: 35, stiffness: 270 });
  const trail2X = useSpring(mouseX, { damping: 40, stiffness: 240 });
  const trail2Y = useSpring(mouseY, { damping: 40, stiffness: 240 });
  const trail3X = useSpring(mouseX, { damping: 45, stiffness: 210 });
  const trail3Y = useSpring(mouseY, { damping: 45, stiffness: 210 });
  const trail4X = useSpring(mouseX, { damping: 50, stiffness: 180 });
  const trail4Y = useSpring(mouseY, { damping: 50, stiffness: 180 });

  const trails = [
    { x: trail1X, y: trail1Y, size: 5, opacity: 0.5 },
    { x: trail2X, y: trail2Y, size: 4, opacity: 0.4 },
    { x: trail3X, y: trail3Y, size: 3, opacity: 0.3 },
    { x: trail4X, y: trail4Y, size: 2, opacity: 0.2 },
  ];

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setEnabled(true);
    document.body.classList.add("cursor-hidden");

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);
    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");

    window.addEventListener("mousemove", handleMouseMove);
    targets.forEach((element) => {
      element.addEventListener("mouseenter", handleHoverStart);
      element.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", handleMouseMove);
      targets.forEach((element) => {
        element.removeEventListener("mouseenter", handleHoverStart);
        element.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference" style={{ x: primaryX, y: primaryY }}>
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent"
          animate={{
            width: hovered ? 60 : 24,
            height: hovered ? 60 : 24,
            backgroundColor: hovered ? "rgba(255, 233, 0, 0.3)" : "transparent",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>

      {trails.map((trail, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: trail.x, y: trail.y }}
        >
          <div
            className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-yellow"
            style={{ width: trail.size, height: trail.size, opacity: trail.opacity }}
          />
        </motion.div>
      ))}
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-electric-yellow origin-left z-[100]" style={{ scaleX }} />;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (href: string) => {
    setMenuOpen(false);
    scrollToId(href.replace("#", ""));
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-300 ${
          scrolled ? "bg-off-white/90 backdrop-blur-md border-b-4 border-black" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-heading text-2xl md:text-3xl text-ink-black"
            >
              AR<span className="text-hot-magenta">.</span>
            </motion.button>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="relative font-accent text-sm tracking-wider text-dark-gray hover:text-ink-black transition-colors group"
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-electric-yellow"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}

              <MagneticButton
                type="button"
                onClick={() => navigate("#contact")}
                className="px-5 py-2 bg-black text-white font-accent text-sm tracking-wider border-4 border-black hover:bg-electric-yellow hover:text-black transition-colors"
              >
                HIRE ME
              </MagneticButton>
            </nav>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((current) => !current)}
              className="md:hidden w-12 h-12 bg-black text-white border-4 border-black flex items-center justify-center"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[98] bg-off-white md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(item.href)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="font-heading text-4xl text-ink-black hover:text-hot-magenta transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}

              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => navigate("#contact")}
                className="mt-8 px-8 py-4 bg-hot-magenta text-white font-accent font-bold text-xl tracking-wider border-4 border-black shadow-brutal"
              >
                HIRE ME
              </motion.button>
            </motion.nav>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-10 left-10 w-20 h-20 bg-electric-yellow border-4 border-black"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-20 right-10 w-16 h-16 bg-cyan-blast border-4 border-black rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 100 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((event.clientX - innerWidth / 2) / 50);
      mouseY.set((event.clientY - innerHeight / 2) / 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let index = 0;
    const intervalId = window.setInterval(() => {
      if (index <= HERO_COPY.length) {
        setTypedText(HERO_COPY.slice(0, index));
        index += 1;
        return;
      }

      window.clearInterval(intervalId);
    }, 50);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-off-white">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x, y }}>
        <motion.div
          className="absolute top-[15%] left-[10%] w-32 h-32 bg-electric-yellow border-4 border-black"
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] right-[15%] w-24 h-24 bg-hot-magenta border-4 border-black rounded-full"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[20%] w-20 h-20 bg-cyan-blast border-4 border-black rotate-45"
          animate={{ rotate: [45, 90, 45], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[10%] w-16 h-40 bg-transparent border-4 border-black"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 lg:px-20" style={{ opacity, scale }}>
        <div className="relative">
          <motion.div
            initial={{ x: "-100%", rotate: -10, opacity: 0 }}
            animate={{ x: 0, rotate: -3, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="font-heading text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight text-ink-black">
              VÍTOR
            </h1>
            <motion.div
              className="absolute -bottom-2 left-0 h-4 md:h-6 bg-electric-yellow"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.6, delay: 1 }}
            />
          </motion.div>

          <motion.div
            initial={{ x: "100%", rotate: 10, opacity: 0 }}
            animate={{ x: 0, rotate: 3, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-right -mt-4 md:-mt-8"
          >
            <h1 className="font-heading text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight text-ink-black">
              DEV
            </h1>
            <motion.div
              className="absolute -bottom-2 right-0 h-4 md:h-6 bg-hot-magenta"
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mt-8 md:mt-12 -rotate-2"
          >
            <p className="font-accent text-xl md:text-2xl lg:text-3xl font-bold tracking-widest text-dark-gray uppercase">
              Creative Developer
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-1 w-12 bg-black" />
              <span className="font-body text-sm text-light-gray">&amp; Digital Artist</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 md:mt-16 max-w-2xl">
            <p className="font-body text-lg md:text-xl lg:text-2xl text-ink-black leading-relaxed">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-3 h-6 bg-electric-yellow ml-1"
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mt-12"
          >
            <MagneticButton
              type="button"
              onClick={() => scrollToId("projects")}
              className="group relative px-8 py-4 bg-black text-white font-accent font-bold text-lg tracking-wider border-4 border-black shadow-brutal hover:shadow-brutal-accent transition-shadow duration-200"
              strength={0.4}
            >
              <span className="flex items-center gap-3">
                VIEW MY WORK
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-4 border-black rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-black rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CountUpNumber({ value, suffix }: Pick<Stat, "value" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let startTime: number | undefined;
    let frameId = 0;

    const tick = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * value));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 lg:py-40 bg-soft-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-electric-yellow/10 -skew-x-12 translate-x-1/4" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div className="lg:col-span-5 relative" style={{ y }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative border-4 border-black shadow-brutal-lg bg-white p-4">
                <div className="aspect-[4/5] bg-charcoal relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-electric-yellow border-4 border-black"
                        animate={{ boxShadow: ["8px 8px 0px #000", "12px 12px 0px #FF006E", "8px 8px 0px #000"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="font-heading text-6xl md:text-8xl text-black">AR</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-hot-magenta border-2 border-black" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-cyan-blast border-2 border-black rotate-12" />
                </div>
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={isInView ? { scale: 1, rotate: -5 } : undefined}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-hot-magenta text-white border-4 border-black px-6 py-3 shadow-brutal"
              >
                <span className="font-accent font-bold text-sm tracking-wider">AVAILABLE FOR WORK</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-ink-black mb-8">
              {"ABOUT ME".split("").map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : undefined}
                  transition={{ duration: 0.05, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {character === " " ? "\u00a0" : character}
                </motion.span>
              ))}
            </motion.h2>

            <div className="space-y-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="font-body text-lg text-dark-gray leading-relaxed"
              >
                I&apos;m a <span className="bg-electric-yellow px-1 font-bold">creative developer</span> based in San
                Francisco, crafting immersive digital experiences at the intersection of design and technology. I
                believe code is an art form, and every project is an opportunity to push boundaries.
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="font-body text-lg text-dark-gray leading-relaxed"
              >
                With <span className="border-b-4 border-hot-magenta font-bold">5+ years of experience</span>, I
                specialize in building performant, accessible, and visually stunning web applications that leave lasting
                impressions. From interactive 3D experiences to sleek user interfaces, I bring ideas to life with
                meticulous attention to detail.
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="font-body text-lg text-dark-gray leading-relaxed"
              >
                When I&apos;m not coding, you&apos;ll find me exploring generative art, experimenting with WebGL, or
                hunting for the perfect cup of coffee.
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, boxShadow: "8px 8px 0px #000" }}
                  className="border-4 border-black bg-white p-4 md:p-6 shadow-brutal transition-all duration-200"
                >
                  <div className="font-heading text-3xl md:text-4xl lg:text-5xl text-ink-black">
                    <CountUpNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-accent text-xs md:text-sm tracking-wider text-light-gray mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32 bg-off-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 20px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-1 bg-black" />
            <span className="font-accent text-sm tracking-[0.2em] text-light-gray">WHAT I DO</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-ink-black">SKILL SET</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            const hovered = activeSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ scale: 0, rotate: SKILL_ROTATIONS[index], opacity: 0 }}
                animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill(null)}
                className="relative group"
              >
                <motion.div
                  animate={{
                    y: hovered ? -8 : 0,
                    boxShadow: hovered ? `8px 8px 0px ${skill.color}` : "4px 4px 0px #000",
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative border-4 border-black bg-white p-4 md:p-6 cursor-pointer overflow-hidden"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-4 border-black mb-4 transition-colors duration-200"
                    style={{ backgroundColor: hovered ? skill.color : "transparent" }}
                  >
                    <Icon
                      className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-200"
                      style={{ color: hovered ? "#000" : skill.color }}
                    />
                  </div>

                  <h3 className="font-accent font-bold text-sm md:text-base tracking-wider text-ink-black">
                    {skill.name}
                  </h3>

                  <div className="mt-3 h-2 bg-gray-200 border-2 border-black overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : undefined}
                      transition={{ duration: 1, delay: 0.5 + index * 0.05, ease: "easeOut" }}
                      className="h-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>

                  <motion.div
                    animate={{ opacity: hovered ? 0.1 : 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: skill.color }}
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                  className="absolute -top-2 -right-2 bg-black text-white font-accent text-xs px-2 py-1 border-2 border-white z-10"
                >
                  {skill.level}%
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : undefined}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-1 bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast"
        />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 300 });

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    mouseX.set((event.clientX - centerX) / bounds.width);
    mouseY.set((event.clientY - centerY) / bounds.height);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ rotateY: 90, opacity: 0 }}
      whileInView={{ rotateY: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setHovered(false);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative group"
    >
      <motion.div
        animate={{
          y: hovered ? -12 : 0,
          boxShadow: hovered ? `12px 12px 0px ${project.accentColor}` : "8px 8px 0px #000",
        }}
        transition={{ duration: 0.3 }}
        className="relative border-4 border-black bg-white overflow-hidden"
      >
        <div className="relative h-64 md:h-80 overflow-hidden" style={{ backgroundColor: project.color }}>
          <motion.div animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.5 }} className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {index === 0 && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 border-4 border-black rounded-full"
                    style={{ borderColor: project.accentColor }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-32 h-32 m-auto border-4 border-white rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-4xl text-white">3D</span>
                  </div>
                </>
              )}

              {index === 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, blockIndex) => (
                    <motion.div
                      key={blockIndex}
                      animate={{
                        scale: [1, 1.2, 1],
                        backgroundColor: [project.accentColor, "#fff", project.accentColor],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: blockIndex * 0.1 }}
                      className="w-8 h-8 border-2 border-black"
                    />
                  ))}
                </div>
              )}

              {index === 2 && (
                <>
                  <motion.div
                    animate={{ height: [40, 80, 40] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 bg-white border-2 border-black inline-block mx-1"
                  />
                  <motion.div
                    animate={{ height: [60, 30, 60] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-4 bg-white border-2 border-black inline-block mx-1"
                  />
                  <motion.div
                    animate={{ height: [30, 70, 30] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-4 bg-white border-2 border-black inline-block mx-1"
                  />
                  <motion.div
                    animate={{ height: [50, 40, 50] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-4 bg-white border-2 border-black inline-block mx-1"
                  />
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: hovered ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <div className="flex gap-4">
              <MagneticButton
                type="button"
                className="px-6 py-3 bg-white text-black font-accent font-bold border-4 border-white hover:bg-electric-yellow transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  VIEW
                </span>
              </MagneticButton>
              <MagneticButton
                type="button"
                className="px-6 py-3 bg-transparent text-white font-accent font-bold border-4 border-white hover:bg-white hover:text-black transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  CODE
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="font-heading text-2xl md:text-3xl text-ink-black mb-2">{project.title}</h3>
          <p className="font-body text-sm text-light-gray mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1 font-accent text-xs tracking-wider border-2 border-black"
                style={{ backgroundColor: `${project.accentColor}20` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-l-[60px]"
          style={{ borderTopColor: project.accentColor, borderLeftColor: "transparent" }}
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 lg:py-40 bg-charcoal overflow-hidden">
      <motion.div className="absolute inset-0 opacity-20" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #FF006E 0%, transparent 50%), radial-gradient(circle at 80% 80%, #00F5FF 0%, transparent 50%), radial-gradient(circle at 50% 20%, #FFE900 0%, transparent 40%)",
          }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-1 bg-electric-yellow" />
            <span className="font-accent text-sm tracking-[0.2em] text-gray-400">SELECTED WORK</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-8xl text-white">
            FEATURED
            <span className="block text-electric-yellow">PROJECTS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <ProjectCard project={PROJECTS[0]} index={0} />
          </div>
          <div className="lg:col-span-5 lg:mt-24">
            <ProjectCard project={PROJECTS[1]} index={1} />
          </div>
          <div className="lg:col-span-8 lg:col-start-3 lg:-mt-12">
            <ProjectCard project={PROJECTS[2]} index={2} />
          </div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 md:mt-24 text-center"
        >
          <motion.a
            href="#"
            onClick={(event) => event.preventDefault()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-accent font-bold text-lg tracking-wider border-4 border-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            VIEW ALL PROJECTS
            <ArrowUp className="w-5 h-5 rotate-90" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert("Message sent! (Demo)");
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 lg:py-40 bg-off-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16 md:mb-24">
          <motion.h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-ink-black">
            {["LET'S", "CREATE", "SOMETHING", "AMAZING"].map((word, index) => (
              <motion.span
                key={word}
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-6 font-body text-lg text-light-gray"
          >
            Have a project in mind? Let&apos;s talk about it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { key: "name", label: "YOUR NAME", type: "text" },
                { key: "email", label: "YOUR EMAIL", type: "email" },
              ].map((field, index) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : undefined}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative"
                >
                  <motion.label
                    animate={{
                      y: focusedField === field.key || formData[field.key as keyof typeof formData] ? -28 : 0,
                      scale: focusedField === field.key || formData[field.key as keyof typeof formData] ? 0.85 : 1,
                      color: focusedField === field.key ? "#FF006E" : "#666666",
                    }}
                    className="absolute left-4 top-4 font-accent text-sm tracking-wider origin-left pointer-events-none"
                  >
                    {field.label}
                  </motion.label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-white border-4 border-black font-body text-lg focus:outline-none transition-all duration-200"
                    style={{
                      boxShadow: focusedField === field.key ? "8px 8px 0px #FF006E" : "4px 4px 0px #000",
                    }}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : undefined}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <motion.label
                  animate={{
                    y: focusedField === "message" || formData.message ? -28 : 0,
                    scale: focusedField === "message" || formData.message ? 0.85 : 1,
                    color: focusedField === "message" ? "#FF006E" : "#666666",
                  }}
                  className="absolute left-4 top-4 font-accent text-sm tracking-wider origin-left pointer-events-none"
                >
                  YOUR MESSAGE
                </motion.label>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full px-4 py-4 bg-white border-4 border-black font-body text-lg focus:outline-none transition-all duration-200 resize-none"
                  style={{
                    boxShadow: focusedField === "message" ? "8px 8px 0px #FF006E" : "4px 4px 0px #000",
                  }}
                />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : undefined} transition={{ delay: 0.7 }}>
                <MagneticButton
                  type="submit"
                  className="w-full py-5 bg-hot-magenta text-white font-accent font-bold text-lg tracking-wider border-4 border-black animate-pulse-glow hover:bg-black transition-colors duration-200"
                  strength={0.2}
                >
                  <span className="flex items-center justify-center gap-3">
                    SEND MESSAGE
                    <Send className="w-5 h-5" />
                  </span>
                </MagneticButton>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 p-4 bg-white border-4 border-black shadow-brutal">
                <div className="w-12 h-12 bg-electric-yellow border-4 border-black flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-accent text-xs tracking-wider text-light-gray">EMAIL</p>
                  <p className="font-body text-lg font-bold">hello@alexrivera.dev</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 p-4 bg-white border-4 border-black shadow-brutal">
                <div className="w-12 h-12 bg-cyan-blast border-4 border-black flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-accent text-xs tracking-wider text-light-gray">LOCATION</p>
                  <p className="font-body text-lg font-bold">San Francisco, CA</p>
                </div>
              </motion.div>
            </div>

            <div>
              <p className="font-accent text-sm tracking-wider text-light-gray mb-4">FOLLOW ME</p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      onClick={(event) => event.preventDefault()}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : undefined}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      whileHover={{ rotate: 360, scale: 1.1, boxShadow: "8px 8px 0px #000" }}
                      className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center transition-shadow"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.8 }}
              className="p-6 bg-electric-yellow border-4 border-black shadow-brutal-magenta"
            >
              <p className="font-accent text-sm tracking-wider mb-2">FUN FACT</p>
              <p className="font-body text-dark-gray">
                I once debugged code for 8 hours straight, only to find it was a missing semicolon. Now I use linters
                religiously.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 md:py-16 bg-ink-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center md:text-left">
            <h3 className="font-heading text-3xl md:text-4xl">
              VÍTOR <span className="text-electric-yellow">DEV</span>
            </h3>
            <p className="font-body text-sm text-gray-400 mt-2">Creative Developer &amp; Digital Artist</p>
          </motion.div>

          <MagneticButton
            type="button"
            onClick={scrollToTop}
            className="group px-6 py-3 bg-transparent border-4 border-white hover:bg-white hover:text-black transition-colors duration-200"
            strength={0.4}
          >
            <span className="flex items-center gap-2 font-accent font-bold tracking-wider">
              BACK TO TOP
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </span>
          </MagneticButton>
        </div>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="my-8 h-px bg-gray-800" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400"
        >
          <p className="font-body">&copy; {new Date().getFullYear()} Vítor. All rights reserved.</p>
          <p className="font-body flex items-center gap-2">
            Made with
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="w-4 h-4 text-hot-magenta fill-hot-magenta" />
            </motion.span>
            and lots of coffee
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <motion.p
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="font-heading text-[20vw] leading-none text-white opacity-[0.02] whitespace-nowrap"
        >
          Vítor
        </motion.p>
      </div>
    </footer>
  );
}

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative noise-overlay">
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </motion.main>
      )}
    </>
  );
}
