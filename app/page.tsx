import React from 'react'
import Link from 'next/link'
import Contact from '@/components/myComponent/contact'



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
        url: "/teachersaia.png", // make sure this image is in the /public folder
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
}

export default function Home() {
  return (
    <div>
      <header className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo or Site Name */}
          <a href="/Ai" className="text-2xl font-bold text-blue-700">
            DPP.AI
          </a>

          {/* Navigation (Optional) */}
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <a href="#features" className="hover:text-blue-600 font-medium">Features</a>
            <Link href="/Ai" className="hover:text-blue-600 font-medium">Generate</Link>
            <a href="#contact" className="hover:text-blue-600 font-medium">Contact</a>
          </nav>

          {/* CTA Button */}
          <Link
            href="/Ai"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-semibold"
          >
            Try Now
          </Link>
        </div>
      </header>


      <section className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 bg-blue-900 text-white">
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-900 bg-clip-border animate-gradient-slow opacity-70"></div>

        {/* Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-5xl font-extrabold">
            Generate Daily Practice Papers Instantly with AI
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-100">
            Teachers can select class, language & number of questions — get a DPP in seconds, download and share. Free, fast, and easy.
          </p>
          <Link
            href="/Ai"
            className="mt-8 inline-block bg-white text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Try it Now
          </Link>
        </div>
      </section>


      <section id="features" className="relative bg-blue-50 pb-20 pt-24">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1e3a8a" fillOpacity="1" d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,192C672,160,768,128,864,144C960,160,1056,224,1152,218.7C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Features Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Features Built for Teachers</h2>
          <p className="text-gray-700 mb-12 text-lg">
            Everything you need to create high-quality Daily Practice Papers in seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              "📚 Generate DPPs in 3 easy steps",
              "🧑‍🏫 Class-wise support (1 to 10)",
              "🌐 English & Hindi language options",
              "⚡ Instant download as PDF",
              "🎯 AI-generated high-quality questions",
              "🆓 Free to use, no login required",
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
              >
                <p className="text-blue-900 font-medium text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1e3a8a" fillOpacity="1" d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,192C672,160,768,128,864,144C960,160,1056,224,1152,218.7C1248,213,1344,139,1392,101.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
      </section>


      <section id="for-whom" className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Who Is This Tool For?
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Built to support all types of educators in making learning easier and more effective.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "📘 School Teachers",
                desc: "Quickly create daily practice sheets aligned with class levels.",
              },
              {
                title: "🏫 Coaching Institutes",
                desc: "Speed up worksheet creation and focus on teaching.",
              },
              {
                title: "💻 Online Tutors",
                desc: "Easily generate PDFs and share with students digitally.",
              },
              {
                title: "📱 Parents & Self-learners",
                desc: "Create practice sheets for your child’s revision at home.",
              },
              {
                title: "📝 Competitive Prep Trainers",
                desc: "Daily quizzes for students preparing for exams like NTSE, Olympiads.",
              },
              {
                title: "📄 Content Creators",
                desc: "Design educational content easily for platforms or YouTube.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Create a Daily Practice Paper (DPP) in just a few simple steps — no login, no hassle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {[
              {
                title: "1. Choose Class",
                desc: "Select the class level for which you want to generate a DPP.",
                icon: "🎓",
              },
              {
                title: "2. Pick Language",
                desc: "Choose your preferred language: English or Hindi.",
                icon: "🌐",
              },
              {
                title: "3. Select Questions",
                desc: "Enter the number of questions you want to generate.",
                icon: "✍️",
              },
              {
                title: "4. Download & Share",
                desc: "Generate, download the PDF, and share with your students.",
                icon: "📥",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="testimonials" className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
            What Teachers Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Mrs. Sharma",
                feedback: "I love how fast and easy it is to create DPPs. I can focus more on teaching now!",
              },
              {
                name: "Anil Sir",
                feedback: "Finally a free tool that understands what teachers need. Great job!",
              },
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl shadow">
                <p className="text-gray-700 italic">“{item.feedback}”</p>
                <p className="text-blue-900 font-semibold mt-4">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-blue-50 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Here are answers to some common questions about the AI DPP generator.
          </p>

          <div className="space-y-6 text-left">
            {[
              {
                q: "Is this tool free to use?",
                a: "Yes! It's completely free. You can generate unlimited DPPs without logging in or paying.",
              },
              {
                q: "Do I need to create an account?",
                a: "No account or login is required. Just visit the site, select your options, and download your DPP.",
              },
              {
                q: "Can I use it on my mobile phone?",
                a: "Yes, the website is mobile-friendly. You can generate and download DPPs directly from your smartphone.",
              },
              {
                q: "Which classes are supported?",
                a: "Currently, the tool supports classes 1 to 10 for both Hindi and English medium.",
              },
              {
                q: "Will you add more subjects or features?",
                a: "Yes, we plan to add subject selection, custom questions, and more advanced formatting soon.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
                <h3 className="font-semibold text-blue-800 text-lg mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contact section  */}
      <Contact />


      <footer className="bg-blue-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">DPP.AI</h3>
            <p className="text-sm text-gray-300">
              Instantly generate class-wise DPPs with AI. Save time, teach smarter.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-blue-300">Features</a></li>
              <li><a href="#generator" className="hover:text-blue-300">Generate DPP</a></li>
              <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://twitter.com/BittuWebDvloper" target="_blank" className="hover:text-blue-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:hellobittukumar12@gmail.com" className="hover:text-blue-300">
                  support@dpp.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} DPP.AI. All rights reserved.
        </div>
      </footer>




    </div>
  )
}
