"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface MarketingAnimationProps {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
}

export default function MarketingAnimation({
  className = "",
  autoplay = true,
  loop = true,
  speed = 1,
}: MarketingAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Animación de megáfono/altavoz para marketing digital
    const marketingAnimation = {
      v: "5.7.0",
      fr: 30,
      ip: 0,
      op: 90,
      w: 200,
      h: 200,
      assets: [],
      layers: [
        // Megáfono principal
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Megaphone",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: {
              a: 1,
              k: [
                { t: 0, s: [-10] },
                { t: 45, s: [10] },
                { t: 90, s: [-10] }
              ]
            },
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 0, k: [100, 100, 100] }
          },
          shapes: [
            // Cuerpo del megáfono
            {
              ty: "gr",
              it: [
                {
                  ty: "rc",
                  d: 1,
                  s: { a: 0, k: [50, 30] },
                  p: { a: 0, k: [15, 0] },
                  r: { a: 0, k: 6 }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0.502, 0.757, 0.184, 1] }, // lime-green
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
            // Boca del megáfono
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  d: 1,
                  s: { a: 0, k: [45, 45] },
                  p: { a: 0, k: [45, 0] }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0.8, 1, 0, 1] }, // neon-yellow
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
            // Mango
            {
              ty: "gr",
              it: [
                {
                  ty: "rc",
                  d: 1,
                  s: { a: 0, k: [8, 25] },
                  p: { a: 0, k: [-5, 20] },
                  r: { a: 0, k: 4 }
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
            }
          ]
        },
        // Ondas de sonido 1
        {
          ddd: 0,
          ind: 2,
          ty: 4,
          nm: "Wave1",
          sr: 1,
          ks: {
            o: {
              a: 1,
              k: [
                { t: 0, s: [0] },
                { t: 15, s: [100] },
                { t: 30, s: [0] }
              ]
            },
            r: { a: 0, k: 0 },
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: {
              a: 1,
              k: [
                { t: 0, s: [80, 80, 100] },
                { t: 30, s: [140, 140, 100] }
              ]
            }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  d: 1,
                  s: { a: 0, k: [15, 15] },
                  p: { a: 0, k: [55, 0] }
                },
                {
                  ty: "st",
                  c: { a: 0, k: [0.8, 1, 0, 1] },
                  o: { a: 0, k: 100 },
                  w: { a: 0, k: 3 }
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
            }
          ]
        },
        // Ondas de sonido 2
        {
          ddd: 0,
          ind: 3,
          ty: 4,
          nm: "Wave2",
          sr: 1,
          ks: {
            o: {
              a: 1,
              k: [
                { t: 10, s: [0] },
                { t: 25, s: [100] },
                { t: 40, s: [0] }
              ]
            },
            r: { a: 0, k: 0 },
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: {
              a: 1,
              k: [
                { t: 10, s: [80, 80, 100] },
                { t: 40, s: [160, 160, 100] }
              ]
            }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  d: 1,
                  s: { a: 0, k: [15, 15] },
                  p: { a: 0, k: [55, 0] }
                },
                {
                  ty: "st",
                  c: { a: 0, k: [0.502, 0.757, 0.184, 1] },
                  o: { a: 0, k: 100 },
                  w: { a: 0, k: 3 }
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
            }
          ]
        },
        // Ondas de sonido 3
        {
          ddd: 0,
          ind: 4,
          ty: 4,
          nm: "Wave3",
          sr: 1,
          ks: {
            o: {
              a: 1,
              k: [
                { t: 20, s: [0] },
                { t: 35, s: [100] },
                { t: 50, s: [0] }
              ]
            },
            r: { a: 0, k: 0 },
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: {
              a: 1,
              k: [
                { t: 20, s: [80, 80, 100] },
                { t: 50, s: [180, 180, 100] }
              ]
            }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  d: 1,
                  s: { a: 0, k: [15, 15] },
                  p: { a: 0, k: [55, 0] }
                },
                {
                  ty: "st",
                  c: { a: 0, k: [0.8, 1, 0, 1] },
                  o: { a: 0, k: 100 },
                  w: { a: 0, k: 3 }
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
            }
          ]
        }
      ]
    };

    setAnimationData(marketingAnimation as any);
  }, []);

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (!animationData) {
    return (
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-full w-full text-lime-green"
          >
            <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H10z" />
            <path d="M8.5 12h.01" />
          </svg>
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
