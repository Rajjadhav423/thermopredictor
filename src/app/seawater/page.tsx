// 'use client'
// import { useState } from 'react'
// import { ArrowLeft, Send, Loader2, Waves, Thermometer, Beaker } from 'lucide-react'
// import Link from 'next/link'

// interface SeawaterResult {
//   "Seawater Density (kg/m³)": number
//   "Ultrasonic Velocity (m/s)": number
//   "Thermal Expansion Coefficient (K⁻¹)": number
//   "Adiabatic Compressibility (TPa⁻¹)": number
//   "Isothermal Compressibility (TPa⁻¹)": number
//   "Heat Capacity (kJ/kg·K)": number
//   "Intermolecular Free Length (×10⁻¹¹ m)": number
//   "Internal Pressure (MPa)": number
//   "Cohesion Energy Density (Pa·m)": number
//   "Grüneisen Parameter": number
//   "Acoustic Impedance (×10⁴ kg/m²·s)": number
//   "Non-Linearity Parameter": number
// }

// export default function SeawaterPage() {
//   const [temperature, setTemperature] = useState('')
//   const [salinity, setSalinity] = useState('')
//   const [result, setResult] = useState<SeawaterResult | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
// const Base_url = process.env.NEXT_PUBLIC_BASE_URL

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       // Convert Celsius to Kelvin if needed
//       const tempK = parseFloat(temperature) > 100 ? parseFloat(temperature) : parseFloat(temperature) + 273.15
//       const salinityValue = parseFloat(salinity)

//       // Validate inputs
//       if (tempK < 273.15 || tempK > 373.15) {
//         throw new Error('Temperature must be between 0-100°C (273.15-373.15K)')
//       }
//       if (salinityValue < 0 || salinityValue > 50) {
//         throw new Error('Salinity must be between 0-50 g/kg')
//       }

//       const response = await fetch(`${Base_url}/predict/seawater`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           temperature_k: tempK,
//           salinity_g_kg: salinityValue
//         })
//       });

//       console.log("Response status:", response.status)

//       if (!response.ok) {
//         const errorData = await response.json()
//         console.log("Error details:", errorData)
//         throw new Error(`Prediction failed: ${errorData.detail || 'Unknown error'}`)
//       }

//       const data = await response.json()
//       console.log("Response data:", data)
      
//       // Access the correct field in the response
//       setResult(data.predictions)
//     } catch (err) {
//       console.error("Error:", err)
//       setError(err instanceof Error ? err.message : 'Failed to get prediction. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }


//   const getPropertyIcon = (property: string) => {
//     if (property.includes('Density')) return '⚖️'
//     if (property.includes('Velocity')) return '🌊'
//     if (property.includes('Temperature') || property.includes('Thermal')) return '🌡️'
//     if (property.includes('Compressibility')) return '🔬'
//     if (property.includes('Heat')) return '🔥'
//     if (property.includes('Pressure')) return '💨'
//     if (property.includes('Acoustic')) return '🔊'
//     return '📊'
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 relative overflow-hidden">
//       {/* Animated Ocean Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${1 + Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center mb-8">
//        <Link href="/" className="flex items-center mb-3 text-blue-300 hover:text-blue-200 transition-colors mr-6">
//             <ArrowLeft className="mr-2" size={20} />
//             Back to Home
//           </Link>
//           <div className="flex items-center">
//             <Waves className="text-cyan-300 mr-3" size={32} />
//             <h1 className="text-3xl font-bold text-white">Seawater Analysis</h1>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Form */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
//             <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
//               <Beaker className="mr-3 text-cyan-300" size={24} />
//               Input Parameters
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-cyan-200 text-sm font-medium mb-2">
//                   <Thermometer className="inline mr-2" size={16} />
//                   Temperature (°C or K)
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={temperature}
//                   onChange={(e) => setTemperature(e.target.value)}
//                   className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
//                   placeholder="Enter temperature (0-100°C or 273-373K)..."
//                   required
//                 />
//                 <p className="text-xs text-cyan-300 mt-1">
//                   Values ≤100 treated as °C, &gt;100 as Kelvin
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-cyan-200 text-sm font-medium mb-2">
//                   <Waves className="inline mr-2" size={16} />
//                   Salinity (g/kg)
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={salinity}
//                   onChange={(e) => setSalinity(e.target.value)}
//                   className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
//                   placeholder="Enter salinity (0-50 g/kg)..."
//                   required
//                 />
//                 <p className="text-xs text-cyan-300 mt-1">
//                   Range: 0-50 g/kg (typical seawater: ~35 g/kg)
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" size={20} />
//                     Analyzing...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="mr-2" size={20} />
//                     Analyze Seawater
//                   </>
//                 )}
//               </button>
//             </form>

//             {error && (
//               <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
//                 <strong>Error:</strong> {error}
//               </div>
//             )}
//           </div>

//           {/* Results */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
//             <h2 className="text-2xl font-semibold text-white mb-6">Analysis Results</h2>

//             {result ? (
//               <div className="space-y-4 max-h-96 overflow-y-auto custom-scroll">
//                 {Object.entries(result).map(([property, value]) => (
//                   <div key={property} className="bg-blue-800/30 rounded-lg p-4 border border-cyan-400/20">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-start">
//                         <span className="text-xl mr-3">{getPropertyIcon(property)}</span>
//                         <div>
//                           <h4 className="text-cyan-200 font-medium text-sm mb-1">{property}</h4>
//                           <p className="text-white text-lg font-semibold">{(value)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-64 text-cyan-300">
//                 <div className="text-center">
//                   <Waves className="mx-auto mb-4 opacity-50" size={48} />
//                   <p>Enter parameters and click &quot;Analyze Seawater&quot; to see results</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: rgba(59, 130, 246, 0.1);
//           border-radius: 3px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: rgba(34, 211, 238, 0.5);
//           border-radius: 3px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: rgba(34, 211, 238, 0.7);
//         }
//       `}</style>
//     </div>
//   )
// }




