import { cursor, cursorText } from "@/ts/atoms"
import { motion, useAnimation, useAnimationControls, useMotionValue, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, SVGProps, useState } from "react";

export function Cursor({ param }: any) {
    const [currentCursor, setCursor] = useAtom(cursor);
    const [currentCursorText, setCursorText] = useAtom(cursorText);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 50, stiffness: 1000 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: any) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    // ------------------  default cursor --------------------
    function Icon(props: any) {
        const [variant, setVariant] = useState(currentCursor)
        const cursorVariants = {
            default: { rotate: 0 },
            link: { rotate: 60 },
        };

        return (
            <motion.svg
                variants={cursorVariants}
                style={{ position: "absolute" }}

                initial="default"
                animate={variant}
                xmlns="http://www.w3.org/2000/svg"
                width="10mm"
                height="10mm"
                viewBox="0 0 10 10"
            >
                <path
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="0.689"
                    d="M3.703 1.291l-.46 7.672L5.276 7.16l2.662.545z"
                ></path>
            </motion.svg>
        );
    }

    // ------------------  default cursor --------------------

    // ------------------  cursor circle --------------------

    const Circle = (props: SVGProps<SVGSVGElement>) => {
        const circleVariants = {
            default: { pathLength: 0, opacity: 0 },
            link: { pathLength: 1, opacity: 1 },
        };

        return (
            <motion.svg
                style={{ position: "absolute" }}
                width="15mm"
                height="15mm"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 10"
            >
                <motion.path
                    initial="default"
                    animate={currentCursor === "default" ? "default" : "link"}
                    variants={circleVariants}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                    d="M9.525 5.027a4.498 4.498 0 1 1-1.62-3.457"
                    style={{
                        fill: "none",
                        position: "absolute",
                        fillOpacity: 0.995717,
                        stroke: "#EBEBFF",
                        strokeWidth: 0.8,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        paintOrder: "fill markers stroke",
                    }}
                />
            </motion.svg>
        );
    };
    // ------------------  cursor circle --------------------

    return (
        <motion.div
            animate={currentCursor === "default" ? { scale: 0 } : { scale: 3 }}
            className="cursor"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            more info
        </motion.div>
    );
}
