import { useEffect, useState, type ChangeEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react';

const queryClient = new QueryClient();
const instagramUrl = 'https://www.instagram.com/alautobeauty/';
const phoneUrl = '#';

const services = [
  { no: '01', name: 'Interior reset', detail: 'A thorough, material-safe reset for the places you actually touch.', price: 'from $149' },
  { no: '02', name: 'Paint correction', detail: 'Measured machine polishing that removes haze, swirls and years of neglect.', price: 'from $450' },
  { no: '03', name: 'Ceramic protection', detail: 'Long-term gloss, chemical resistance and a finish that cleans like new.', price: 'from $650' },
];

const gallery = [
  { image: '/assets/finish-detail.jpg', label: 'FINISH / 01', title: 'The light tells the truth', description: 'A ceramic finish is not a filter. It is hours of correction, sealed into every panel.' },
  { image: '/assets/detailing-action.jpg', label: 'PROCESS / 02', title: 'Patience over pressure', description: 'We work panel by panel, with the restraint and precision your paint deserves.' },
  { image: '/assets/hero-truck.jpg', label: 'DELIVERY / 03', title: 'Leave with a different car', description: 'Mobile service, shop-level finish. Omaha metro, on your drive and on your time.' },
];

function InstagramLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noreferrer"
      className={`line-link inline-flex items-center gap-2 text-[11px] font-bold tracking-editorial text-white/75 transition-colors hover:text-white ${className}`}
      data-testid="link-instagram"
    >
      <Instagram size={15} strokeWidth={1.7} />
      <span>@alautobeauty</span>
    </a>
  );
}