// "use client"
// import React, { useState, useRef, useEffect } from 'react';
// import { ArrowLeft, Send, Loader2, Waves, Thermometer, Beaker, MessageCircle, Bot, User, Zap, Info } from 'lucide-react';

// interface SeawaterResult {
//   "Seawater Density (kg/m³)": number;
//   "Ultrasonic Velocity (m/s)": number;
//   "Thermal Expansion Coefficient (K⁻¹)": number;
//   "Adiabatic Compressibility (TPa⁻¹)": number;
//   "Isothermal Compressibility (TPa⁻¹)": number;
//   "Heat Capacity (kJ/kg·K)": number;
//   "Intermolecular Free Length (×10⁻¹¹ m)": number;
//   "Internal Pressure (MPa)": number;
//   "Cohesion Energy Density (Pa·m)": number;
//   "Grüneisen Parameter": number;
//   "Acoustic Impedance (×10⁴ kg/m²·s)": number;
//   "Non-Linearity Parameter": number;
// }

// interface ChatMessage {
//   id: string;
//   type: 'user' | 'ai';
//   content: string;
//   timestamp: Date;
//   data?: SeawaterResult;
// }

// export default function IntelligentSeawaterAnalyzer() {
//   const [temperature, setTemperature] = useState('');
//   const [salinity, setSalinity] = useState('');
//   const [result, setResult] = useState<SeawaterResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   // Chat states
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
//     {
//       id: '1',
//       type: 'ai',
//       content: '🌊 Hello! I\'m your AI Seawater Analysis Assistant powered by Google Gemini. I can help you understand seawater properties, explain predictions, and answer your questions about marine chemistry. Try analyzing some seawater first!',
//       timestamp: new Date()
//     }
//   ]);
//   const [chatInput, setChatInput] = useState('');
//   const [chatLoading, setChatLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState<'analyze' | 'chat'>('analyze');
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom of chat
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatMessages]);

//   // Handle seawater prediction
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const tempK = parseFloat(temperature) > 100 ? parseFloat(temperature) : parseFloat(temperature) + 273.15;
//       const salinityValue = parseFloat(salinity);

//       if (tempK < 273.15 || tempK > 373.15) {
//         throw new Error('Temperature must be between 0-100°C (273.15-373.15K)');
//       }
//       if (salinityValue < 0 || salinityValue > 50) {
//         throw new Error('Salinity must be between 0-50 g/kg');
//       }

//       const response = await fetch('https://ligninchatbot.onrender.com/predict/seawater', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           temperature_k: tempK,
//           salinity_g_kg: salinityValue
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Prediction failed: ${errorData.detail || 'Unknown error'}`);
//       }

//       const data = await response.json();
//       setResult(data.predictions);
      
//       // Generate AI explanation using Gemini
//       const analysisPrompt = `As a marine chemistry expert, provide a brief analysis of these seawater properties for temperature ${temperature}°C and salinity ${salinity} g/kg:

// ${Object.entries(data.predictions).map(([key, value]) => `${key}: ${value}`).join('\n')}

// Provide insights about what these values indicate about the seawater's characteristics and any notable patterns. Keep it concise and informative.`;

//       const aiResponse = await callGeminiAPI(analysisPrompt);
//       addAIMessage(`🎯 Analysis Complete! ${aiResponse}`, data.predictions);
      
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to get prediction. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Call Gemini API
//   const callGeminiAPI = async (prompt: string): Promise<string> => {
//     try {
//       const response = await fetch('/api/gemini', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to get AI response');
//       }

//       const data = await response.json();
//       return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response.';
//     } catch {
//       return 'I\'m experiencing technical difficulties. Please try again later.';
//     }
//   };

//   // Add message to chat
//   const addMessage = (type: 'user' | 'ai', content: string, data?: SeawaterResult | undefined) => {
//     const newMessage: ChatMessage = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date(),
//       data
//     };
//     setChatMessages(prev => [...prev, newMessage]);
//   };

//   const addAIMessage = (content: string, data?: SeawaterResult | undefined) => addMessage('ai', content, data);
//   const addUserMessage = (content: string) => addMessage('user', content);

//   // Generate AI response using Gemini
//   const generateAIResponse = async (userMessage: string, currentResult?: SeawaterResult): Promise<string> => {
//     let prompt = '';

//     if (currentResult) {
//       prompt = `You are an expert marine chemist AI assistant. The user has analyzed seawater with the following properties:

// ${Object.entries(currentResult).map(([key, value]) => `${key}: ${value}`).join('\n')}

// User question: "${userMessage}"

// Provide a helpful, accurate, and engaging response about seawater properties. Use appropriate emojis and keep it conversational but informative. If the user asks about specific properties, explain them in the context of the current analysis results.`;
//     } else {
//       prompt = `You are an expert marine chemist AI assistant. The user hasn't run any seawater analysis yet.

// User message: "${userMessage}"

// Provide a helpful response encouraging them to run an analysis first, or answer general questions about seawater properties. Use appropriate emojis and keep it conversational but informative.`;
//     }

//     return await callGeminiAPI(prompt);
//   };

//   // Handle chat submission
//   const handleChatSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!chatInput.trim() || chatLoading) return;

