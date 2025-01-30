"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    function formatPriceInLakhs(price) {

        if (price >= 100) {
            // Convert to crore
            const crore = (price / 100).toFixed(2); // 2 decimal places
            return `${Number(crore).toLocaleString('en-IN')} Cr`;
        } else {
            // Keep it in lakh
            return `${Number(price).toLocaleString('en-IN')} Lakh`;
            // return price;
        }
    }
    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        (<div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}>
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll2 ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}>
                {items.map((player, idx) => (
                    <div
                        key={idx}
                        className="w-72 h-96 p-4 bg-gray-800 dark:bg-gray-900 rounded-xl shadow-xl flex-shrink-0 border border-gray-700 relative transform transition-transform duration-300 hover:scale-110"
                    >
                        <div className="w-full h-2/3 bg-gray-600 rounded-t-xl overflow-hidden flex items-center justify-center">
                            <img
                                src={player.player_image}
                                alt={player.player_name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-4 text-center flex flex-col justify-between h-1/3">
                            <p className="text-lg text-gray-300">Team: {player.player_name}</p>
                            <p className="text-lg text-green-400 font-semibold">
                                Sold Price: {formatPriceInLakhs(player.final_price)}
                            </p>
                            <p className="text-lg text-green-400 font-semibold">
                                Sold To: {player.sold_to_team}
                            </p>
                        </div>
                    </div>
                ))}
            </ul>
        </div>)
    );
};
