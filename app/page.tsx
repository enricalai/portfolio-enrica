"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

// ========== ARTWORK CATEGORIES ==========
const categories = [
  "All",
  "Pencil",
  "Colored pencil",
  "Black stone",
  "Sanguine/Sepia",
  "Pen",
  "Marker",
  "Watercolor",
  "Acrylic",
  "Digital"
];

// ========== ARTWORKS DATABASE ==========
const artworks = [
  { id: 1, title: "Serge Gainsbourg-1", technique: "Black stone", image: "/images/oeuvres/oeuvre-1.jpg", dimensions: "20x20cm", year: "2025", orientation: "square" },
  { id: 2, title: "Serge Gainsbourg-2", technique: "Black stone", image: "/images/oeuvres/oeuvre-9.jpeg", dimensions: "24x32cm", year: "2019", orientation: "portrait" },
  { id: 3, title: "Jane Birkin", technique: "Acrylic", image: "/images/oeuvres/oeuvre-21.jpg", dimensions: "14x21cm", year: "2024", orientation: "portrait" },
  { id: 4, title: "Manga New Year", technique: "Watercolor", image: "/images/oeuvres/oeuvre-10.jpg", dimensions: "21x29cm", year: "2025", orientation: "portrait" },
  { id: 5, title: "Lemur-1", technique: "Colored pencil", image: "/images/oeuvres/oeuvre-3.jpg", dimensions: "21x29cm", year: "2023", orientation: "portrait" },
  { id: 6, title: "Lemur-2", technique: "Watercolor", image: "/images/oeuvres/oeuvre-11.jpg", dimensions: "21x29cm", year: "2023", orientation: "portrait" },
  { id: 7, title: "Wild Flowers", technique: "Acrylic", image: "/images/oeuvres/oeuvre-22.jpg", dimensions: "21x29cm", year: "2018", orientation: "portrait" },
  { id: 8, title: "I love you Mom", technique: "Pencil", image: "/images/oeuvres/oeuvre-0.jpg", dimensions: "21x29cm", year: "2019", orientation: "portrait" },
  { id: 9, title: "Hillary Clinton", technique: "Marker", image: "/images/oeuvres/oeuvre-20.jpg", dimensions: "14x21cm", year: "2025", orientation: "portrait" },
  { id: 10, title: "Home Alone-Kate McCallister-1", technique: "Digital", image: "/images/oeuvres/oeuvre-18.jpg", dimensions: "Undefined", year: "2025", orientation: "landscape" },
  { id: 11, title: "Home Alone-Kate McCallister-2", technique: "Pen", image: "/images/oeuvres/oeuvre-8.jpg", dimensions: "14x21cm", year: "2025", orientation: "portrait" },
  { id: 12, title: "Italian Girl", technique: "Sanguine/Sepia", image: "/images/oeuvres/oeuvre-5.jpg", dimensions: "14x21cm", year: "2025", orientation: "portrait" },
  { id: 13, title: "Lady with Fruits", technique: "Acrylic", image: "/images/oeuvres/oeuvre-24.jpg", dimensions: "40x50cm", year: "2025", orientation: "portrait" },
  { id: 14, title: "Colored pencil brand comparison", technique: "Colored pencil", image: "/images/oeuvres/oeuvre-2.jpg", dimensions: "14x21cm", year: "2024", orientation: "portrait" },
  { id: 15, title: "Ratatouille, view over Paris", technique: "Acrylic", image: "/images/oeuvres/oeuvre-26.jpg", dimensions: "30x60cm", year: "2025", orientation: "landscape" },
  { id: 16, title: "Harivan'ny mpandeha", technique: "Acrylic", image: "/images/oeuvres/oeuvre-25.jpg", dimensions: "30x60cm", year: "2025", orientation: "landscape" },
  { id: 17, title: "Untitled", technique: "Acrylic", image: "/images/oeuvres/oeuvre-23.jpg", dimensions: "21x29cm", year: "2020", orientation: "portrait" },
  { id: 18, title: "Betsileo", technique: "Marker", image: "/images/oeuvres/oeuvre-19.jpg", dimensions: "14x21cm", year: "2025", orientation: "portrait" },
  { id: 19, title: "Jack and Sally", technique: "Digital", image: "/images/oeuvres/oeuvre-17.jpg", dimensions: "Undefined", year: "2025", orientation: "square" },
  { id: 20, title: "Alice in Wonderland", technique: "Watercolor", image: "/images/oeuvres/oeuvre-15.jpg", dimensions: "14x21cm", year: "2024", orientation: "portrait" },
  { id: 21, title: "Malagasy", technique: "Watercolor", image: "/images/oeuvres/oeuvre-13.jpg", dimensions: "14x21cm", year: "2017", orientation: "portrait" },
  { id: 22, title: "I don't know", technique: "Watercolor", image: "/images/oeuvres/oeuvre-12.jpg", dimensions: "14x21cm", year: "2024", orientation: "portrait" },
  { id: 23, title: "Bubbles", technique: "Colored pencil", image: "/images/oeuvres/oeuvre-6.jpg", dimensions: "14x21cm", year: "2020", orientation: "portrait" },
  { id: 24, title: "Chameleon", technique: "Colored pencil", image: "/images/oeuvres/oeuvre-7.jpg", dimensions: "14x21cm", year: "2025", orientation: "portrait" },
  { id: 25, title: "Manchild", technique: "Digital", image: "/images/oeuvres/oeuvre-16.jpeg", dimensions: "Undefined", year: "2025", orientation: "square" },
  { id: 26, title: "Little Jade", technique: "Watercolor", image: "/images/oeuvres/oeuvre-14.jpg", dimensions: "21x29cm", year: "2021", orientation: "portrait" },
  { id: 27, title: "Chinese Tea Time Party", technique: "Colored pencil", image: "/images/oeuvres/oeuvre-4.jpg", dimensions: "14x21cm", year: "2024", orientation: "portrait" },
];