//     const userMessage = chatInput.trim();
//     setChatInput('');
//     addUserMessage(userMessage);
//     setChatLoading(true);

//     try {
//       const aiResponse = await generateAIResponse(userMessage, result || undefined);
//       addAIMessage(aiResponse);
//     } catch {
//       addAIMessage('Sorry, I encountered an error while processing your request. Please try again!');
//     } finally {
//       setChatLoading(false);
//     }
//   };

//   const getPropertyIcon = (property: string) => {
//     if (property.includes('Density')) return '⚖️';
//     if (property.includes('Velocity')) return '🌊';
//     if (property.includes('Temperature') || property.includes('Thermal')) return '🌡️';
//     if (property.includes('Compressibility')) return '🔬';
//     if (property.includes('Heat')) return '🔥';
//     if (property.includes('Pressure')) return '💨';
//     if (property.includes('Acoustic')) return '🔊';
//     return '📊';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 relative overflow-hidden">
//       {/* Animated Ocean Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${1 + Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <div className="flex items-center mr-8">
//               <ArrowLeft className="mr-2 text-blue-300" size={20} />
//               <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">Back to Home</span>
//             </div>
//             <div className="flex items-center">
//               <Waves className="text-cyan-300 mr-3" size={32} />
//               <h1 className="text-3xl font-bold text-white">Intelligent Seawater Analyzer</h1>
//               <div className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
//                 Powered by Gemini AI
//               </div>
//             </div>
//           </div>
          
//           {/* Tab Switcher */}
//           <div className="flex bg-blue-800/30 rounded-lg p-1">
//             <button
//               onClick={() => setActiveTab('analyze')}
//               className={`px-4 py-2 rounded-md flex items-center transition-all ${
//                 activeTab === 'analyze' 
//                   ? 'bg-cyan-500 text-white shadow-lg' 
//                   : 'text-cyan-200 hover:text-white'
//               }`}
//             >
//               <Beaker className="mr-2" size={16} />
//               Analyze
//             </button>
//             <button
//               onClick={() => setActiveTab('chat')}
//               className={`px-4 py-2 rounded-md flex items-center transition-all relative ${
//                 activeTab === 'chat' 
//                   ? 'bg-cyan-500 text-white shadow-lg' 
//                   : 'text-cyan-200 hover:text-white'
//               }`}
//             >
//               <MessageCircle className="mr-2" size={16} />
//               AI Chat
//               {chatMessages.length > 1 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {chatMessages.length - 1}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {activeTab === 'analyze' ? (
//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Input Form */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
//               <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
//                 <Beaker className="mr-3 text-cyan-300" size={24} />
//                 Input Parameters
//               </h2>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-cyan-200 text-sm font-medium mb-2">
//                     <Thermometer className="inline mr-2" size={16} />
//                     Temperature (°C or K)
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={temperature}
//                     onChange={(e) => setTemperature(e.target.value)}
//                     className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
//                     placeholder="Enter temperature (0-100°C or 273-373K)..."
//                     required
//                   />
//                   <p className="text-xs text-cyan-300 mt-1">
//                     Values ≤100 treated as °C, &gt;100 as Kelvin
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-cyan-200 text-sm font-medium mb-2">
//                     <Waves className="inline mr-2" size={16} />
//                     Salinity (g/kg)
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={salinity}
//                     onChange={(e) => setSalinity(e.target.value)}
//                     className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
//                     placeholder="Enter salinity (0-50 g/kg)..."
//                     required
//                   />
//                   <p className="text-xs text-cyan-300 mt-1">
//                     Range: 0-50 g/kg (typical seawater: ~35 g/kg)
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="animate-spin mr-2" size={20} />
//                       Analyzing with AI...
//                     </>
//                   ) : (
//                     <>
//                       <Zap className="mr-2" size={20} />
//                       Analyze
//                     </>
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
//                   <strong>Error:</strong> {error}
//                 </div>
//               )}
//             </div>

//             {/* Results */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-semibold text-white">Analysis Results</h2>
//                 {result && (
//                   <button
//                     onClick={() => setActiveTab('chat')}
//                     className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-sm hover:bg-green-500/30 transition-all flex items-center"
//                   >
//                     <MessageCircle className="mr-1" size={14} />
//                     Ask Gemini AI
//                   </button>
//                 )}
//               </div>

