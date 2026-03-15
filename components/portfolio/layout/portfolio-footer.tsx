import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { portfolioBrand } from "../portfolio-content";
import {
  PORTFOLIO_CONTAINER_CLASS_NAME,
  scrollPageToTop,
} from "../portfolio-utils";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

export function PortfolioFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-black py-12 text-white md:py-16">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast" />

      <div className={PORTFOLIO_CONTAINER_CLASS_NAME}>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="font-heading text-3xl md:text-4xl">
              {portfolioBrand.footerPrimaryLabel}{" "}
              <span className="text-electric-yellow">
                {portfolioBrand.footerAccentLabel}
              </span>
            </h3>
            <p className="mt-2 font-body text-sm text-gray-400">
              {portfolioBrand.footerSubtitle}
            </p>
          </motion.div>

          <MagneticActionButton
            type="button"
            onClick={scrollPageToTop}
            className="group border-4 border-white bg-transparent px-6 py-3 transition-colors duration-200 hover:bg-white hover:text-black"
            magnetStrength={0.4}
          >
            <span className="flex items-center gap-2 font-accent font-bold tracking-wider">
              BACK TO TOP
              <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
            </span>
          </MagneticActionButton>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="my-8 h-px bg-gray-800"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row"
        >
          <p className="font-body">
            &copy; {new Date().getFullYear()} {portfolioBrand.footerPrimaryLabel}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2 font-body">
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 fill-hot-magenta text-hot-magenta" />
            </motion.span>
            and lots of coffee
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden">
        <motion.p
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="whitespace-nowrap font-heading text-[20vw] leading-none text-white opacity-[0.02]"
        >
          {portfolioBrand.footerBackgroundWord}
        </motion.p>
      </div>
    </footer>
  );
}