// ========== HELPER FUNCTION ==========
const getAspectClass = (orientation: string) => {
  switch (orientation) {
    case "landscape":
      return "aspect-video";
    case "square":
      return "aspect-square";
    default:
      return "aspect-[3/4]";
  }
};

// ========== ANIMATION VARIANTS ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -10,
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  }
};

// Animation lettre par lettre
const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4 }
  })
};

// ========== MAIN COMPONENT ==========
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  // Effets parallaxe au scroll
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const portraitBlur = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    emailjs.init({
      publicKey: 'A9Y0CJG-BEYUA3DEL',
    });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredArtworks =
    selectedCategory === "All"
      ? artworks
      : artworks.filter((a) => a.technique === selectedCategory);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormSubmitted(false);
    setFormError(false);
    
    emailjs.sendForm(
      'service_u583m19',
      'template_69nnm59',
      formRef.current!,
      {
        publicKey: 'A9Y0CJG-BEYUA3DEL',
      }
    ).then(
      (result) => {
        console.log('Email envoyé avec succès:', result.text);
        setFormSubmitted(true);
        setFormError(false);
        formRef.current?.reset();
        setTimeout(() => setFormSubmitted(false), 5000);
      },
      (error) => {
        console.log('Erreur EmailJS:', error.text);
        setFormError(true);
        setTimeout(() => setFormError(false), 5000);
      }
    );
  };

  // Découpage du titre en lettres
  const titleText = "Enrica Lai";
  const titleLetters = titleText.split("");

  return (
    <main className="bg-[#FDF9F5] overflow-x-hidden">
      
      {/* ========== STICKY MENU AVEC GLASSMORPHISM ========== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "bg-[#FDF9F5]/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-lg tracking-wide text-[#2B2B2B]"
          >
            Enrica Lai
          </motion.span>
          <div className="flex gap-8 text-[12px] tracking-[0.15em] uppercase">
            {["About", "Work", "Contact"].map((item, idx) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ scale: 1.05, color: "#C47A4D" }}
                className="text-[#555555] hover:text-[#C47A4D] transition-all duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ========== HERO SECTION AVEC PARALLAXE ========== */}
      <motion.section 
        id="home" 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center px-6 md:px-12 pt-28 pb-16 relative overflow-hidden"
      >
        {/* Cercles décoratifs animés */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-20 w-96 h-96 bg-[#C47A4D]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-20 w-96 h-96 bg-[#8B9E8B]/5 rounded-full blur-3xl"
        />
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text avec animation lettre par lettre */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-block px-3 py-1 bg-[#C47A4D]/10 rounded-full mb-6"
              >
                <span className="text-[#C47A4D] text-xs tracking-wider">Visual Artist</span>
              </motion.div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#2B2B2B] leading-tight">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[#555555] text-base leading-relaxed mt-6 max-w-md"
              >
                “And now here is my secret, a very simple secret:
It is only with the heart that one can see rightly;
what is essential is invisible to the eye.”
— The Little Prince
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex gap-4 mt-8"
              >
                <motion.a
                  href="#work"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-[#C47A4D] text-white rounded-full text-sm tracking-wider hover:bg-[#B56A3D] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Gallery
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 border border-[#C47A4D]/30 text-[#C47A4D] rounded-full text-sm tracking-wider hover:bg-[#C47A4D]/5 transition-all duration-300"
                >
                  Contact
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right - Portrait avec effet de flou au scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ 
                scale: portraitScale,
                filter: `blur(${portraitBlur}px)`
              }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#C47A4D]/30 to-[#8B9E8B]/30 blur-2xl"
                />
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl ring-4 ring-[#C47A4D]/20">
                  <Image
                    src="/images/portrait/portrait.jpg"
                    alt="Enrica Lai"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                    quality={100}
                    unoptimized
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========== ABOUT SECTION ========== */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-6 md:px-12 py-20 relative overflow-hidden"
      >
        {/* Décoration flottante */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-64 h-64 bg-[#C47A4D]/5 rounded-full blur-3xl"
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[#C47A4D]/10 rounded-full mb-4">
              <span className="text-[#C47A4D] text-xs tracking-wider">Journey</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#2B2B2B]">About</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <div className="space-y-5 text-[#555555] leading-relaxed font-light">
                <p className="text-lg text-[#C47A4D] italic">
                  "Creativity takes courage" — Henri Matisse
                </p>
                <p>
                  Hey, I'm HANITRINIAINA Lai Troy San Lyzee Enrica. I'm 21, living in
                  Fianarantsoa, and I'm of Chinese-Malagasy descent. Student-wise, I'm into
                  computer science at ENI, but art has been my thing since I was a kid.
                </p>
                <p>
                  Fun fact: back then, my coloring books didn't actually have any coloring in
                  them. Instead of coloring inside the lines, I'd just grab scrap pieces of
                  paper, copy the models, and stuff them inside. At first, I was purely into
                  black and white drawing. But then, photographer Pierrot Men saw my sketches
                  and told me to never stop creating. So I kept going and started experimenting
                  with everything: colored pencils, Pierre Noire, sanguine, sepia...
                </p>
                <p>
                  The real turning point was meeting painter Eliradonirina Razafintsalama. He
                  took me under his wing and introduced me to painting. That was it for me—I
                  just wanted to paint, whether with acrylics or watercolors. Right now, I'm
                  still evolving. I'm just starting to dip my toes into digital art, and even
                  though I'm still learning, I'm honestly super proud of how far I've come.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-8"
            >
              <div>
                <h3 className="font-serif text-xl text-[#C47A4D] mb-3">About Me</h3>
                <p className="text-[#555555] text-sm leading-relaxed">
                  I'm a self-taught visual artist who finds joy in every stroke, whether on 
                  paper or digital. My work reflects my mixed heritage and my love for detail, 
                  texture, and emotion. I constantly seek to learn and evolve, embracing both 
                  traditional and new media.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#C47A4D] mb-4">Techniques</h3>
                <div className="flex flex-wrap gap-2">
                  {["Drawing", "Acrylic painting", "Watercolor", "Digital art", "Illustration", "UI Design"].map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, backgroundColor: "#C47A4D", color: "white" }}
                      className="px-3 py-1 bg-[#C47A4D]/10 rounded-full text-[#555555] text-xs tracking-wide cursor-default transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#C47A4D] mb-3">Exhibitions</h3>
                <ul className="space-y-2 text-[#555555] text-sm">
                  {[
                    "2022 — Iray volan'ny Sary Hosodoko Edition, Sokela Hanigna Fianarantsoa",
                    "2022 — Formes et Couleur sans Limites Edition, Alliance Française, Fianarantsoa",
                    "2025 — Endrika sy Loko tsy Manam-petra Edition, Alliance Française, Fianarantsoa",
                    "2026 — KAFE ROVA, Fianarantsoa"
                  ].map((exhibition, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="text-[#C47A4D]"
                      >
                        ✦
                      </motion.span>
                      <span>{exhibition}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#C47A4D] mb-3">Honors & Awards</h3>
                <ul className="space-y-2 text-[#555555] text-sm">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[#C47A4D]">✦</span>
                    <span>2025 — Knight of the Order of Arts, Letters and Culture, Fianarantsoa, Madagascar</span>
                  </motion.li>
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="border-l-2 border-[#C47A4D]/30 pl-5 py-2"
              >
                <p className="text-[#8B9E8B] text-xs tracking-wider uppercase">
                  "Art is the most beautiful of illusions"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========== GALLERY SECTION ========== */}
      <motion.section
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-6 md:px-12 py-20 bg-[#F5F0EA]"
      >
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[#C47A4D]/10 rounded-full mb-4">
              <span className="text-[#C47A4D] text-xs tracking-wider">Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#2B2B2B]">
              Selected Works
            </h2>
            <p className="text-[#555555] text-sm mt-2 max-w-md">
              Explore by technique
            </p>
          </motion.div>

          {/* Filters avec animations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-[#C47A4D]/10"
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#C47A4D] text-white shadow-md"
                    : "text-[#555555] hover:text-[#C47A4D]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid avec effets stagger et hover */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={cardHover}
                  className={`relative ${getAspectClass(artwork.orientation)} overflow-hidden bg-white rounded-lg shadow-sm group-hover:shadow-xl transition-all duration-500`}
                >
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={95}
                    unoptimized
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-500"
                  />
                </motion.div>
                <div className="mt-3 text-center">
                  <h3 className="font-serif text-base text-[#2B2B2B] group-hover:text-[#C47A4D] transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-[#C47A4D] text-xs tracking-wider mt-0.5">{artwork.technique}</p>
                  <p className="text-[#555555]/60 text-xs mt-0.5">{artwork.dimensions} • {artwork.year}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredArtworks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-[#555555]"
            >
              <p>No artworks in this category.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ========== CONTACT SECTION ========== */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="px-6 md:px-12 py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-64 h-64 bg-[#C47A4D]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[#C47A4D]/10 rounded-full mb-4">
              <span className="text-[#C47A4D] text-xs tracking-wider">Collaborate</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#2B2B2B]">Contact</h2>
            <p className="text-[#555555] text-sm mt-2">
              A project, an exhibition, a collaboration? Let's connect.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Contact Info avec animations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-xl text-[#C47A4D] mb-1">Enrica Lai</h3>
                <p className="text-[#555555] text-sm">Visual Artist</p>
              </div>

              <div className="space-y-3">
                <motion.a
                  href="mailto:laitroysanlyzeeenrica@gmail.com"
                  whileHover={{ x: 5, color: "#C47A4D" }}
                  className="flex items-center gap-3 text-[#555555] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">laitroysanlyzeeenrica@gmail.com</span>
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-[#555555]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Fianarantsoa / Madagascar</span>
                </motion.div>

                <motion.a
                  href="https://wa.me/261328105313"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, color: "#25D366" }}
                  className="flex items-center gap-3 text-[#555555] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">+261 32 81 053 13</span>
                </motion.a>
              </div>

              <div>
                <h3 className="font-serif text-base text-[#2B2B2B] mb-3">Social</h3>
                <div className="flex gap-4">
                  {[
                    { name: "Instagram", href: "https://instagram.com/lai_troysan", color: "hover:text-[#e4405f]" },
                    { name: "Facebook", href: "https://facebook.com/EnricasSketchbook", color: "hover:text-[#1877f2]" },
                    { name: "TikTok", href: "https://tiktok.com/@lyzee_enrica_lai", color: "hover:text-black" }
                  ].map((social, idx) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`text-[#555555] ${social.color} transition-all text-sm`}
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Formulaire EmailJS avec animations */}
            <motion.form
              ref={formRef}
              onSubmit={sendEmail}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-4"
            >
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-white border border-[#C47A4D]/20 focus:border-[#C47A4D] outline-none transition-all rounded-lg"
                required
              />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white border border-[#C47A4D]/20 focus:border-[#C47A4D] outline-none transition-all rounded-lg"
                required
              />
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-[#C47A4D]/20 focus:border-[#C47A4D] outline-none transition-all rounded-lg resize-none"
                required
              />
              
              {/* Message de succès */}
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
              {/* Message d'erreur */}
              {formError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center"
                >
                  ✗ Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-[#C47A4D] text-white rounded-lg text-sm tracking-wider hover:bg-[#B56A3D] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* ========== FOOTER ========== */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="px-6 md:px-12 py-6 text-center border-t border-[#C47A4D]/10"
      >
        <p className="text-[#555555] text-xs">
          Enrica Lai © {new Date().getFullYear()} — All rights reserved
        </p>
      </motion.footer>

    </main>
  );
}