//               {result ? (
//                 <div className="space-y-4 max-h-96 overflow-y-auto custom-scroll">
//                   {Object.entries(result).map(([property, value]) => (
//                     <div key={property} className="bg-blue-800/30 rounded-lg p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-start">
//                           <span className="text-xl mr-3">{getPropertyIcon(property)}</span>
//                           <div>
//                             <h4 className="text-cyan-200 font-medium text-sm mb-1 group-hover:text-cyan-100">{property}</h4>
//                             <p className="text-white text-lg font-semibold">{value}</p>
//                           </div>
//                         </div>
//                         <Info className="text-cyan-400/50 group-hover:text-cyan-400 transition-all" size={16} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center h-64 text-cyan-300">
//                   <div className="text-center">
//                     <Waves className="mx-auto mb-4 opacity-50" size={48} />
//                     <p>Enter parameters and click &quot;Analyze with Gemini AI&quot; to see results</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           /* Chat Interface */
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-cyan-400/30 h-[600px] flex flex-col">
//               {/* Chat Header */}
//               <div className="p-6 border-b border-cyan-400/20">
//                 <div className="flex items-center">
//                   <Bot className="text-cyan-300 mr-3" size={24} />
//                   <h2 className="text-xl font-semibold text-white">Gemini AI Seawater Assistant</h2>
//                   <div className="ml-auto flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                     <span className="text-green-300 text-sm">Powered by Google Gemini</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Chat Messages */}
//               <div className="flex-1 p-6 overflow-y-auto custom-scroll">
//                 <div className="space-y-4">
//                   {chatMessages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`max-w-[80%] p-4 rounded-2xl ${
//                           message.type === 'user'
//                             ? 'bg-cyan-500 text-white ml-4'
//                             : 'bg-blue-800/50 text-cyan-100 mr-4 border border-cyan-400/20'
//                         }`}
//                       >
//                         <div className="flex items-start space-x-2">
//                           {message.type === 'ai' && <Bot size={16} className="text-cyan-300 mt-1 flex-shrink-0" />}
//                           {message.type === 'user' && <User size={16} className="text-white mt-1 flex-shrink-0" />}
//                           <div className="flex-1">
//                             <p className="whitespace-pre-wrap">{message.content}</p>
//                             <p className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-cyan-100' : 'text-cyan-300'}`}>
//                               {message.timestamp.toLocaleTimeString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {chatLoading && (
//                     <div className="flex justify-start">
//                       <div className="bg-blue-800/50 text-cyan-100 mr-4 border border-cyan-400/20 p-4 rounded-2xl">
//                         <div className="flex items-center space-x-2">
//                           <Bot size={16} className="text-cyan-300" />
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
//                             <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                             <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                           </div>
//                           <span className="text-xs text-cyan-400">Gemini is thinking...</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div ref={chatEndRef} />
//               </div>

//               {/* Chat Input */}
//               <div className="p-6 border-t border-cyan-400/20">
//                 <form onSubmit={handleChatSubmit}>
//                   <div className="flex space-x-4">
//                     <input
//                       type="text"
//                       value={chatInput}
//                       onChange={(e) => setChatInput(e.target.value)}
//                       placeholder="Ask Gemini about seawater properties, predictions, or marine science..."
//                       className="flex-1 px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
//                       disabled={chatLoading}
//                     />
//                     <button
//                       type="submit"
//                       disabled={!chatInput.trim() || chatLoading}
//                       className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Send size={20} />
//                     </button>
//                   </div>
//                 </form>
                
