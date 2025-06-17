import React from 'react';
import Link from 'next/link';
import Contact from '@/components/myComponent/contact';

export const metadata = {
  title: "Ai DPP Generators for Teachers | Fast and Free ",
  icons: {
    icon: '/teachersaia.png'
  },
  metadataBase: new URL("https://teachersai.learngames.shop"),
  description: "Generate Daily Practice Papers (DPPs) using AI for any class and language. Select class, language & number of questions. Download ready-to-use PDFs instantly.",
  keywords: "AI DPP Generator, teacher tools, create DPPs, practice papers, free DPP creator, Hindi English DPP, class-wise DPP",
  openGraph: {
    title: "AI DPP Generator for Teachers",
    images: [
      {
        url: "/teachersaia.png",
        width: 1200,
        height: 630,
        alt: "Ai Dpp Generators",
      },
    ],
    description: "Select class, language & number of questions. Download DPPs instantly!",
    url: "https://teachersai.learngames.shop/",
    siteName: "AI DPP Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI DPP Generator for Teachers",
    description: "Save time creating DPPs using AI. Select class, language & number of questions to generate a downloadable practice sheet.",
    images: ["/teachersaia.png"],
  }
};

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <header className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/Ai" className="text-2xl font-bold text-blue-700">DPP.AI</Link>
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <a href="#features" className="hover:text-blue-600 font-medium">Features</a>
            <Link href="/Ai" className="hover:text-blue-600 font-medium">Generate</Link>
            <a href="#contact" className="hover:text-blue-600 font-medium">Contact</a>
          </nav>
          <Link href="/Ai" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-semibold">Try Now</Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-28 bg-blue-900 text-white">
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#1e3a8a" fillOpacity="1" d="M0,224L48,197.3C96,171,192,117,288,112C384,107,480,149,576,176C672,203,768,213,864,197.3C960,181,1056,139,1152,106.7C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>
        <div className="text-center max-w-3xl mx-auto px-6 z-10 relative">
          <h1 className="text-3xl md:text-5xl font-extrabold">Create AI-Powered DPPs in Seconds</h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">Choose class, language & question count. Download instant, ready-to-use PDFs. 100% free!</p>
          <Link href="/Ai" className="mt-8 inline-block bg-white text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition">Generate Now</Link>
        </div>
      </section>

      <section id="features" className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Teachers Love It</h2>
          <p className="text-gray-600 text-lg mb-12">Simple. Fast. Effective. All you need to make learning better every day.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["📚 3-Step DPP Creation", "🧑‍🏫 Class 1-10 Support", "🌐 Hindi & English", "⚡ Instant PDF", "🎯 AI-Generated Questions", "🆓 100% Free, No Login"].map((text, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <p className="text-blue-900 font-medium text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-20 px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">New: Chat With Any PDF</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">Upload any PDF — a chapter, worksheet, or notes — and ask questions directly to understand it better. Perfect for students and teachers!</p>
        <Link href="/ChatAi" className="mt-8 inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition">Try PDF Chat</Link>
      </section>

      <Contact />

      <footer className="bg-blue-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">DPP.AI</h3>
            <p className="text-sm text-gray-300">Instant DPP generation using AI — crafted for teachers.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-blue-300">Features</a></li>
              <li><a href="/Ai" className="hover:text-blue-300">Generate DPP</a></li>
              <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://twitter.com/BittuWebDvloper" target="_blank" className="hover:text-blue-300">Twitter</a></li>
              <li><a href="mailto:hellobittukumar12@gmail.com" className="hover:text-blue-300">support@dpp.ai</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">© {new Date().getFullYear()} DPP.AI. All rights reserved.</div>
      </footer>
    </div>
  );
}
