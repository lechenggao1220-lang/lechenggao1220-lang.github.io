import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────── data ───────────────────── */

const filters = ['全部', '公司新闻', '行业洞察', '产品更新', '科研进展'] as const;
type Filter = (typeof filters)[number];

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: Filter | string;
  image: string;
  readTime?: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: '醉醒完成全生命周期品牌化研究，构建消费级BCI品牌新框架',
    excerpt: '本文提出「心智感官学」概念框架与「六阶品牌化生命周期模型」，填补了消费级BCI感官品牌化的理论空白...',
    date: '2026年6月',
    category: '公司新闻',
    image: '/emotion-data-viz.jpg',
    readTime: '8分钟阅读',
    featured: true,
  },
  {
    id: 2,
    title: '醉醒问心SaaS平台Beta版正式上线',
    excerpt: '经过6个月的内测迭代，醉醒问心平台正式向首批1000名种子用户开放...',
    date: '2026年6月20日',
    category: '产品更新',
    image: '/app-screenshot.jpg',
  },
  {
    id: 3,
    title: 'AI情绪识别准确率突破75%里程碑',
    excerpt: '基于最新CNN+LSTM模型优化，神元设备在四类情绪基态识别测试中达到75.3%的平均准确率...',
    date: '2026年6月15日',
    category: '科研进展',
    image: '/brain-waves-abstract.jpg',
  },
  {
    id: 4,
    title: '良渚文明与脑科学：一场跨越五千年的对话',
    excerpt: '当良渚玉琮的「外方内圆」遇上现代脑机接口，古老智慧为科技品牌注入了前所未有的文化深度...',
    date: '2026年6月10日',
    category: '行业洞察',
    image: '/liangzhu-jade.jpg',
  },
  {
    id: 5,
    title: '醉醒加入中国心理学会，推进BCI行业标准建设',
    excerpt: '正式成为中国心理学会会员单位，标志着醉醒在学术合规和专业性方面获得行业认可...',
    date: '2026年6月5日',
    category: '公司新闻',
    image: '/team-workspace.jpg',
  },
  {
    id: 6,
    title: '神元BCI头戴设备完成工业设计定稿',
    excerpt: '融合良渚玉器美学与现代科技极简主义，神元设备外观设计正式锁定，进入模具开发阶段...',
    date: '2026年5月28日',
    category: '产品更新',
    image: '/product-front.png',
  },
  {
    id: 7,
    title: '2026年中国脑机接口行业深度分析报告发布',
    excerpt: '中国BCI企业超200家，Q1融资38亿元，行业正从「概念验证」走向「合规竞争」...',
    date: '2026年5月20日',
    category: '科研进展',
    image: '/publication-preview.jpg',
  },
];

/* ───────────────────── main page ───────────────────── */