//                 {/* Quick Actions */}
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {[
//                     "Explain density results",
//                     "What affects sound velocity?",
//                     "Compare with pure water",
//                     "Help me understand the data"
//                   ].map((suggestion) => (
//                     <button
//                       key={suggestion}
//                       onClick={() => setChatInput(suggestion)}
//                       className="text-xs bg-blue-700/30 text-cyan-200 px-3 py-1 rounded-full hover:bg-blue-700/50 transition-all"
//                       disabled={chatLoading}
//                     >
//                       {suggestion}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: rgba(59, 130, 246, 0.1);
//           border-radius: 3px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: rgba(34, 211, 238, 0.5);
//           border-radius: 3px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: rgba(34, 211, 238, 0.7);
//         }
//       `}</style>
//     </div>
//   );
// }


//ligninfrontend\src\app\seawater\page.tsx
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Loader2, Waves, Thermometer, Beaker, MessageCircle, Bot, User, Zap, Info } from 'lucide-react';
import Link from 'next/link';

interface SeawaterResult {
  "Seawater Density (kg/m³)": number;
  "Ultrasonic Velocity (m/s)": number;
  "Thermal Expansion Coefficient (K⁻¹)": number;
  "Adiabatic Compressibility (TPa⁻¹)": number;
  "Isothermal Compressibility (TPa⁻¹)": number;
  "Heat Capacity (kJ/kg·K)": number;
  "Intermolecular Free Length (×10⁻¹¹ m)": number;
  "Internal Pressure (MPa)": number;
  "Cohesion Energy Density (Pa·m)": number;
  "Grüneisen Parameter": number;
  "Acoustic Impedance (×10⁴ kg/m²·s)": number;
  "Non-Linearity Parameter": number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  data?: SeawaterResult;
}

// Simple markdown renderer component
const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    // Handle headers
    text = text.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-cyan-200 mb-2 mt-4">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-cyan-200 mb-3 mt-4">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-cyan-200 mb-3 mt-4">$1</h1>');
    
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong class="font-semibold text-white">$1</strong>');
    
    // Handle italic text
    text = text.replace(/\*(.*?)\*/g, '<em class="italic text-cyan-100">$1</em>');
    text = text.replace(/_(.*?)_/g, '<em class="italic text-cyan-100">$1</em>');
    
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-blue-900/50 text-cyan-300 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Handle code blocks
    text = text.replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```/g, '').trim();
      return `<pre class="bg-blue-900/50 border border-cyan-400/30 rounded-lg p-3 my-3 overflow-x-auto"><code class="text-cyan-300 text-sm font-mono whitespace-pre">${code}</code></pre>`;
    });
    
    // Handle unordered lists
    text = text.replace(/^\* (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>');
    text = text.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>');
    
    // Handle ordered lists
    text = text.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>');
    
    // Wrap consecutive list items
    text = text.replace(/(<li[^>]*>.*<\/li>\s*)+/g, '<ul class="my-2 space-y-1">$&</ul>');
    
    // Handle line breaks
    text = text.replace(/\n\n/g, '</p><p class="mb-3">');
    text = text.replace(/\n/g, '<br />');
    
    // Wrap in paragraph tags
    if (!text.includes('<h1>') && !text.includes('<h2>') && !text.includes('<h3>') && !text.includes('<ul>') && !text.includes('<pre>')) {
      text = `<p class="mb-3">${text}</p>`;
    }
    
    return text;
  };

  return (
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export default function IntelligentSeawaterAnalyzer() {
  const [temperature, setTemperature] = useState('');
  const [salinity, setSalinity] = useState('');
  const [result, setResult] = useState<SeawaterResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: '🌊 **Hello!** I\'m your AI Seawater Analysis Assistant powered by *Google Gemini*. \n\nI can help you:\n• Understand seawater properties\n• Explain predictions\n• Answer questions about marine chemistry\n\n**Try analyzing some seawater first!** 🧪',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyze' | 'chat'>('analyze');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle seawater prediction
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tempK = parseFloat(temperature) > 100 ? parseFloat(temperature) : parseFloat(temperature) + 273.15;
      const salinityValue = parseFloat(salinity);

      if (tempK < 273.15 || tempK > 373.15) {
        throw new Error('Temperature must be between 0-100°C (273.15-373.15K)');
      }
      if (salinityValue < 0 || salinityValue > 50) {
        throw new Error('Salinity must be between 0-50 g/kg');
      }

      const response = await fetch('https://ligninchatbot.onrender.com/predict/seawater', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature_k: tempK,
          salinity_g_kg: salinityValue
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Prediction failed: ${errorData.detail || 'Unknown error'}`);
      }

      const data = await response.json();
      setResult(data.predictions);
      
      // Generate AI explanation using Gemini
      const analysisPrompt = `As a marine chemistry expert, provide a comprehensive analysis of these seawater properties for temperature ${temperature}°C and salinity ${salinity} g/kg:

${Object.entries(data.predictions).map(([key, value]) => `${key}: ${value}`).join('\n')}

Please provide:
1. **Key Physical Properties Overview** - What do these values tell us about this seawater sample?
2. **Notable Patterns** - Any interesting relationships between the properties?
3. **Practical Implications** - How might these properties affect marine life or ocean processes?
4. **Comparison Context** - How do these values compare to typical seawater?

Format your response with clear headers and bullet points for easy reading. Use emojis appropriately and keep it informative yet engaging.`;

      const aiResponse = await callGeminiAPI(analysisPrompt);
      addAIMessage(`🎯 **Analysis Complete!**\n\n${aiResponse}`, data.predictions);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Call Gemini API
  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response.';
    } catch {
      return '⚠️ I\'m experiencing technical difficulties. Please try again later.';
    }
  };

  // Add message to chat
  const addMessage = (type: 'user' | 'ai', content: string, data?: SeawaterResult | undefined) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      data
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const addAIMessage = (content: string, data?: SeawaterResult | undefined) => addMessage('ai', content, data);
  const addUserMessage = (content: string) => addMessage('user', content);

  // Generate AI response using Gemini
  const generateAIResponse = async (userMessage: string, currentResult?: SeawaterResult): Promise<string> => {
    let prompt = '';

    if (currentResult) {
      prompt = `You are an expert marine chemist AI assistant. The user has analyzed seawater with the following properties:

${Object.entries(currentResult).map(([key, value]) => `${key}: ${value}`).join('\n')}

User question: "${userMessage}"

Provide a helpful, accurate, and engaging response about seawater properties. Use markdown formatting with:
- **Bold text** for important terms
- *Italic text* for emphasis
- Bullet points for lists
- Code blocks for formulas if needed
- Headers (##) for sections if appropriate

Use appropriate emojis and keep it conversational but informative. If the user asks about specific properties, explain them in the context of the current analysis results.`;
    } else {
      prompt = `You are an expert marine chemist AI assistant. The user hasn't run any seawater analysis yet.

User message: "${userMessage}"

Provide a helpful response encouraging them to run an analysis first, or answer general questions about seawater properties. Use markdown formatting with:
- **Bold text** for important terms
- *Italic text* for emphasis  
- Bullet points for lists
- Headers (##) for sections if appropriate

Use appropriate emojis and keep it conversational but informative.`;
    }

    return await callGeminiAPI(prompt);
  };

  // Handle chat submission
  const handleChatSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    addUserMessage(userMessage);
    setChatLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage, result || undefined);
      addAIMessage(aiResponse);
    } catch {
      addAIMessage('⚠️ Sorry, I encountered an error while processing your request. Please try again!');
    } finally {
      setChatLoading(false);
    }
  };

  const getPropertyIcon = (property: string) => {
    if (property.includes('Density')) return '⚖️';
    if (property.includes('Velocity')) return '🌊';
    if (property.includes('Temperature') || property.includes('Thermal')) return '🌡️';
    if (property.includes('Compressibility')) return '🔬';
    if (property.includes('Heat')) return '🔥';
    if (property.includes('Pressure')) return '💨';
    if (property.includes('Acoustic')) return '🔊';
    return '📊';
  };

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 relative overflow-hidden">
  //     {/* Animated Ocean Background */}
  //     <div className="absolute inset-0">
  //       <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
  //       {[...Array(30)].map((_, i) => (
  //         <div
  //           key={i}
  //           className="absolute w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse"
  //           style={{
  //             left: `${Math.random() * 100}%`,
  //             top: `${Math.random() * 100}%`,
  //             animationDelay: `${Math.random() * 3}s`,
  //             animationDuration: `${1 + Math.random() * 2}s`,
  //           }}
  //         />
  //       ))}
  //     </div>

  //     <div className="relative z-10 container mx-auto px-4 py-8">
  //       {/* Header */}
  //       <div className="flex items-center justify-between mb-8">
  //         <div className="flex items-center">
  //           <Link href='/'><div className="flex items-center mr-8">
  //             <ArrowLeft className="mr-2 text-blue-300" size={20} />
  //             <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">Back to Home</span>
  //           </div></Link>
  //           <div className="flex items-center">
  //             <Waves className="text-cyan-300 mr-3" size={32} />
  //             <h1 className="text-3xl font-bold text-white"> Seawater Analysis</h1>
         
  //           </div>
  //         </div>
          
  //         {/* Tab Switcher */}
  //         <div className="flex bg-blue-800/30 rounded-lg p-1">
  //           <button
  //             onClick={() => setActiveTab('analyze')}
  //             className={`px-4 py-2 rounded-md flex items-center transition-all ${
  //               activeTab === 'analyze' 
  //                 ? 'bg-cyan-500 text-white shadow-lg' 
  //                 : 'text-cyan-200 hover:text-white'
  //             }`}
  //           >
  //             <Beaker className="mr-2" size={16} />
  //             Analyze
  //           </button>
  //           <button
  //             onClick={() => setActiveTab('chat')}
  //             className={`px-4 py-2 rounded-md flex items-center transition-all relative ${
  //               activeTab === 'chat' 
  //                 ? 'bg-cyan-500 text-white shadow-lg' 
  //                 : 'text-cyan-200 hover:text-white'
  //             }`}
  //           >
  //             <MessageCircle className="mr-2" size={16} />
  //             AI Chat
  //             {chatMessages.length > 1 && (
  //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
  //                 {chatMessages.length - 1}
  //               </span>
  //             )}
  //           </button>
  //         </div>
  //       </div>

  //       {activeTab === 'analyze' ? (
  //         <div className="grid lg:grid-cols-2 gap-8">
  //           {/* Input Form */}
  //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
  //             <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
  //               <Beaker className="mr-3 text-cyan-300" size={24} />
  //               Input Parameters
  //             </h2>

  //             <div className="space-y-6">
  //               <div>
  //                 <label className="block text-cyan-200 text-sm font-medium mb-2">
  //                   <Thermometer className="inline mr-2" size={16} />
  //                   Temperature (°C or K)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   step="0.01"
  //                   value={temperature}
  //                   onChange={(e) => setTemperature(e.target.value)}
  //                   className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
  //                   placeholder="Enter temperature (0-100°C or 273-373K)..."
  //                   required
  //                 />
  //                 <p className="text-xs text-cyan-300 mt-1">
  //                   Values ≤100 treated as °C, &gt;100 as Kelvin
  //                 </p>
  //               </div>

  //               <div>
  //                 <label className="block text-cyan-200 text-sm font-medium mb-2">
  //                   <Waves className="inline mr-2" size={16} />
  //                   Salinity (g/kg)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   step="0.01"
  //                   value={salinity}
  //                   onChange={(e) => setSalinity(e.target.value)}
  //                   className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
  //                   placeholder="Enter salinity (0-50 g/kg)..."
  //                   required
  //                 />
  //                 <p className="text-xs text-cyan-300 mt-1">
  //                   Range: 0-50 g/kg (typical seawater: ~35 g/kg)
  //                 </p>
  //               </div>

  //               <button
  //                 onClick={handleSubmit}
  //                 disabled={loading}
  //                 className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
  //               >
  //                 {loading ? (
  //                   <>
  //                     <Loader2 className="animate-spin mr-2" size={20} />
  //                     Analyzing with AI...
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Zap className="mr-2" size={20} />
  //                     Analyze
  //                   </>
  //                 )}
  //               </button>
  //             </div>

  //             {error && (
  //               <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
  //                 <strong>Error:</strong> {error}
  //               </div>
  //             )}
  //           </div>

  //           {/* Results */}
  //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
  //             <div className="flex items-center justify-between mb-6">
  //               <h2 className="text-2xl font-semibold text-white">Analysis Results</h2>
  //               {result && (
  //                 <button
  //                   onClick={() => setActiveTab('chat')}
  //                   className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-sm hover:bg-green-500/30 transition-all flex items-center"
  //                 >
  //                   <MessageCircle className="mr-1" size={14} />
  //                   Ask Gemini AI
  //                 </button>
  //               )}
  //             </div>

  //             {result ? (
  //               <div className="space-y-4 max-h-96 overflow-y-auto custom-scroll">
  //                 {Object.entries(result).map(([property, value]) => (
  //                   <div key={property} className="bg-blue-800/30 rounded-lg p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
  //                     <div className="flex items-start justify-between">
  //                       <div className="flex items-start">
  //                         <span className="text-xl mr-3">{getPropertyIcon(property)}</span>
  //                         <div>
  //                           <h4 className="text-cyan-200 font-medium text-sm mb-1 group-hover:text-cyan-100">{property}</h4>
  //                           <p className="text-white text-lg font-semibold">{value}</p>
  //                         </div>
  //                       </div>
  //                       <Info className="text-cyan-400/50 group-hover:text-cyan-400 transition-all" size={16} />
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             ) : (
  //               <div className="flex items-center justify-center h-64 text-cyan-300">
  //                 <div className="text-center">
  //                   <Waves className="mx-auto mb-4 opacity-50" size={48} />
  //                   <p>Enter parameters and click &quot;Analyze with Gemini AI&quot; to see results</p>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       ) : (
  //         /* Chat Interface */
  //         <div className="max-w-4xl mx-auto">
  //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-cyan-400/30 h-[600px] flex flex-col">
  //             {/* Chat Header */}
  //             <div className="p-6 border-b border-cyan-400/20">
  //               <div className="flex items-center">
  //                 <Bot className="text-cyan-300 mr-3" size={24} />
  //                 <h2 className="text-xl font-semibold text-white">Gemini AI Seawater Assistant</h2>
  //                 <div className="ml-auto flex items-center space-x-2">
  //                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
  //                   <span className="text-green-300 text-sm">Powered by Google Gemini</span>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Chat Messages */}
  //             <div className="flex-1 p-6 overflow-y-auto custom-scroll">
  //               <div className="space-y-4">
  //                 {chatMessages.map((message) => (
  //                   <div
  //                     key={message.id}
  //                     className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
  //                   >
  //                     <div
  //                       className={`max-w-[80%] p-4 rounded-2xl ${
  //                         message.type === 'user'
  //                           ? 'bg-cyan-500 text-white ml-4'
  //                           : 'bg-blue-800/50 text-cyan-100 mr-4 border border-cyan-400/20'
  //                       }`}
  //                     >
  //                       <div className="flex items-start space-x-2">
  //                         {message.type === 'ai' && <Bot size={16} className="text-cyan-300 mt-1 flex-shrink-0" />}
  //                         {message.type === 'user' && <User size={16} className="text-white mt-1 flex-shrink-0" />}
  //                         <div className="flex-1">
  //                           {message.type === 'ai' ? (
  //                             <MarkdownRenderer content={message.content} />
  //                           ) : (
  //                             <p className="whitespace-pre-wrap">{message.content}</p>
  //                           )}
  //                           <p className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-cyan-100' : 'text-cyan-300'}`}>
  //                             {message.timestamp.toLocaleTimeString()}
  //                           </p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 ))}
                  
  //                 {chatLoading && (
  //                   <div className="flex justify-start">
  //                     <div className="bg-blue-800/50 text-cyan-100 mr-4 border border-cyan-400/20 p-4 rounded-2xl">
  //                       <div className="flex items-center space-x-2">
  //                         <Bot size={16} className="text-cyan-300" />
  //                         <div className="flex space-x-1">
  //                           <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
  //                           <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
  //                           <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
  //                         </div>
  //                         <span className="text-xs text-cyan-400">Gemini is thinking...</span>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //               <div ref={chatEndRef} />
  //             </div>

  //             {/* Chat Input */}
  //             <div className="p-6 border-t border-cyan-400/20">
  //               <div>
  //                 <div className="flex space-x-4">
  //                   <input
  //                     type="text"
  //                     value={chatInput}
  //                     onChange={(e) => setChatInput(e.target.value)}
  //                     onKeyPress={(e) => {
  //                       if (e.key === 'Enter' && !e.shiftKey) {
  //                         e.preventDefault();
  //                         handleChatSubmit(e);
  //                       }
  //                     }}
  //                     placeholder="Ask Gemini about seawater properties, predictions, or marine science..."
  //                     className="flex-1 px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
  //                     disabled={chatLoading}
  //                   />
  //                   <button
  //                     onClick={handleChatSubmit}
  //                     disabled={!chatInput.trim() || chatLoading}
  //                     className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
  //                   >
  //                     <Send size={20} />
  //                   </button>
  //                 </div>
  //               </div>
                          
                
  //               {/* Quick Actions */}
  //               <div className="flex flex-wrap gap-2 mt-4">
  //                 {[
  //                   "Explain density results",
  //                   "What affects sound velocity?",
  //                   "Compare with pure water",
  //                   "Help me understand the data"
  //                 ].map((suggestion) => (
  //                   <button
  //                     key={suggestion}
  //                     onClick={() => setChatInput(suggestion)}
  //                     className="text-xs bg-blue-700/30 text-cyan-200 px-3 py-1 rounded-full hover:bg-blue-700/50 transition-all"
  //                     disabled={chatLoading}
  //                   >
  //                     {suggestion}
  //                   </button>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     <style jsx>{`
  //       .custom-scroll::-webkit-scrollbar {
  //         width: 6px;
  //       }
  //       .custom-scroll::-webkit-scrollbar-track {
  //         background: rgba(59, 130, 246, 0.1);
  //         border-radius: 3px;
  //       }
  //       .custom-scroll::-webkit-scrollbar-thumb {
  //         background: rgba(34, 211, 238, 0.5);
  //         border-radius: 3px;
  //       }
  //       .custom-scroll::-webkit-scrollbar-thumb:hover {
  //         background: rgba(34, 211, 238, 0.7);
  //       }
  //     `}</style>
  //   </div>
  // );

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 relative overflow-hidden">
    {/* Animated Ocean Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-cyan-300/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>

    <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0">
          <Link href='/'>
            <div className="flex items-center mr-0 sm:mr-8 mb-2 sm:mb-0">
              <ArrowLeft className="mr-2 text-blue-300" size={18} />
              <span className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer text-sm sm:text-base">
                Back to Home
              </span>
            </div>
          </Link>
          <div className="flex items-center">
            <Waves className="text-cyan-300 mr-2 sm:mr-3" size={24} />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Seawater Analysis
            </h1>
          </div>
        </div>
        
        {/* Tab Switcher - Mobile Responsive */}
        <div className="flex bg-blue-800/30 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md flex items-center justify-center transition-all text-sm ${
              activeTab === 'analyze' 
                ? 'bg-cyan-500 text-white shadow-lg' 
                : 'text-cyan-200 hover:text-white'
            }`}
          >
            <Beaker className="mr-1 sm:mr-2" size={14}  />
            <span className="hidden sm:inline">Analyze</span>
            <span className="sm:hidden">Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md flex items-center justify-center transition-all relative text-sm ${
              activeTab === 'chat' 
                ? 'bg-cyan-500 text-white shadow-lg' 
                : 'text-cyan-200 hover:text-white'
            }`}
          >
            <MessageCircle className="mr-1 sm:mr-2" size={14} />
            <span className="hidden sm:inline">AI Chat</span>
            <span className="sm:hidden">Chat</span>
            {chatMessages.length > 1 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {chatMessages.length - 1}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'analyze' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Input Form - Mobile Responsive */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-400/30">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
              <Beaker className="mr-2 sm:mr-3 text-cyan-300" size={20} />
              Input Parameters
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-cyan-200 text-sm font-medium mb-2">
                  <Thermometer className="inline mr-2" size={14}  />
                  Temperature (°C or K)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter temperature (0-100°C or 273-373K)..."
                  required
                />
                <p className="text-xs text-cyan-300 mt-1">
                  Values ≤100 treated as °C, {'>'}100 as Kelvin
                </p>
              </div>

              <div>
                <label className="block text-cyan-200 text-sm font-medium mb-2">
                  <Waves className="inline mr-2" size={14}  />
                  Salinity (g/kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={salinity}
                  onChange={(e) => setSalinity(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter salinity (0-50 g/kg)..."
                  required
                />
                <p className="text-xs text-cyan-300 mt-1">
                  Range: 0-50 g/kg (typical seawater: ~35 g/kg)
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    <span className="hidden sm:inline">Analyzing with AI...</span>
                    <span className="sm:hidden">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="mr-2" size={16}  />
                    Analyze
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Results - Mobile Responsive */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-400/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Analysis Results</h2>
              {result && (
                <button
                  onClick={() => setActiveTab('chat')}
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-green-500/30 transition-all flex items-center justify-center sm:justify-start"
                >
                  <MessageCircle className="mr-1" size={12} />
                  Ask Gemini AI
                </button>
              )}
            </div>

            {result ? (
              <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto custom-scroll">
                {Object.entries(result).map(([property, value]) => (
                  <div key={property} className="bg-blue-800/30 rounded-lg p-3 sm:p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1 min-w-0">
                        <span className="text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">{getPropertyIcon(property)}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-cyan-200 font-medium text-xs sm:text-sm mb-1 group-hover:text-cyan-100 break-words">{property}</h4>
                          <p className="text-white text-sm sm:text-base lg:text-lg font-semibold break-words">{value}</p>
                        </div>
                      </div>
                      <Info className="text-cyan-400/50 group-hover:text-cyan-400 transition-all flex-shrink-0 ml-2" size={14} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 sm:h-48 lg:h-64 text-cyan-300">
                <div className="text-center px-4">
                  <Waves className="mx-auto mb-4 opacity-50" size={32}  />
                  <p className="text-sm sm:text-base text-center">Enter parameters and click &quot;Analyze&quot; to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Chat Interface - Mobile Responsive */
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-cyan-400/30 h-[500px] sm:h-[600px] flex flex-col">
            {/* Chat Header - Mobile Responsive */}
            <div className="p-4 sm:p-6 border-b border-cyan-400/20">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center flex-1">
                  <Bot className="text-cyan-300 mr-2 sm:mr-3" size={20} />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Gemini AI Seawater Assistant</h2>
                </div>
                <div className="flex items-center space-x-2 justify-start sm:justify-end">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-xs sm:text-sm">Powered by Google Gemini</span>
                </div>
              </div>
            </div>

            {/* Chat Messages - Mobile Responsive */}
            <div className="flex-1 p-3 sm:p-6 overflow-y-auto custom-scroll">
              <div className="space-y-3 sm:space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-cyan-500 text-white ml-2 sm:ml-4'
                          : 'bg-blue-800/50 text-cyan-100 mr-2 sm:mr-4 border border-cyan-400/20'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'ai' && <Bot size={14} className="text-cyan-300 mt-1 flex-shrink-0" />}
                        {message.type === 'user' && <User size={14}  className="text-white mt-1 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          {message.type === 'ai' ? (
                            <MarkdownRenderer content={message.content} />
                          ) : (
                            <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{message.content}</p>
                          )}
                          <p className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-cyan-100' : 'text-cyan-300'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-blue-800/50 text-cyan-100 mr-2 sm:mr-4 border border-cyan-400/20 p-3 sm:p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Bot size={14}  className="text-cyan-300" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-cyan-400">Gemini is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input - Mobile Responsive */}
            <div className="p-3 sm:p-6 border-t border-cyan-400/20">
              <div>
                <div className="flex space-x-2 sm:space-x-4">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleChatSubmit(e);
                      }
                    }}
                    placeholder="Ask Gemini about seawater properties..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
                    disabled={chatLoading}
                  />
                  <button
                    onClick={handleChatSubmit}
                    disabled={!chatInput.trim() || chatLoading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
                        
              {/* Quick Actions - Mobile Responsive */}
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                {[
                  "Explain density results",
                  "What affects sound velocity?",
                  "Compare with pure water",
                  "Help me understand the data"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setChatInput(suggestion)}
                    className="text-xs bg-blue-700/30 text-cyan-200 px-2 sm:px-3 py-1 rounded-full hover:bg-blue-700/50 transition-all flex-shrink-0"
                    disabled={chatLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <style jsx>{`
      .custom-scroll::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scroll::-webkit-scrollbar-track {
        background: rgba(59, 130, 246, 0.1);
        border-radius: 2px;
      }
      .custom-scroll::-webkit-scrollbar-thumb {
        background: rgba(34, 211, 238, 0.5);
        border-radius: 2px;
      }
      .custom-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(34, 211, 238, 0.7);
      }
      
      @media (max-width: 640px) {
        .custom-scroll::-webkit-scrollbar {
          width: 3px;
        }
      }
    `}</style>
  </div>
);
}