import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  BarChart3,
  Sparkles,
  Smartphone,
  Users,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Section 1: Hero ─── */
function SectionHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        tabsRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.3'
      );
  }, { scope: sectionRef });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#1A0A2E]"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(91,44,135,0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(91,44,135,0.3) 0%, transparent 60%)',
            animation: 'gradientShift 12s ease-in-out infinite alternate',
          }}
        />
        <style>{`
          @keyframes gradientShift {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(2%, -2%) scale(1.05); }
            66% { transform: translate(-1%, 1%) scale(0.95); }
            100% { transform: translate(1%, -1%) scale(1.02); }
          }
        `}</style>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center container-main">
        <div ref={labelRef} className="section-label mb-6 opacity-0">
          (02) — 产品
        </div>
        <h1
          ref={headlineRef}
          className="font-noto-serif text-display-xl font-bold opacity-0"
        >
          <span className="text-brand-gold">神元</span>
          <span className="text-white/50"> · </span>
          <span className="text-white">问心</span>
        </h1>
        <p
          ref={subRef}
          className="mt-6 text-white/70 text-xl max-w-2xl mx-auto font-noto-sans leading-relaxed opacity-0"
        >
          从脑电采集到情绪洞察，从个人觉察到企业关怀
        </p>

        {/* Product Navigation Tabs */}
        <div
          ref={tabsRef}
          className="mt-12 flex items-center justify-center gap-8 flex-wrap"
        >
          {[
            { label: '神元 BCI', id: 'shenyuan' },
            { label: '醉醒问心', id: 'app-platform' },
            { label: 'EAP服务', id: 'eap-service' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="group relative text-white/50 hover:text-white font-noto-sans text-base transition-colors duration-300 py-2"
            >
              {tab.label}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: 神元 BCI Device ─── */
function SectionShenYuan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<'front' | 'back'>('front');
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        thumbsRef.current?.children || [],
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      const contentEls = contentRef.current?.querySelectorAll('.animate-in');
      if (contentEls) {
        gsap.fromTo(
          contentEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        specsRef.current?.children || [],
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.06,
          duration: 0.4,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: specsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
      transition: 'transform 0.4s ease-out',
    });
  };

  const specs = [
    { label: '通道数', value: '4-8通道' },
    { label: '精度', value: '24bit' },
    { label: '连接', value: '蓝牙5.0' },
    { label: '续航', value: '≥6小时' },
    { label: '重量', value: '≤80g' },
    { label: '准确率', value: '≥75%' },
  ];

  return (
    <section
      id="shenyuan"
      ref={sectionRef}
      className="bg-[#1A0A2E] pt-24 pb-32 lg:pt-40 lg:pb-40"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left - Product Gallery */}
          <div className="lg:col-span-7" ref={imageRef}>
            <div
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Ambient glow behind product */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(91,44,135,0.25) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />
              <div style={tiltStyle}>
                <img
                  key={activeImage}
                  src={activeImage === 'front' ? '/product-front.png' : '/product-back.png'}
                  alt="神元 BCI 头戴设备"
                  className="w-full max-w-lg mx-auto object-contain"
                  style={{
                    animation: 'fadeIn 0.3s ease-out',
                  }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div
              ref={thumbsRef}
              className="flex items-center justify-center gap-4 mt-8"
            >
              {[
                { key: 'front' as const, src: '/product-front.png', label: '正面' },
                { key: 'back' as const, src: '/product-back.png', label: '背面' },
              ].map((thumb) => (
                <button
                  key={thumb.key}
                  onClick={() => setActiveImage(thumb.key)}
                  className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === thumb.key
                      ? 'border-brand-gold opacity-100 shadow-gold'
                      : 'border-white/10 opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.label}
                    className="w-full h-full object-contain bg-[#241538]"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="lg:col-span-5" ref={contentRef}>
            {/* Product Logos */}
            <div className="animate-in flex items-center gap-3 mb-4">
              <img
                src="/shenyuan-brain.png"
                alt="神元 logo"
                className="h-12 w-auto"
              />
              <img
                src="/shenyuan-hex.png"
                alt="神元 hex logo"
                className="h-12 w-auto"
              />
            </div>

            <h2 className="animate-in font-noto-serif text-display-l text-white">
              神元 ShenYuan
            </h2>
            <p className="animate-in mt-2 text-brand-gold text-lg font-noto-sans">
              消费级脑机接口情绪头戴设备
            </p>

            {/* Price */}
            <div className="animate-in mt-6 flex items-center gap-4">
              <span className="font-noto-serif text-display-m text-white">
                ¥399 - ¥599
              </span>
              <span className="px-3 py-1 text-xs font-medium text-brand-gold bg-brand-gold/15 border border-brand-gold/30 rounded-full">
                即将上市
              </span>
            </div>

            {/* Description */}
            <p className="animate-in mt-6 text-white/75 leading-relaxed font-noto-sans">
              非侵入式EEG脑机接口设备，颞区干电极设计，4-8通道采集，24bit精度。蓝牙5.0实时传输，续航≥6小时，重量≤80g。让情绪识别走进每个人的日常生活。
            </p>

            {/* Specs Grid */}
            <div
              ref={specsRef}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-white/5 border border-white/[0.08] rounded-xl p-4"
                >
                  <div className="text-white/50 text-xs tracking-[0.08em] font-noto-sans">
                    {spec.label}
                  </div>
                  <div className="text-white font-medium mt-1 font-noto-sans">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="animate-in mt-8 flex items-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3.5 rounded-full font-noto-sans font-medium transition-all duration-300 hover:shadow-gold hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)',
                  color: '#1A0A2E',
                }}
              >
                预约体验
              </Link>
              <button className="inline-flex items-center px-8 py-3.5 rounded-full border border-white/30 text-white font-noto-sans font-medium transition-all duration-300 hover:bg-white/[0.08] hover:border-white">
                下载产品手册
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

/* ─── Section 3: Feature Details ─── */
function SectionFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: '非侵入式 · 舒适如无形',
      body: '颞区干电极设计，无需导电膏，佩戴如同一副轻量耳机。\u226480g的重量让你几乎忘记它的存在，但它却在默默读懂你的每一次情绪波动。',
      highlight: '\u226480g',
      image: '/eeg-electrode-detail.jpg',
      imageLeft: true,
    },
    {
      title: 'AI · 读懂你的情绪语言',
      body: '基于深度学习算法的情绪识别引擎，精准解码4类情绪基态：平静、愉悦、焦虑、低落。准确率\u226575%，并随着使用持续学习你的独特脑电模式。',
      highlight: null,
      image: '/brain-waves-abstract.jpg',
      imageLeft: false,
    },
    {
      title: '实时 · 此刻的你，一目了然',
      body: '蓝牙5.0低延迟传输，情绪变化毫秒级呈现。无论是在冥想、工作还是休息，你都能即时看见自己的情绪状态，做出及时调整。',
      highlight: null,
      image: '/app-screenshot.jpg',
      imageLeft: true,
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.feature-card');
      cards?.forEach((card) => {
        const img = card.querySelector('.feature-img');
        const content = card.querySelector('.feature-content');
        const isImageLeft = card.classList.contains('image-left');

        gsap.fromTo(
          img,
          { x: isImageLeft ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          content?.children || [],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F0EB] py-20 lg:py-32"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-brand-purple text-xs font-medium tracking-[0.08em] font-noto-sans mb-4">
            核心优势
          </p>
          <h2 className="font-noto-serif text-display-l text-[#2A2A2A]">
            为什么选择神元
          </h2>
        </div>

        {/* Features */}
        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, index) => {
            const bodyText = feature.highlight
              ? feature.body.split(feature.highlight)
              : [feature.body];

            return (
              <div
                key={index}
                className={`feature-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  feature.imageLeft ? 'image-left' : 'image-right'
                }`}
              >
                {/* Image */}
                <div
                  className={`feature-img ${
                    feature.imageLeft
                      ? 'lg:col-span-5'
                      : 'lg:col-span-5 lg:order-2'
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`feature-content ${
                    feature.imageLeft
                      ? 'lg:col-span-7'
                      : 'lg:col-span-7 lg:order-1'
                  }`}
                >
                  <h3 className="font-noto-serif text-display-m text-[#2A2A2A]">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-[#2A2A2A]/75 leading-relaxed text-lg font-noto-sans">
                    {feature.highlight ? (
                      <>
                        {bodyText[0]}
                        <span className="text-brand-purple font-semibold">
                          {feature.highlight}
                        </span>
                        {bodyText[1]}
                      </>
                    ) : (
                      feature.body
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: 醉醒问心 SaaS Platform ─── */
function SectionAppPlatform() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [phoneTilt, setPhoneTilt] = useState<React.CSSProperties>({});

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        phoneRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhoneTilt({
      transform: `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handlePhoneMouseLeave = () => {
    setPhoneTilt({
      transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
      transition: 'transform 0.5s ease-out',
    });
  };

  const features = [
    {
      icon: BarChart3,
      title: '情绪数据可视化',
      desc: '将复杂EEG数据转化为直观的情绪风景图，以色彩、意象、文字构建你的内心地图',
    },
    {
      icon: Sparkles,
      title: 'AI情绪洞察',
      desc: '每周智能分析报告，不只有数据，更有温暖的解读——像朋友一样告诉你情绪的变化',
    },
    {
      icon: Smartphone,
      title: '多平台同步',
      desc: 'iOS、Android、微信小程序、Web端全覆盖，随时随地记录和查看',
    },
    {
      icon: Users,
      title: '社区分享',
      desc: '在安全的社区中分享真实情绪，发现「原来不止我一个人这样」',
    },
  ];

  return (
    <section
      id="app-platform"
      ref={sectionRef}
      className="bg-[#1A0A2E] py-20 lg:py-32"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <img
            src="/shenyuan-hex.png"
            alt="醉醒问心"
            className="w-16 h-16 mx-auto mb-6"
          />
          <h2 className="font-noto-serif text-display-l text-brand-gold">
            醉醒问心
          </h2>
          <p className="mt-4 text-white/70 text-xl font-noto-sans">
            不只是记录，更是懂得
          </p>
        </div>

        {/* Phone Mockup */}
        <div
          ref={phoneRef}
          className="relative max-w-3xl mx-auto mb-16 lg:mb-20"
          onMouseMove={handlePhoneMouseMove}
          onMouseLeave={handlePhoneMouseLeave}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(91,44,135,0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Floating decorative shapes */}
          <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-brand-purple/20 animate-float hidden lg:block" />
          <div
            className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-brand-gold/20 animate-float hidden lg:block"
            style={{ animationDelay: '2s' }}
          />

          <div style={phoneTilt}>
            <div className="relative mx-auto" style={{ maxWidth: '320px' }}>
              {/* Phone frame */}
              <div className="rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-[#1A0A2E]">
                <img
                  src="/app-screenshot.jpg"
                  alt="醉醒问心 App"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
              >
                <Icon className="w-10 h-10 text-brand-gold mb-4" />
                <h3 className="font-noto-sans text-xl font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/65 font-noto-sans leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: Pricing ─── */
function SectionPricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      // Free and Pro first
      gsap.fromTo(
        [cards[0], cards[2]],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Featured (Standard) card - slight delay and scale effect
      gsap.fromTo(
        cards[1],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const plans = [
    {
      name: 'Free',
      price: '¥0',
      period: '/月',
      color: '#2A2A2A',
      features: [
        '基础情绪记录',
        '每日情绪趋势',
        '社区浏览',
        '冥想引导基础版',
      ],
      cta: '免费开始',
      featured: false,
    },
    {
      name: 'Standard',
      price: '¥29.9',
      period: '/月',
      color: '#5B2C87',
      features: [
        'AI情绪洞察报告',
        '历史数据深度分析',
        '个性化训练方案',
        '无广告体验',
        '社区互动权限',
      ],
      cta: '选择Standard',
      featured: true,
    },
    {
      name: 'Pro',
      price: '¥69.9',
      period: '/月',
      color: '#5B2C87',
      features: [
        '神元设备数据同步',
        '专业EEG数据导出',
        '1对1 AI心理助手',
        '高级冥想训练库',
        '企业EAP优先接入',
      ],
      cta: '选择Pro',
      featured: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F0EB] py-20 lg:py-32"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-noto-serif text-display-l text-[#2A2A2A]">
            选择适合你的方案
          </h2>
          <p className="mt-4 text-[#2A2A2A]/60 text-xl font-noto-sans">
            从免费开始，逐步深入情绪觉察的世界
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-white shadow-[0_12px_48px_rgba(91,44,135,0.12)] border-2 border-brand-purple'
                  : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-transparent'
              }`}
            >
              {/* Badge for featured */}
              {plan.featured && (
                <div className="absolute -top-3 right-6">
                  <span className="px-4 py-1 bg-brand-gold text-[#1A0A2E] text-xs font-medium rounded-full">
                    推荐
                  </span>
                </div>
              )}

              <h3
                className="font-noto-serif text-heading-1"
                style={{ color: plan.color }}
              >
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className="font-noto-serif text-display-m"
                  style={{ color: plan.color }}
                >
                  {plan.price}
                </span>
                <span className="text-[#8A8A8A] text-sm font-noto-sans">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: '#5B2C87' }}
                    />
                    <span className="text-[#2A2A2A]/80 font-noto-sans">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {plan.featured ? (
                  <button
                    className="w-full py-3.5 rounded-full font-noto-sans font-medium transition-all duration-300 hover:shadow-gold hover:scale-[1.03] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)',
                      color: '#1A0A2E',
                    }}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button className="w-full py-3.5 rounded-full border-2 font-noto-sans font-medium transition-all duration-300 hover:bg-brand-purple/5 hover:shadow-purple"
                    style={{
                      borderColor: '#5B2C87',
                      color: '#5B2C87',
                    }}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: B端 EAP Service ─── */
function SectionEAP() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const services = [
    {
      name: '企业EAP',
      desc: '设备部署+平台授权+季度心理健康报告+咨询师对接',
      price: '¥3,000-10,000/年',
    },
    {
      name: '高校方案',
      desc: '学生心理健康筛查+情绪数据研究+心理教育课程',
      price: '¥5,000-20,000/年',
    },
    {
      name: '机构合作',
      desc: '咨询师工具授权+客户情绪数据管理+联合品牌',
      price: '¥10,000-30,000/年',
    },
  ];

  return (
    <section
      id="eap-service"
      ref={sectionRef}
      className="bg-[#1A0A2E] py-20 lg:py-32"
    >
      <div className="container-main max-w-4xl mx-auto">
        {/* Content */}
        <div ref={contentRef} className="text-center">
          <p className="section-label mb-4">企业服务</p>
          <h2 className="font-noto-serif text-display-l text-white">
            为企业注入情绪健康的力量
          </h2>
          <p className="mt-6 text-white/75 text-lg font-noto-sans leading-relaxed max-w-3xl mx-auto">
            醉醒EAP（员工帮助计划）为企业、高校和心理咨询机构提供系统化的情绪健康解决方案。通过神元设备+醉醒问心平台+专业咨询服务的组合，帮助组织构建健康、高效的心理工作环境。
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
            >
              <h3 className="font-noto-sans text-xl font-medium text-brand-gold mb-3">
                {service.name}
              </h3>
              <p className="text-white/65 font-noto-sans leading-relaxed text-sm">
                {service.desc}
              </p>
              <p className="mt-4 text-white/80 font-medium font-noto-sans text-sm">
                {service.price}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-noto-sans font-medium transition-all duration-300 hover:shadow-gold hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)',
              color: '#1A0A2E',
            }}
          >
            咨询企业方案
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7: CTA ─── */
function SectionCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current?.querySelectorAll('.cta-animate') || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#1A0A2E] py-20 lg:py-32"
    >
      <div className="container-main text-center">
        <h2 className="cta-animate font-noto-serif text-display-m lg:text-display-l text-white">
          开始你的情绪觉察之旅
        </h2>
        <p className="cta-animate mt-6 text-white/70 text-lg font-noto-sans max-w-2xl mx-auto">
          从下载醉醒问心开始，逐步探索内心世界的奥秘
        </p>
        <div className="cta-animate mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-noto-sans font-medium transition-all duration-300 hover:shadow-gold hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)',
              color: '#1A0A2E',
            }}
          >
            立即开始
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 rounded-full border border-white/30 text-white font-noto-sans font-medium transition-all duration-300 hover:bg-white/[0.08] hover:border-white"
          >
            联系我们
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Product Page ─── */
export default function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <SectionHero />
      <SectionShenYuan />
      <SectionFeatures />
      <SectionAppPlatform />
      <SectionPricing />
      <SectionEAP />
      <SectionCTA />
    </div>
  );
}