export default function News() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('全部');
  const [email, setEmail] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroFiltersRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const featured = articles.find((a) => a.featured);
  const gridArticles = articles.filter((a) => {
    if (activeFilter === '全部') return !a.featured;
    return !a.featured && a.category === activeFilter;
  });

  useGSAP(() => {
    /* Hero headline */
    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
    /* Hero filter tabs */
    if (heroFiltersRef.current) {
      const tabs = heroFiltersRef.current.querySelectorAll('.filter-tab');
      gsap.fromTo(
        tabs,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.8,
          ease: 'power2.out',
        }
      );
    }

    /* Featured card */
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
      /* Featured image scale */
      const img = featuredRef.current.querySelector('.featured-img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      /* Featured content stagger */
      const content = featuredRef.current.querySelectorAll('.featured-anim');
      gsap.fromTo(
        content,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    /* Article grid */
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.article-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    /* Newsletter CTA */
    if (ctaRef.current) {
      const els = ctaRef.current.querySelectorAll('.cta-anim');
      gsap.fromTo(
        els,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: containerRef });

  /* Re-trigger grid animation on filter change */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.article-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
    );
  }, [activeFilter]);

  return (
    <div ref={containerRef}>
      {/* ─── Section 1: Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center bg-deep-purple overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/news-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/60 via-deep-purple/40 to-deep-purple" />
        </div>
        <div className="relative z-10 text-center max-w-[700px] mx-auto px-6">
          <p className="section-label mb-6">(07) — 动态</p>
          <h1
            ref={heroTitleRef}
            className="font-noto-serif text-display-xl text-white"
          >
            醉醒新鲜事与行业洞见
          </h1>
          <div
            ref={heroFiltersRef}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-tab font-noto-sans text-base transition-colors duration-300 ${
                  activeFilter === f
                    ? 'text-brand-gold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {f}
                {activeFilter === f && (
                  <span className="block h-[1px] bg-brand-gold mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 2: Featured Article ─── */}
      {featured && activeFilter === '全部' && (
        <section className="bg-off-white pt-16 md:pt-20">
          <div className="container-main">
            <div
              ref={featuredRef}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-[55%_45%]"
            >
              {/* Image */}
              <div className="relative h-[300px] lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="featured-img w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-brand-gold text-deep-purple text-xs font-medium tracking-[0.08em] px-4 py-1.5 rounded-full">
                  精选
                </span>
              </div>
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="featured-anim">
                  <span className="inline-block text-xs font-medium text-brand-purple tracking-[0.08em] mb-2">
                    {featured.category}
                  </span>
                  <p className="text-sm text-charcoal/40 mb-4">{featured.date}</p>
                </div>
                <h2 className="featured-anim font-noto-serif text-[clamp(1.5rem,3vw,2.5rem)] text-charcoal leading-snug">
                  {featured.title}
                </h2>
                <p className="featured-anim mt-4 text-charcoal/70 text-base leading-relaxed">
                  {featured.excerpt}
                </p>
                {featured.readTime && (
                  <p className="featured-anim text-sm text-charcoal/40 mt-2">
                    {featured.readTime}
                  </p>
                )}
                <span className="featured-anim inline-block mt-6 text-brand-purple font-medium text-sm link-underline cursor-pointer self-start">
                  阅读全文 →
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Section 3: Article Grid ─── */}
      <section className="bg-off-white pt-12 md:pt-16 pb-24 md:pb-32">
        <div className="container-main">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gridArticles.map((article) => (
              <article
                key={article.id}
                className="article-card bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 ease-smooth cursor-pointer"
              >
                <div className="h-[200px] overflow-hidden bg-off-white">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-medium text-brand-purple tracking-[0.08em] mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-noto-sans text-lg font-medium text-charcoal leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-charcoal/65 text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="text-sm text-charcoal/40 mt-3">{article.date}</p>
                </div>
              </article>
            ))}
          </div>
          {gridArticles.length === 0 && (
            <p className="text-center text-charcoal/50 text-base py-20">
              该分类下暂无文章
            </p>
          )}
        </div>
      </section>

      {/* ─── Section 4: Newsletter CTA ─── */}
      <section className="bg-deep-purple py-20 md:py-24">
        <div className="container-main">
          <div ref={ctaRef} className="max-w-[600px] mx-auto text-center">
            <h2 className="cta-anim font-noto-serif text-display-m text-white">
              订阅醉醒动态
            </h2>
            <p className="cta-anim mt-4 text-white/60 text-base">
              获取最新的产品更新、科研进展和行业洞察
            </p>
            <form
              className="cta-anim flex flex-col sm:flex-row gap-3 mt-8"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail('');
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.08] border border-white/[0.15] rounded-full px-6 py-3.5 text-white placeholder-white/30 text-base outline-none transition-all duration-300 focus:border-brand-gold focus:bg-white/[0.12]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-noto-sans text-base font-medium text-deep-purple transition-all duration-300 hover:scale-[1.03] hover:shadow-gold active:scale-[0.98] shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)',
                }}
              >
                订阅
              </button>
            </form>
            <p className="cta-anim mt-4 text-white/30 text-sm">
              我们尊重你的隐私，随时可以取消订阅
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