function Header({ onQuote }: { onQuote: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = [
    ['work', 'The work'],
    ['services', 'Services'],
    ['story', 'The story'],
  ];
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`fixed left-0 right-0 top-0 z-40 border-b text-white transition-all duration-300 ${scrolled ? 'border-white/10 bg-[#102437]/95 shadow-lg backdrop-blur-md' : 'border-white/15 bg-[#102437]/15'}`}>
      <div className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" data-testid="link-logo">
          <img src="/assets/a1-logo.jpeg" alt="A1 Auto Beauty" className="h-11 w-11 rounded-full object-cover ring-1 ring-white/50" data-testid="img-logo" />
          <div className="hidden sm:block">
            <div className="font-display text-[21px] font-bold uppercase leading-none tracking-[.08em]">A1AutoBeauty</div>
            <div className="mt-1 font-mono-brand text-[8px] uppercase tracking-[.24em] text-white/60">Mobile detailing / Omaha</div>
          </div>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {nav.map(([href, label]) => (
            <a key={href} href={`#${href}`} className="line-link text-[11px] font-bold uppercase tracking-editorial text-white/75 hover:text-white" data-testid={`link-nav-${href}`}>
              {label}
            </a>
          ))}
          <InstagramLink />
        </nav>
        <div className="flex items-center gap-2">
          <a href={phoneUrl} className="hidden items-center gap-2 px-3 py-3 text-[11px] font-bold tracking-editorial text-white/80 transition-colors hover:text-white sm:flex" data-testid="link-header-call">
            <Phone size={14} />
            <span>(XXX) XXX-XXXX</span>
          </a>
          <button onClick={onQuote} className="group flex min-h-11 items-center gap-2 bg-[#f5a623] px-4 text-[11px] font-bold tracking-editorial text-[#102437] transition-colors hover:bg-[#ffc15a]" data-testid="button-header-quote">
            GET A QUOTE <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex min-h-11 min-w-11 items-center justify-center border border-white/30 md:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/15 bg-[#102437]/95 px-5 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            {nav.map(([href, label]) => (
              <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase tracking-editorial text-white/80" data-testid={`link-mobile-${href}`}>{label}</a>
            ))}
            <InstagramLink />
            <a href={phoneUrl} className="flex items-center gap-2 text-sm font-bold text-[#f5a623]" data-testid="link-mobile-call"><Phone size={15} /> (XXX) XXX-XXXX</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="top" className="relative flex min-h-[700px] items-end overflow-hidden bg-[#102437] text-white sm:min-h-[780px]">
      <img src="/assets/hero-truck.jpg" alt="Glossy black Ford F-150 outside a detailing garage" className="hero-image absolute inset-0 h-full w-full object-cover object-center" data-testid="img-hero-truck" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,36,55,.96)_0%,rgba(16,36,55,.72)_42%,rgba(16,36,55,.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,36,55,.9)_0%,transparent_40%)]" />
      <div className="absolute bottom-7 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-editorial text-white/65 sm:flex">
        <span className="h-px w-12 bg-[#f5a623]" /> Omaha metro / mobile service
      </div>
      <div className="relative mx-auto w-full max-w-[1380px] px-5 pb-20 pt-40 sm:px-8 sm:pb-28 lg:px-12">
        <div className="max-w-[780px]">
          <div className="reveal mb-7 flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#f5a623]">
            <span className="h-2 w-2 bg-[#f5a623]" /> Finish first. Always.
          </div>
          <h1 className="reveal reveal-delay-1 text-balance font-display text-[76px] font-bold uppercase leading-[.82] tracking-[-.025em] sm:text-[112px] lg:text-[148px]">
            Your car.<br /><span className="text-[#f5a623]">Done right.</span>
          </h1>
          <div className="reveal reveal-delay-2 mt-8 flex max-w-[560px] flex-col gap-7 sm:flex-row sm:items-end">
            <p className="max-w-[360px] text-[15px] leading-7 text-white/75">Mobile auto detailing for Omaha drivers who notice the difference. Correction, protection, and the kind of clean that holds up in daylight.</p>
            <button onClick={onQuote} className="group flex w-fit min-h-12 items-center gap-3 border border-[#f5a623] bg-[#f5a623] px-5 text-[11px] font-bold tracking-editorial text-[#102437] transition-all hover:bg-transparent hover:text-[#f5a623]" data-testid="button-hero-quote">
              GET A QUOTE <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </button>
          </div>
        </div>
        <div className="reveal reveal-delay-3 mt-20 grid max-w-[660px] grid-cols-3 border-t border-white/25 pt-5">
          <div><div className="font-display text-3xl font-bold">32+</div><div className="mt-1 font-mono-brand text-[8px] uppercase tracking-[.15em] text-white/55">Five-star reviews</div></div>
          <div className="border-l border-white/20 pl-4"><div className="font-display text-3xl font-bold">6</div><div className="mt-1 font-mono-brand text-[8px] uppercase tracking-[.15em] text-white/55">Metro areas</div></div>
          <div className="border-l border-white/20 pl-4"><div className="font-display text-3xl font-bold">A1</div><div className="mt-1 font-mono-brand text-[8px] uppercase tracking-[.15em] text-white/55">By standard</div></div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-[#e7ecee] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
        <div className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#687887]"><span className="text-[#f08f12]">01</span> / A higher standard</div>
        <div>
          <h2 className="text-balance font-display text-[52px] font-bold uppercase leading-[.9] tracking-[-.02em] text-[#102437] sm:text-[78px]">Not a car wash.<br /><span className="text-[#f08f12]">A reset.</span></h2>
          <p className="mt-9 max-w-[570px] text-lg leading-8 text-[#536575]">Your vehicle carries your work, your weekends, and a little bit of your identity. We bring a measured, meticulous approach to every surface — wherever your car lives.</p>
          <div className="mt-12 flex items-center gap-8">
            <div className="flex gap-1" aria-label="5 out of 5 stars"><Star size={16} fill="#f5a623" strokeWidth={0} /><Star size={16} fill="#f5a623" strokeWidth={0} /><Star size={16} fill="#f5a623" strokeWidth={0} /><Star size={16} fill="#f5a623" strokeWidth={0} /><Star size={16} fill="#f5a623" strokeWidth={0} /></div>
            <span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#687887]">32+ verified local reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="services" className="bg-[#102437] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-white/20 pb-6 sm:flex-row sm:items-end">
          <div><div className="mb-4 font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#f5a623]"><span className="text-white/45">02</span> / What we do</div><h2 className="font-display text-6xl font-bold uppercase leading-[.88] sm:text-8xl">The essentials.<br /><span className="text-[#f5a623]">Elevated.</span></h2></div>
          <p className="max-w-[280px] text-sm leading-6 text-white/55">No bloated menu. Just the services that make a visible, lasting difference.</p>
        </div>
        <div className="divide-y divide-white/15 border-t border-white/15">
          {services.map((service) => (
            <button onClick={onQuote} key={service.no} className="group grid w-full grid-cols-[48px_1fr_auto] items-center gap-3 py-7 text-left transition-colors hover:text-[#f5a623] sm:grid-cols-[72px_1fr_220px_130px] sm:gap-5" data-testid={`button-service-${service.no}`}>
              <span className="font-mono-brand text-[11px] text-[#f5a623]">{service.no}</span>
              <span className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">{service.name}</span>
              <span className="hidden max-w-[220px] text-sm leading-6 text-white/50 sm:block">{service.detail}</span>
              <span className="flex items-center justify-end gap-3 font-mono-brand text-[10px] uppercase tracking-[.12em] text-white/50 group-hover:text-[#f5a623]">{service.price}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transformation() {
  const [position, setPosition] = useState(52);
  return (
    <section id="work" className="bg-[#d9e1e3] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div><div className="mb-4 font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#f08f12]"><span className="text-[#687887]">03</span> / The transformation</div><h2 className="text-balance font-display text-6xl font-bold uppercase leading-[.88] text-[#102437] sm:text-8xl">See the<br /><span className="text-[#f08f12]">difference.</span></h2></div>
          <p className="max-w-[500px] text-[15px] leading-7 text-[#536575]">Drag across the King Ranch. This is the same finish before and after a full paint correction and ceramic coating — no color grading, no shortcuts.</p>
        </div>
        <div className="relative mt-14 aspect-[4/3] overflow-hidden bg-[#102437] sm:aspect-[16/8]">
          <img src="/assets/hero-truck.jpg" alt="Ford F-150 King Ranch after paint correction" className="absolute inset-0 h-full w-full object-cover" data-testid="img-transformation-after" />
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
            <div className="relative h-full" style={{ width: `${10000 / position}%` }}>
              <img src="/assets/king-ranch-before.jpg" alt="Ford F-150 King Ranch before paint correction" className="absolute inset-0 h-full w-full max-w-none object-cover object-center" data-testid="img-transformation-before" />
            </div>
            <span className="absolute bottom-5 left-5 font-mono-brand text-[10px] font-bold uppercase tracking-[.16em] text-white">Before / oxidation + swirl</span>
          </div>
          <span className="absolute bottom-5 right-5 font-mono-brand text-[10px] font-bold uppercase tracking-[.16em] text-white">After / corrected + coated</span>
          <div className="absolute inset-y-0 z-10 w-px bg-[#f5a623]" style={{ left: `${position}%` }}><div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f5a623] text-[#102437]"><ChevronLeft size={16} /><ChevronRight size={16} /></div></div>
          <input type="range" min="10" max="90" value={position} onChange={(event) => setPosition(Number(event.target.value))} className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" aria-label="Compare before and after" data-testid="input-transformation-slider" />
        </div>
        <div className="mt-5 flex justify-between font-mono-brand text-[9px] uppercase tracking-[.14em] text-[#687887]"><span>Drag to compare</span><span>2019 Ford F-150 King Ranch / Omaha, NE</span></div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-[#f0a52b] px-5 py-20 text-[#102437] sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <div className="relative order-2 aspect-[4/3] overflow-hidden bg-[#102437] lg:order-1">
          <img src="/assets/detailing-action.jpg" alt="Detailer correcting paint on a pickup hood" className="h-full w-full object-cover grayscale-[.15] mix-blend-normal transition-transform duration-700 hover:scale-105" data-testid="img-story-detailing" />
          <div className="absolute bottom-5 left-5 bg-[#102437] px-3 py-2 font-mono-brand text-[9px] uppercase tracking-[.15em] text-white">Case file / F-150 King Ranch</div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="mb-5 font-mono-brand text-[10px] uppercase tracking-[.2em]"><span className="opacity-55">04</span> / One vehicle, properly considered</div>
          <h2 className="font-display text-6xl font-bold uppercase leading-[.86] sm:text-8xl">The King<br />Ranch<br /><span className="text-white">story.</span></h2>
          <p className="mt-8 max-w-[450px] text-[15px] leading-7 text-[#273c4d]">A 2019 F-150 arrived with tired paint, scattered wash marks, and a finish that had lost its depth. We spent a full day correcting the surface before laying down a ceramic coating built for Nebraska weather.</p>
          <div className="mt-10 grid max-w-[460px] grid-cols-2 border-t border-[#102437]/30 pt-5">
            <div><div className="font-display text-4xl font-bold">1 day</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.13em] opacity-65">Correction time</div></div>
            <div><div className="font-display text-4xl font-bold">2 yr</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.13em] opacity-65">Coating coverage</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(0);
  const item = gallery[active];
  return (
    <section className="bg-[#102437] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><div className="mb-4 font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#f5a623]"><span className="text-white/40">05</span> / From the bay</div><h2 className="font-display text-6xl font-bold uppercase leading-[.86] sm:text-8xl">Finish<br /><span className="text-[#f5a623]">notes.</span></h2></div>
          <InstagramLink className="mb-2 w-fit" />
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#1d3447] sm:aspect-[16/9]">
            <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-opacity duration-300" data-testid={`img-gallery-${active}`} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#102437] to-transparent p-6 pt-16">
              <span className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#f5a623]">{item.label}</span>
              <div className="flex gap-2">
                <button onClick={() => setActive(active === 0 ? gallery.length - 1 : active - 1)} className="flex h-11 w-11 items-center justify-center border border-white/35 transition-colors hover:border-[#f5a623] hover:text-[#f5a623]" aria-label="Previous gallery image" data-testid="button-gallery-prev"><ChevronLeft size={18} /></button>
                <button onClick={() => setActive(active === gallery.length - 1 ? 0 : active + 1)} className="flex h-11 w-11 items-center justify-center border border-white/35 transition-colors hover:border-[#f5a623] hover:text-[#f5a623]" aria-label="Next gallery image" data-testid="button-gallery-next"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="mb-5 h-px w-full bg-white/15" />
            <h3 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">{item.title}</h3>
            <p className="mt-5 max-w-[340px] text-sm leading-6 text-white/55">{item.description}</p>
            <div className="mt-8 flex gap-2">{gallery.map((_, index) => <button key={index} onClick={() => setActive(index)} className={`h-1 flex-1 transition-colors ${active === index ? 'bg-[#f5a623]' : 'bg-white/20'}`} aria-label={`Show gallery item ${index + 1}`} data-testid={`button-gallery-dot-${index}`} />)}</div>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-8 flex w-fit items-center gap-2 border-b border-white/25 pb-2 text-[10px] font-bold uppercase tracking-editorial text-white/70 hover:border-[#f5a623] hover:text-[#f5a623]" data-testid="link-gallery-instagram"><Instagram size={14} /> Follow the work</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section className="bg-[#e7ecee] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.65fr_1.35fr]">
        <div><div className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#f08f12]"><span className="text-[#687887]">06</span> / We come to you</div><h2 className="mt-5 font-display text-6xl font-bold uppercase leading-[.86] text-[#102437] sm:text-8xl">Metro<br /><span className="text-[#f08f12]">coverage.</span></h2></div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-0 border-t border-[#102437]/20 sm:grid-cols-3">
          {['Omaha', 'Papillion', 'Bellevue', 'Elkhorn', 'Gretna', 'Council Bluffs'].map((city, index) => <div key={city} className="flex items-center gap-3 border-b border-[#102437]/20 py-5 text-sm font-bold text-[#102437]"><span className="font-mono-brand text-[9px] text-[#f08f12]">0{index + 1}</span>{city}</div>)}
        </div>
      </div>
    </section>
  );
}

function QuoteModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', notes: '' });
  const update = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [field]: event.target.value });
  const canContinue = service.length > 0;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#102437]/80 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Get a quote">
      <div className="quote-modal relative max-h-[92dvh] w-full max-w-[620px] overflow-y-auto bg-[#e7ecee] text-[#102437] shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-[#102437]/20 hover:bg-[#102437] hover:text-white" aria-label="Close quote dialog" data-testid="button-close-quote"><X size={18} /></button>
        {!submitted ? <div className="p-7 sm:p-12">
          <div className="mb-10 flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#f08f12]"><span>Quote / 0{step}</span><span className="h-px w-12 bg-[#f08f12]" /><span className="text-[#687887]">02</span></div>
          {step === 1 ? <div>
            <h2 className="font-display text-6xl font-bold uppercase leading-[.86]">What does<br />your car<br /><span className="text-[#f08f12]">need?</span></h2>
            <div className="mt-10 grid gap-3">
              {services.map((option) => <button key={option.name} onClick={() => setService(option.name)} className={`flex min-h-16 items-center justify-between border p-4 text-left transition-colors ${service === option.name ? 'border-[#f08f12] bg-[#f0a52b] text-[#102437]' : 'border-[#102437]/20 hover:border-[#102437]'}`} data-testid={`button-quote-service-${option.no}`}><span><span className="block font-bold">{option.name}</span><span className="font-mono-brand text-[9px] uppercase tracking-[.1em] opacity-60">{option.price}</span></span>{service === option.name ? <Check size={18} /> : <ArrowRight size={18} />}</button>)}
            </div>
            <button onClick={() => canContinue && setStep(2)} disabled={!canContinue} className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 bg-[#102437] text-[11px] font-bold tracking-editorial text-white transition-colors hover:bg-[#f08f12] disabled:cursor-not-allowed disabled:opacity-35" data-testid="button-quote-continue">CONTINUE <ArrowRight size={16} /></button>
          </div> : <form onSubmit={(event) => { event.preventDefault(); if (form.name && form.phone && form.vehicle) setSubmitted(true); }}><h2 className="font-display text-6xl font-bold uppercase leading-[.86]">Let's make<br />it <span className="text-[#f08f12]">shine.</span></h2><p className="mt-5 text-sm leading-6 text-[#536575]">Tell us a little about your {service.toLowerCase()}. We’ll follow up with a real estimate, not a range pulled from a template.</p><div className="mt-8 grid gap-5"><label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Name<input required value={form.name} onChange={update('name')} className="min-h-12 border border-[#102437]/20 bg-transparent px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#f08f12]" placeholder="Your name" data-testid="input-quote-name" /></label><label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Phone<input required type="tel" value={form.phone} onChange={update('phone')} className="min-h-12 border border-[#102437]/20 bg-transparent px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#f08f12]" placeholder="(XXX) XXX-XXXX" data-testid="input-quote-phone" /></label><label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Vehicle<input required value={form.vehicle} onChange={update('vehicle')} className="min-h-12 border border-[#102437]/20 bg-transparent px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#f08f12]" placeholder="Year, make and model" data-testid="input-quote-vehicle" /></label><label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em]">Anything we should know? <textarea value={form.notes} onChange={update('notes')} rows={3} className="border border-[#102437]/20 bg-transparent p-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#f08f12]" placeholder="Paint condition, timing, location..." data-testid="input-quote-notes" /></label></div><div className="mt-8 flex gap-3"><button type="button" onClick={() => setStep(1)} className="min-h-12 border border-[#102437]/20 px-5 text-[11px] font-bold tracking-editorial hover:bg-white" data-testid="button-quote-back"><ChevronLeft size={16} /></button><button type="submit" className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#102437] text-[11px] font-bold tracking-editorial text-white hover:bg-[#f08f12]" data-testid="button-quote-submit">SEND MY REQUEST <ArrowRight size={16} /></button></div></form>}
        </div> : <div className="flex min-h-[500px] flex-col items-start justify-center p-7 sm:p-12"><div className="mb-8 flex h-14 w-14 items-center justify-center bg-[#f0a52b]"><Check size={26} /></div><div className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#f08f12]">Request received / A1</div><h2 className="mt-4 font-display text-7xl font-bold uppercase leading-[.84]">We’ll be<br /><span className="text-[#f08f12]">in touch.</span></h2><p className="mt-7 max-w-[390px] text-sm leading-6 text-[#536575]">Thanks, {form.name || 'there'}. We’ll review your {service.toLowerCase()} request and reach out at {form.phone} shortly.</p><button onClick={onClose} className="mt-10 min-h-12 bg-[#102437] px-6 text-[11px] font-bold tracking-editorial text-white hover:bg-[#f08f12]" data-testid="button-quote-done">BACK TO A1AUTOBEAUTY</button></div>}
      </div>
    </div>
  );
}

function FinalCta({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#f0a52b] px-5 py-24 text-[#102437] sm:px-8 sm:py-32 lg:px-12">
      <div className="absolute -right-10 top-0 font-display text-[240px] font-bold leading-none text-[#102437]/[.06] sm:text-[400px]">A1</div>
      <div className="relative mx-auto max-w-[1380px]">
        <div className="font-mono-brand text-[10px] uppercase tracking-[.2em]"><span className="opacity-55">07</span> / Ready when you are</div>
        <h2 className="mt-6 max-w-[900px] font-display text-[82px] font-bold uppercase leading-[.8] tracking-[-.02em] sm:text-[132px]">Put your<br /><span className="text-white">best finish</span><br />forward.</h2>
        <div className="mt-12 flex flex-col items-start gap-7 sm:flex-row sm:items-center"><button onClick={onQuote} className="group flex min-h-14 items-center gap-3 bg-[#102437] px-6 text-[11px] font-bold tracking-editorial text-white transition-colors hover:bg-white hover:text-[#102437]" data-testid="button-final-quote">GET A QUOTE <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button><a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 border-b border-[#102437]/30 pb-2 text-[11px] font-bold tracking-editorial hover:border-[#102437]" data-testid="link-final-instagram"><Instagram size={16} /> SEE @ALAUTOBEAUTY</a></div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="bg-[#102437] px-5 py-10 text-white sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-10 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><img src="/assets/a1-logo.jpeg" alt="A1 Auto Beauty" className="h-12 w-12 rounded-full object-cover" /><span className="font-display text-2xl font-bold uppercase tracking-[.08em]">A1AutoBeauty</span></div><p className="mt-5 max-w-[290px] text-sm leading-6 text-white/50">Mobile detailing for the particular. Omaha, Papillion, Bellevue, Elkhorn, Gretna and Council Bluffs.</p></div><div className="flex flex-col items-start gap-5 sm:items-end"><div className="flex flex-wrap gap-x-6 gap-y-3"><a href={phoneUrl} className="flex items-center gap-2 text-sm font-bold hover:text-[#f5a623]" data-testid="link-footer-call"><Phone size={15} /> (XXX) XXX-XXXX</a><InstagramLink /></div><div className="font-mono-brand text-[9px] uppercase tracking-[.13em] text-white/35">© 2024 A1AutoBeauty / Omaha, Nebraska</div></div></div></footer>;
}

function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return <div className="site-noise min-h-[100dvh] overflow-x-hidden"><Header onQuote={() => setQuoteOpen(true)} /><main><Hero onQuote={() => setQuoteOpen(true)} /><Intro /><Services onQuote={() => setQuoteOpen(true)} /><Transformation /><Story /><Gallery /><ServiceArea /><FinalCta onQuote={() => setQuoteOpen(true)} /></main><Footer />{quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}</div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;