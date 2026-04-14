import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    isSolidNav?: boolean;
}

// 1. Layered 3D Extrusion (Pop-out) - "Paint Layers"
export const Logo1: React.FC<LogoProps> = ({ isSolidNav = true }) => {
    return (
        <motion.div
            className="flex flex-col relative cursor-pointer"
            whileHover="hover"
            initial="rest"
        >
            <motion.span
                className={`text-2xl font-serif font-black tracking-tighter uppercase relative z-20 ${isSolidNav ? 'text-white' : 'text-gray-900'}`}
                variants={{
                    rest: { y: 0, x: 0 },
                    hover: { y: -6, x: -6 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
                SIKANDER <span className="text-secondary">ART</span>
            </motion.span>

            {/* 3D Shadows - Vibrant Paint Layers */}
            {/* Top Red Layer */}
            <motion.span
                className={`absolute top-0 left-0 text-2xl font-serif font-black tracking-tighter uppercase z-10 text-red-500 text-shadow-thin`}
                variants={{
                    rest: { y: 0, x: 0, opacity: 0 },
                    hover: { y: -4, x: -4, opacity: 1 }
                }}
            >
                SIKANDER <span className="text-red-500">ART</span>
            </motion.span>
            {/* Middle Blue Layer */}
            <motion.span
                className="absolute top-0 left-0 text-2xl font-serif font-black tracking-tighter uppercase z-0 text-blue-500"
                variants={{
                    rest: { y: 0, x: 0, opacity: 0 },
                    hover: { y: -2, x: -2, opacity: 1 }
                }}
            >
                SIKANDER <span className="text-blue-500">ART</span>
            </motion.span>
            {/* Bottom Yellow Layer */}
            <motion.span
                className="absolute top-0 left-0 text-2xl font-serif font-black tracking-tighter uppercase -z-10 text-yellow-500"
                variants={{
                    rest: { y: 0, x: 0, opacity: 0 },
                    hover: { y: 0, x: 0, opacity: 1 }
                }}
            >
                SIKANDER <span className="text-yellow-500">ART</span>
            </motion.span>

            {/* Subtitles */}
            <span className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors relative z-20 ${isSolidNav ? 'text-blue-200' : 'text-blue-600'}`}>
                Professional Painting Contractors
            </span>
            <span className={`block md:hidden text-[8px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors relative z-20 ${isSolidNav ? 'text-blue-200' : 'text-blue-600'}`}>
                Painting
            </span>
        </motion.div>
    );
};

// 2. Rotating Flip (Card/Coin Flip) - "Gradient Flow"
export const Logo2: React.FC<LogoProps> = ({ isSolidNav = true }) => {
    return (
        <motion.div
            className="flex flex-col cursor-pointer perspective-1000"
            whileHover="hover"
        >
            <motion.div
                variants={{
                    rest: { rotateX: 0 },
                    hover: { rotateX: 360 }
                }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                className="relative preserve-3d"
            >
                {/* Text with vibrant gradient */}
                <span className={`text-2xl font-serif font-black tracking-tighter uppercase bg-clip-text ${isSolidNav ? 'text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 relative z-10' : 'text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-orange-500 drop-shadow-sm relative z-10'}`}>
                    SIKANDER ART
                </span>
                <span className={`absolute top-[2px] left-0 text-2xl font-serif font-black tracking-tighter uppercase -z-10 ${isSolidNav ? 'text-black/50' : 'text-black/20'} blur-small`}>
                    SIKANDER ART
                </span>
            </motion.div>
            <span className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-purple-200' : 'text-purple-700'}`}>
                Professional Painting Contractors
            </span>
            <span className={`block md:hidden text-[8px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-purple-200' : 'text-purple-700'}`}>
                Painting
            </span>
        </motion.div>
    );
};

// 3. Float & Shift (Holographic/Premium) - "Vibrant Aura"
export const Logo3: React.FC<LogoProps> = ({ isSolidNav = true }) => {
    return (
        <motion.div
            className="flex flex-col cursor-pointer relative"
            whileHover="hover"
            initial="rest"
        >
            <motion.div
                className="relative z-10"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -8 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                <span className={`text-2xl font-serif font-black tracking-tighter uppercase ${isSolidNav ? 'text-white text-shadow-glow' : 'text-gray-900 text-shadow-glow-dark'} relative z-10`}>
                    SIKANDER <span className="text-secondary">ART</span>
                </span>

                {/* Glowing Aura Text behind */}
                <motion.span
                    className="absolute top-0 left-0 text-2xl font-serif font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 -z-10"
                    variants={{
                        rest: { opacity: 0, scale: 1, filter: "blur(0px)" },
                        hover: { opacity: 1, scale: 1.05, filter: "blur(4px)" }
                    }}
                >
                    SIKANDER ART
                </motion.span>
            </motion.div>

            <motion.div
                className={`absolute bottom-4 left-[5%] right-[5%] h-3 rounded-[100%] z-0 ${isSolidNav ? 'bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500' : 'bg-gradient-to-r from-cyan-600 via-pink-600 to-yellow-600'} blur-medium`}
                variants={{
                    rest: { scaleX: 0.8, opacity: 0 },
                    hover: { scaleX: 1, opacity: 0.5, y: 8, filter: "blur(8px)" } // filter property here is actually a motion variant, but blur-medium is static
                }}
            />
            <span className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-pink-200' : 'text-pink-600'}`}>
                Professional Painting Contractors
            </span>
            <span className={`block md:hidden text-[8px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-pink-200' : 'text-pink-600'}`}>
                Painting
            </span>
        </motion.div>
    );
};

// 4. Wavy 3D Bounce (Springy) - "Painter's Palette"
export const Logo4: React.FC<LogoProps> = ({ isSolidNav = true }) => {
    const text1 = "SIKANDER ".split("");
    const text2 = "ART".split("");

    // A palette of vibrant painter colors to assign to letters
    const palette = [
        "text-red-500", "text-orange-500", "text-amber-400",
        "text-green-500", "text-emerald-400", "text-cyan-500",
        "text-blue-500", "text-indigo-500", "text-violet-500",
        "text-fuchsia-500", "text-pink-500", "text-rose-500"
    ];

    return (
        <motion.div
            className="flex flex-col cursor-pointer"
            whileHover="hover"
            initial="rest"
        >
            <div className="flex perspective-800">
                {text1.map((char, i) => (
                    <motion.span
                        key={i}
                        className={`text-2xl font-serif font-black tracking-tighter uppercase relative ${char === ' ' ? 'w-2' : ''}`}
                        variants={{
                            rest: { y: 0, rotateX: 0, rotateY: 0, color: isSolidNav ? '#ffffff' : '#111827' },
                            hover: {
                                y: [0, -8, 0],
                                rotateX: [0, 25, 0],
                                rotateY: [0, i % 2 === 0 ? 15 : -15, 0],
                                // Transition to a vibrant color from the palette on hover
                                color: char !== ' ' ? undefined : (isSolidNav ? '#ffffff' : '#111827'), // Let CSS classes handle the color for non-spaces if we wanted, but Framer Motion handles it here smoothly
                                transition: {
                                    duration: 0.7,
                                    delay: i * 0.05,
                                }
                            }
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* 
                          We use a trick here: The primary text starts white/black, 
                          and on hover we reveal a colored version while fading the original 
                        */}
                        <span className="relative z-10">{char}</span>
                        {char !== ' ' && (
                            <motion.span
                                className={`absolute top-0 left-0 ${palette[i % palette.length]} -z-10`}
                                variants={{
                                    rest: { opacity: 0 },
                                    hover: { opacity: 1 }
                                }}
                            >
                                {char}
                            </motion.span>
                        )}
                    </motion.span>
                ))}
                {text2.map((char, i) => {
                    const idxOffset = text1.length;
                    return (
                        <motion.span
                            key={i}
                            className={`text-2xl font-serif font-black tracking-tighter uppercase relative text-secondary`}
                            variants={{
                                rest: { y: 0, rotateX: 0, rotateY: 0 },
                                hover: {
                                    y: [0, -8, 0],
                                    rotateX: [0, 25, 0],
                                    rotateY: [0, i % 2 === 0 ? 15 : -15, 0],
                                    transition: {
                                        duration: 0.7,
                                        delay: (idxOffset + i) * 0.05,
                                    }
                                }
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <span className="relative z-10">{char}</span>
                            <motion.span
                                className={`absolute top-0 left-0 ${palette[(idxOffset + i) % palette.length]} -z-10`}
                                variants={{
                                    rest: { opacity: 0 },
                                    hover: { opacity: 1, y: 1, x: 1 }
                                }}
                            >
                                {char}
                            </motion.span>
                        </motion.span>
                    );
                })}
            </div>
            <span className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-blue-200' : 'text-gray-500'}`}>
                Professional Painting Contractors
            </span>
            <span className={`block md:hidden text-[8px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-blue-200' : 'text-gray-500'}`}>
                Painting
            </span>
        </motion.div>
    );
};

// 5. Ultimate Combination Logo - "The Masterpiece"
// Combines: Pop-out layers, subtle 3D rotation, vibrant aura, and individual letter coloring
export const Logo5: React.FC<LogoProps> = ({ isSolidNav = true }) => {
    const text1 = "SIKANDER ".split("");
    const text2 = "ART".split("");

    const palette = [
        "text-red-500", "text-orange-500", "text-amber-400",
        "text-green-500", "text-cyan-500", "text-blue-500",
        "text-indigo-500", "text-fuchsia-500", "text-rose-500"
    ];

    return (
        <motion.div
            className="flex flex-col cursor-pointer relative perspective-1200"
            whileHover="hover"
            initial="rest"
        >
            {/* Main Rotating Container (From Logo 2) */}
            <motion.div
                className="relative z-20 flex"
                variants={{
                    rest: { rotateX: 0, rotateY: 0, y: 0 },
                    hover: { rotateX: 15, rotateY: -10, y: -8 } // Subtle Float (Logo 3) + Rotation (Logo 2)
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {text1.map((char, i) => (
                    <motion.span
                        key={i}
                        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black tracking-tighter uppercase relative ${char === ' ' ? 'w-1 sm:w-2' : ''}`}
                        variants={{
                            rest: { y: 0 },
                            hover: {
                                y: [0, -4, 0], // Wavy Bounce (Logo 4)
                                transition: { duration: 0.8, delay: i * 0.05, repeat: Infinity, repeatType: "mirror" }
                            }
                        }}
                    >
                        <span className="relative z-20 text-white">{char}</span>

                        {/* Rainbow Layer 1 (Logo 1 + Logo 4 colors) */}
                        {char !== ' ' && (
                            <motion.span
                                className={`absolute top-0 left-0 ${palette[i % palette.length]} -z-10`}
                                variants={{
                                    rest: { opacity: 0, y: 0, x: 0 },
                                    hover: { opacity: 1, y: 2, x: 2 } // Pop-out effect
                                }}
                            >
                                {char}
                            </motion.span>
                        )}
                        {/* Shadow Layer 2 (Logo 1) */}
                        {char !== ' ' && (
                            <motion.span
                                className={`absolute top-0 left-0 text-black/50 -z-20`}
                                variants={{
                                    rest: { opacity: 0, y: 0, x: 0 },
                                    hover: { opacity: 1, y: 5, x: 5, filter: "blur(2px)" }
                                }}
                            >
                                {char}
                            </motion.span>
                        )}
                    </motion.span>
                ))}

                {text2.map((char, i) => {
                    const idxOffset = text1.length;
                    return (
                        <motion.span
                            key={i}
                            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black tracking-tighter uppercase relative text-secondary`}
                            variants={{
                                rest: { y: 0 },
                                hover: {
                                    y: [0, -4, 0],
                                    transition: { duration: 0.8, delay: (idxOffset + i) * 0.05, repeat: Infinity, repeatType: "mirror" }
                                }
                            }}
                        >
                            <span className="relative z-20">{char}</span>
                            {/* Rainbow Layer 1 */}
                            <motion.span
                                className={`absolute top-0 left-0 ${palette[(idxOffset + i) % palette.length]} -z-10`}
                                variants={{
                                    rest: { opacity: 0, y: 0, x: 0 },
                                    hover: { opacity: 1, y: 2, x: 2 }
                                }}
                            >
                                {char}
                            </motion.span>
                            {/* Shadow Layer 2 */}
                            <motion.span
                                className={`absolute top-0 left-0 text-black/50 -z-20`}
                                variants={{
                                    rest: { opacity: 0, y: 0, x: 0 },
                                    hover: { opacity: 1, y: 5, x: 5, filter: "blur(2px)" }
                                }}
                            >
                                {char}
                            </motion.span>
                        </motion.span>
                    );
                })}
            </motion.div>

            {/* Glowing Aura Text behind (From Logo 3 + Logo 1) */}
            <motion.span
                className="absolute top-0 left-0 right-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black tracking-tighter uppercase text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 -z-30 pointer-events-none"
                variants={{
                    rest: { opacity: 0, scale: 0.9, filter: "blur(0px)", y: 0 },
                    hover: { opacity: 0.7, scale: 1.1, filter: "blur(8px)", y: -4 }
                }}
            >
                SIKANDER ART
            </motion.span>

            {/* Base Aura Shadow (From Logo 3) */}
            <motion.div
                className={`absolute bottom-[20%] left-0 right-0 h-4 rounded-[100%] z-0 pointer-events-none ${isSolidNav ? 'bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500' : 'bg-gradient-to-r from-cyan-600 via-pink-600 to-yellow-600'} blur-large`}
                variants={{
                    rest: { scaleX: 0.5, opacity: 0 },
                    hover: { scaleX: 1, opacity: 0.6, y: 12, filter: "blur(12px)" }
                }}
            />

            <motion.span
                className="hidden md:block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] -mt-1 relative z-40 text-white"
                variants={{
                    rest: { opacity: 0.8, y: 0, letterSpacing: "0.2em" },
                    hover: { opacity: 1, y: 5, letterSpacing: "0.3em", color: isSolidNav ? "#df6311" : "#df6311" } // Shifts to purple tint
                }}
                transition={{ duration: 0.4 }}
            >
                Professional Painting Contractors
            </motion.span>
            <motion.span
  className="block md:hidden text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 relative z-40 text-white"
>
  Professional Painting Contractors
</motion.span>
        </motion.div>
    );
};
