import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface PillarData {
  char: string;
  title: string;
  definition: string;
  image: string;
  quotes: string[];
}

const pillars: PillarData[] = [
  {
    char: '真',
    title: '认知之基',
    definition: '对自我、对世界、对数据的诚实面对。',
    image: '/philosophy-truth.jpg',
    quotes: [
      '真，是海德格尔意义上的"去蔽"——让事物如其所是地显现。',
      'EEG数据不修饰、不美化、不操纵，只呈现。',
    ],
  },
  {
    char: '美',
    title: '感知之桥',
    definition: '对形式、对体验、对存在的审美升华。',
    image: '/philosophy-beauty.jpg',
    quotes: [
      '科技产品承载文化美学，让用户在使用中"不自觉地"被美滋养。',
      '从良渚玉器的弧线，到宋代瓷器的留白。',
    ],
  },
  {
    char: '乐',
    title: '存在之境',
    definition: '对生命、对创造、对连接的深层喜悦。',
    image: '/philosophy-joy.jpg',
    quotes: [
      '不是追逐快乐，而是超越对快乐的追逐。',
      '接纳此刻的全部，反而获得了超越此刻的自由。',
    ],
  },
];

export default function ThreePillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const panel0Ref = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const char0Ref = useRef<HTMLDivElement>(null);
  const char1Ref = useRef<HTMLDivElement>(null);
  const char2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !pinRef.current) return;

    // Set initial states
    gsap.set(panel1Ref.current, { opacity: 0, x: 60 });
    gsap.set(panel2Ref.current, { opacity: 0, y: 60 });
    gsap.set(char1Ref.current, { opacity: 0.1 });
    gsap.set(char2Ref.current, { opacity: 0.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: pinRef.current,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // Phase 1: 真 → 美 (0% to 33%)
    tl.to(
      panel0Ref.current,
      { opacity: 0, x: -60, duration: 1, ease: 'power2.inOut' },
      0.8
    );
    tl.to(
      char0Ref.current,
      { opacity: 0.1, duration: 1, ease: 'power2.inOut' },
      0.8
    );
    tl.to(
      panel1Ref.current,
      { opacity: 1, x: 0, duration: 1, ease: 'power2.inOut' },
      1
    );
    tl.to(
      char1Ref.current,
      { opacity: 1, duration: 1, ease: 'power2.inOut' },
      1
    );

    // Phase 2: 美 → 乐 (33% to 66%)
    tl.to(
      panel1Ref.current,
      { opacity: 0, x: -60, duration: 1, ease: 'power2.inOut' },
      2.2
    );
    tl.to(
      char1Ref.current,
      { opacity: 0.1, duration: 1, ease: 'power2.inOut' },
      2.2
    );
    tl.to(
      panel2Ref.current,
      { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' },
      2.4
    );
    tl.to(
      char2Ref.current,
      { opacity: 1, duration: 1, ease: 'power2.inOut' },
      2.4
    );

    // Line opacity animation synced with scroll
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: true,
          },
        }
      );
    }

    // Set all chars to full opacity initially, they dim during transitions
    gsap.set(char0Ref.current, { opacity: 1 });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current || st.trigger === pinRef.current) {
          st.kill();
        }
      });
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div
        ref={pinRef}
        className="w-full overflow-hidden"
        style={{
          height: '100vh',
          background: '#1A0A2E',
        }}
      >
        {/* Gold vertical line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10"
          style={{ background: '#C9A84C' }}
        />

        {/* Panel 0: 真 */}
        <div
          ref={panel0Ref}
          className="absolute inset-0 flex z-0"
        >
          <div className="w-1/2 flex flex-col justify-center pl-[clamp(24px,5vw,80px)] pr-8 relative">
            <div ref={char0Ref} className="font-noto-serif text-display-xl text-brand-gold select-none">
              真
            </div>
            <h3 className="font-noto-serif text-display-m text-white mt-4">
              {pillars[0].title}
            </h3>
            <p className="font-noto-sans text-body-large text-white/80 mt-4 max-w-md">
              {pillars[0].definition}
            </p>
          </div>
          <div className="w-1/2 relative">
            <img
              src={pillars[0].image}
              alt="真 - 认知之基"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.85)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(91,44,135,0.15)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              {pillars[0].quotes.map((q, i) => (
                <p key={i} className="font-noto-sans text-white/80 text-sm md:text-base leading-relaxed mb-2">
                  {q}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 1: 美 */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 flex z-[1]"
          style={{ opacity: 0 }}
        >
          <div className="w-1/2 flex flex-col justify-center pl-[clamp(24px,5vw,80px)] pr-8 relative">
            <div ref={char1Ref} className="font-noto-serif text-display-xl text-brand-gold select-none">
              美
            </div>
            <h3 className="font-noto-serif text-display-m text-white mt-4">
              {pillars[1].title}
            </h3>
            <p className="font-noto-sans text-body-large text-white/80 mt-4 max-w-md">
              {pillars[1].definition}
            </p>
          </div>
          <div className="w-1/2 relative">
            <img
              src={pillars[1].image}
              alt="美 - 感知之桥"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.85)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(91,44,135,0.15)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              {pillars[1].quotes.map((q, i) => (
                <p key={i} className="font-noto-sans text-white/80 text-sm md:text-base leading-relaxed mb-2">
                  {q}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: 乐 */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 flex z-[2]"
          style={{ opacity: 0 }}
        >
          <div className="w-1/2 flex flex-col justify-center pl-[clamp(24px,5vw,80px)] pr-8 relative">
            <div ref={char2Ref} className="font-noto-serif text-display-xl text-brand-gold select-none">
              乐
            </div>
            <h3 className="font-noto-serif text-display-m text-white mt-4">
              {pillars[2].title}
            </h3>
            <p className="font-noto-sans text-body-large text-white/80 mt-4 max-w-md">
              {pillars[2].definition}
            </p>
          </div>
          <div className="w-1/2 relative">
            <img
              src={pillars[2].image}
              alt="乐 - 存在之境"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.85)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(91,44,135,0.15)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              {pillars[2].quotes.map((q, i) => (
                <p key={i} className="font-noto-sans text-white/80 text-sm md:text-base leading-relaxed mb-2">
                  {q}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
