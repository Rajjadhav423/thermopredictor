// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


// 'use client'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Waves, Snowflake, ChevronRight, Thermometer, Droplets } from 'lucide-react'

// export default function HomePage() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [waveOffset, setWaveOffset] = useState(0)

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     const animateWaves = () => {
//       setWaveOffset(prev => prev + 0.02)
//     }

//     window.addEventListener('mousemove', handleMouseMove)
//     const interval = setInterval(animateWaves, 16)

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove)
//       clearInterval(interval)
//     }
//   }, [])

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         {/* Ocean Waves Animation */}
//         <svg
//           className="absolute bottom-0 w-full h-64 opacity-30"
//           viewBox="0 0 1200 320"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="rgba(255,255,255,0.1)"
//             d={`M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`}
//             style={{
//               transform: `translateX(${Math.sin(waveOffset) * 20}px)`,
//             }}
//           />
//           <path
//             fill="rgba(255,255,255,0.05)"
//             d={`M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,197.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`}
//             style={{
//               transform: `translateX(${Math.sin(waveOffset + 1) * -15}px)`,
//             }}
//           />
//         </svg>

//         {/* Floating Ice Crystals */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`,
//             }}
//           >
//             <Snowflake
//               className="text-white opacity-20"
//               size={12 + Math.random() * 16}
//               style={{
//                 transform: `rotate(${Math.sin(waveOffset + i) * 360}deg)`,
//               }}
//             />
//           </div>
//         ))}

//         {/* Mouse Follow Effect */}
//         <div
//           className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
//           style={{
//             left: mousePosition.x - 192,
//             top: mousePosition.y - 192,
//           }}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
//         {/* Hero Section */}
//         <div className="mb-16 space-y-6 animate-fade-in">
//           <div className="flex items-center justify-center space-x-4 mb-8">
//             <Waves className="text-cyan-300 animate-bounce" size={48} />
//             <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
//               Water-Enery-Nexus Lab
//             </h1>
//             <Snowflake className="text-blue-200 animate-spin-slow" size={48} />
//           </div>
          
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
//             Explore the fascinating world of ocean dynamics and ice melting patterns. 
//             Powered by advanced AI models for real-time environmental predictions.
//           </p>
//         </div>

//         {/* Navigation Cards */}
//         <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
//           {/* Seawater Prediction Card */}
//           <Link href="/seawater" className="group">
//             <div className="relative bg-gradient-to-br from-blue-800/40 to-cyan-700/40 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-300/50">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-6">
//                   <Droplets className="text-cyan-300 group-hover:scale-110 transition-transform duration-300" size={40} />
//                   <ChevronRight className="text-blue-200 group-hover:translate-x-2 transition-transform duration-300" size={24} />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-4">Seawater Analysis</h3>
//                 <p className="text-blue-100 mb-6 leading-relaxed">
//                   Analyze seawater properties including density, thermal expansion, 
//                   compressibility, and acoustic characteristics based on temperature and salinity.
//                 </p>
                
//                 <div className="flex flex-wrap gap-2">
//                   {['Density', 'Velocity', 'Thermal Expansion', 'Compressibility'].map((tag) => (
//                     <span key={tag} className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </Link>

//           {/* Ice Melting Prediction Card */}
//           <Link href="/ice-melting" className="group">
//             <div className="relative bg-gradient-to-br from-indigo-800/40 to-blue-700/40 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300/50">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-6">
//                   <Thermometer className="text-blue-300 group-hover:scale-110 transition-transform duration-300" size={40} />
//                   <ChevronRight className="text-blue-200 group-hover:translate-x-2 transition-transform duration-300" size={24} />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-4">Ice Melting Point</h3>
//                 <p className="text-blue-100 mb-6 leading-relaxed">
//                   Predict ice melting points based on environmental conditions including 
//                   temperature, seasonal variations, and temporal factors.
//                 </p>
                
//                 <div className="flex flex-wrap gap-2">
//                   {['Temperature', 'Seasonal', 'Temporal', 'Climate'].map((tag) => (
//                     <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </div>

