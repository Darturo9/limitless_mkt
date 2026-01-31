"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface RocketAnimationProps {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
}

export default function RocketAnimation({
  className = "",
  autoplay = true,
  loop = true,
  speed = 1,
}: RocketAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fallback: simple rocket animation con colores de la marca
    const fallbackAnimation = {
      v: "5.7.0",
      fr: 30,
      ip: 0,
      op: 60,
      w: 200,
      h: 200,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Rocket",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: { a: 0, k: -45 },
            p: {
              a: 1,
              k: [
                { t: 0, s: [100, 150, 0] },
                { t: 60, s: [100, 50, 0] }
              ]
            },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 0, k: [100, 100, 100] }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "rc",
                  d: 1,
                  s: { a: 0, k: [30, 60] },
                  p: { a: 0, k: [0, 0] },
                  r: { a: 0, k: 8 }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0.502, 0.757, 0.184, 1] },
                  o: { a: 0, k: 100 }
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0] },
                  a: { a: 0, k: [0, 0] },
                  s: { a: 0, k: [100, 100] },
                  r: { a: 0, k: 0 },
                  o: { a: 0, k: 100 }
                }
              ]
            },
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  d: 1,
                  s: { a: 0, k: [40, 30] },
                  p: { a: 0, k: [0, 35] }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0.8, 1, 0, 1] },
                  o: {
                    a: 1,
                    k: [
                      { t: 0, s: [100] },
                      { t: 15, s: [60] },
                      { t: 30, s: [100] }
                    ]
                  }
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0] },
                  a: { a: 0, k: [0, 0] },
                  s: {
                    a: 1,
                    k: [
                      { t: 0, s: [100, 100] },
                      { t: 15, s: [120, 80] },
                      { t: 30, s: [100, 100] }
                    ]
                  },
                  r: { a: 0, k: 0 },
                  o: { a: 0, k: 100 }
                }
              ]
            }
          ]
        }
      ]
    };

    setAnimationData(fallbackAnimation as any);
  }, []);

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (!animationData) {
    return (
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center text-4xl">
          🚀
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={autoplay}
        loop={loop}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