//         {/* Features Section */}
//         <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl w-full">
//           {[
//             { icon: '🌊', title: 'Real-time Analysis', desc: 'Instant predictions with advanced ML models' },
//             { icon: '❄️', title: 'Climate Modeling', desc: 'Comprehensive environmental simulations' },
//             { icon: '📊', title: 'Data Visualization', desc: 'Beautiful charts and interactive displays' }
//           ].map((feature, i) => (
//             <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
//               <div className="text-3xl mb-3">{feature.icon}</div>
//               <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
//               <p className="text-blue-100 text-sm">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 1s ease-out;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }
//       `}</style>
//     </div>
//   )
// }
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Waves, Snowflake, ChevronRight, Thermometer, Droplets, Users, MapPin } from 'lucide-react'

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waveOffset, setWaveOffset] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const animateWaves = () => {
      setWaveOffset(prev => prev + 0.02)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const interval = setInterval(animateWaves, 16)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Ocean Waves Animation */}
        <svg
          className="absolute bottom-0 w-full h-64 opacity-30"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.1)"
            d={`M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`}
            style={{
              transform: `translateX(${Math.sin(waveOffset) * 20}px)`,
            }}
          />
          <path
            fill="rgba(255,255,255,0.05)"
            d={`M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,197.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`}
            style={{
              transform: `translateX(${Math.sin(waveOffset + 1) * -15}px)`,
            }}
          />
        </svg>

        {/* Floating Ice Crystals */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Snowflake
              className="text-white opacity-20"
              size={12 + Math.random() * 16}
              style={{
                transform: `rotate(${Math.sin(waveOffset + i) * 360}deg)`,
              }}
            />
          </div>
        ))}

        {/* Mouse Follow Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero and Main Content Section */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 text-center py-16">
          {/* Hero Section */}
          <div className="mb-16 space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Waves className="text-cyan-300 animate-bounce" size={48} />
              <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Thermopredictor
              </h1>
              <Snowflake className="text-blue-200 animate-spin-slow" size={48} />
            </div>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Explore the fascinating world of ocean dynamics and ice melting patterns. 
              Powered by advanced AI models for real-time environmental predictions.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-16">
            {/* Seawater Prediction Card */}
            <Link href="/seawater" className="group">
              <div className="relative bg-gradient-to-br from-blue-800/40 to-cyan-700/40 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-300/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <Droplets className="text-cyan-300 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <ChevronRight className="text-blue-200 group-hover:translate-x-2 transition-transform duration-300" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Seawater Analysis</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Analyze seawater properties including density, thermal expansion, 
                    compressibility, and acoustic characteristics based on temperature and salinity.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {['Density', 'Velocity', 'Thermal Expansion', 'Compressibility'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Ice Melting Prediction Card */}
            <Link href="/ice-melting" className="group">
              <div className="relative bg-gradient-to-br from-indigo-800/40 to-blue-700/40 backdrop-blur-lg border border-blue-400/30 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300/50">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <Thermometer className="text-blue-300 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <ChevronRight className="text-blue-200 group-hover:translate-x-2 transition-transform duration-300" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Ice Melting Point</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Predict ice melting points based on environmental conditions including 
                    temperature, seasonal variations, and temporal factors.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {['Temperature', 'Seasonal', 'Temporal', 'Climate'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
            {[
              { icon: '🌊', title: 'Real-time Analysis', desc: 'Instant predictions with advanced ML models' },
              { icon: '❄️', title: 'Climate Modeling', desc: 'Comprehensive environmental simulations' },
              { icon: '📊', title: 'Data Visualization', desc: 'Beautiful charts and interactive displays' }
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-blue-100 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Footer */}
        <footer className="relative z-10 mt-auto">
          {/* Divider Wave */}
          <div className="relative">
            <svg
              className="w-full h-12 fill-white/10"
              viewBox="0 0 1200 40"
              preserveAspectRatio="none"
            >
              <path d="M0,20 Q300,0 600,20 T1200,20 L1200,40 L0,40 Z" />
            </svg>
          </div>

          {/* Footer Content */}
          <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-lg border-t border-white/20 py-12">
            <div className="max-w-6xl mx-auto px-4">
              {/* Main Research Info */}
              <div className="text-center mb-8">
                
                
                <p className="text-blue-100 max-w-4xl mx-auto leading-relaxed text-lg mb-6">
                  Developed as a part of the doctoral research project by <span className="font-semibold text-cyan-300">Ms. Nishaben S. Dholakiya</span> under 
                  the supervision of <span className="font-semibold text-cyan-300">Prof. Anirban Roy</span> and <span className="font-semibold text-cyan-300">Prof. Ranjan Dey</span>. 
                  This web-based tool was designed at the Water–Energy–Nexus Lab, serving as a practical implementation 
                  of research findings to enhance accessibility and real-time usability for scientific and policy-making communities.
                </p>
              </div>

              {/* Institution Details */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Research Team */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <Users className="text-blue-300 mr-3" size={24} />
                    <h4 className="text-white font-semibold text-lg">Research Team</h4>
                  </div>
                  <div className="space-y-2 text-blue-100">
                    <p><span className="font-medium">Researcher:</span> Ms. Nishaben S. Dholakiya</p>
                    <p><span className="font-medium">Supervisors:</span></p>
                    <p className="ml-4">• Prof. Anirban Roy</p>
                    <p className="ml-4">• Prof. Ranjan Dey</p>
                  </div>
                </div>

                {/* Institution */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <MapPin className="text-blue-300 mr-3" size={24} />
                    <h4 className="text-white font-semibold text-lg">Institution</h4>
                  </div>
                  <div className="text-blue-100 space-y-1">
                    <p className="font-medium">Water–Energy–Nexus Lab</p>
                    <p>Birla Institute of Technology and Science (BITS) Pilani</p>
                    <p>K.K. Birla Goa Campus</p>
                    <p>Goa, India</p>
                  </div>
                </div>

                {/* Research Impact */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <Waves className="text-blue-300 mr-3" size={24} />
                    <h4 className="text-white font-semibold text-lg">Research Impact</h4>
                  </div>
                  <div className="text-blue-100 space-y-2">
                    <p>• Scientific Community Access</p>
                    <p>• Policy-Making Support</p>
                    <p>• Real-time Environmental Analysis</p>
                    <p>• Climate Research Advancement</p>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-blue-200 text-sm">
                  © 2024 Water–Energy–Nexus Lab, BITS Pilani Goa Campus. 
                  <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0">
                    Developed for advancing environmental research and policy implementation.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}