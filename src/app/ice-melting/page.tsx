// // ligninfrontend\src\app\ice-melting\page.tsx
// 'use client'
// import { useState } from 'react'
// import { ArrowLeft, Send, Loader2, Snowflake, Thermometer, Calendar } from 'lucide-react'
// import Link from 'next/link'



// export default function IceMeltingPage() {
//   const [temperature, setTemperature] = useState('')
//   const [year, setYear] = useState('')
//   const [month, setMonth] = useState('')
//   const [result, setResult] = useState<number | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const Base_url = process.env.BASE_URL
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ]

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const response = await fetch(`${Base_url}/predict/ice`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           temperature_k: parseFloat(temperature),
//           year: parseInt(year),
//           month: parseInt(month),
//         }),
//       })
//       console.log("response is ", response)
//       if (!response.ok) {
//         throw new Error('Prediction failed')
//       }

//       console.log("response is ", response)

//       const data = await response.json()
//       console.log("data is ", data)
//       setResult(data.predicted_ice_melting_rate)
//     } catch (err) {
//       console.error(err);
//       setError('Failed to get prediction. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getMeltingStatus = (meltingPoint: number) => {
//     if (meltingPoint < -10) return { status: 'Frozen Solid', color: 'text-blue-300', bg: 'bg-blue-500/20' }
//     if (meltingPoint < -5) return { status: 'Very Cold', color: 'text-cyan-300', bg: 'bg-cyan-500/20' }
//     if (meltingPoint < 0) return { status: 'Below Freezing', color: 'text-indigo-300', bg: 'bg-indigo-500/20' }
//     if (meltingPoint < 5) return { status: 'Near Melting', color: 'text-yellow-300', bg: 'bg-yellow-500/20' }
//     return { status: 'Melting', color: 'text-red-300', bg: 'bg-red-500/20' }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 relative overflow-hidden">
//       {/* Animated Ice Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
//         {[...Array(25)].map((_, i) => (
//           <Snowflake
//             key={i}
//             className="absolute text-white/20 animate-pulse"
//             size={12 + Math.random() * 20}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//               transform: `rotate(${Math.random() * 360}deg)`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center mb-8">
//           <Link href="/" className="flex items-center text-blue-300 hover:text-blue-200 transition-colors mr-6">
//             <ArrowLeft className="mr-2" size={20} />
//             Back to Home
//           </Link>
//           <div className="flex items-center">
//             <Snowflake className="text-blue-300 mr-3" size={32} />
//             <h1 className="text-3xl font-bold text-white">Ice Melting Point Prediction</h1>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Form */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
//             <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
//               <Thermometer className="mr-3 text-blue-300" size={24} />
//               Environmental Parameters
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-blue-200 text-sm font-medium mb-2">
//                   <Thermometer className="inline mr-2" size={16} />
//                   Temperature (K)
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={temperature}
//                   onChange={(e) => setTemperature(e.target.value)}
//                   className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
//                   placeholder="Enter temperature..."
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-blue-200 text-sm font-medium mb-2">
//                   <Calendar className="inline mr-2" size={16} />
//                   Year
//                 </label>
//                 <input
//                   type="number"
//                   min="2000"
//                   max="2050"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
//                   placeholder="Enter year..."
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-blue-200 text-sm font-medium mb-2">
//                   <Calendar className="inline mr-2" size={16} />
//                   Month
//                 </label>
//                 <select
//                   value={month}
//                   onChange={(e) => setMonth(e.target.value)}
//                   className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
//                   required
//                 >
//                   <option value="">Select month...</option>
//                   {months.map((monthName, index) => (
//                     <option key={index} value={index + 1} className="bg-indigo-800">
//                       {monthName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2" size={20} />
//                     Predicting...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="mr-2" size={20} />
//                     Predict Melting Point
//                   </>
//                 )}
//               </button>
//             </form>

//             {error && (
//               <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* Results */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
//             <h2 className="text-2xl font-semibold text-white mb-6">Prediction Results</h2>

//             {result !== null ? (
//               <div className="space-y-6">
//                 {/* Main Result */}
//                 <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-xl p-6 border border-blue-400/30">
//                   <div className="text-center">
//                     <Snowflake className="mx-auto mb-4 text-blue-300" size={48} />
//                     <h3 className="text-lg text-blue-200 mb-2">Ice Melting Point</h3>
//                     <div className="text-4xl font-bold text-white mb-4">
//                       {result} (gton)
//                     </div>

//                     {(() => {
//                       const status = getMeltingStatus(result)
//                       return (
//                         <div className={`inline-block px-4 py-2 rounded-full ${status.bg} ${status.color} font-medium`}>
//                           {status.status}
//                         </div>
//                       )
//                     })()}
//                   </div>
//                 </div>

//                 {/* Temperature Analysis */}
//                 <div className="bg-indigo-800/30 rounded-lg p-6 border border-blue-400/20">
//                   <h4 className="text-blue-200 font-medium mb-4 flex items-center">
//                     <Thermometer className="mr-2" size={18} />
//                     Temperature Analysis
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-blue-300">Input Temperature:</span>
//                       <span className="text-white font-semibold">{temperature}K</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-blue-300">Predicted Melting Point:</span>
//                       <span className="text-white font-semibold">{result}K</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-blue-300">Temperature Difference:</span>
//                       <span className={`font-semibold ${parseFloat(temperature) > result ? 'text-red-300' : 'text-blue-300'}`}>
//                         {(parseFloat(temperature) - result)}K
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Environmental Context */}
//                 <div className="bg-indigo-800/30 rounded-lg p-6 border border-blue-400/20">
//                   <h4 className="text-blue-200 font-medium mb-4 flex items-center">
//                     <Calendar className="mr-2" size={18} />
//                     Environmental Context
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-blue-300">Year:</span>
//                       <span className="text-white font-semibold">{year}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-blue-300">Month:</span>
//                       <span className="text-white font-semibold">{months[parseInt(month) - 1]}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-blue-300">Season:</span>
//                       <span className="text-white font-semibold">
//                         {parseInt(month) >= 3 && parseInt(month) <= 5 ? 'Spring' :
//                           parseInt(month) >= 6 && parseInt(month) <= 8 ? 'Summer' :
//                             parseInt(month) >= 9 && parseInt(month) <= 11 ? 'Autumn' : 'Winter'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Recommendation */}
//                 <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 rounded-lg p-6 border border-cyan-400/20">
//                   <h4 className="text-cyan-200 font-medium mb-3">💡 Insight</h4>
//                   <p className="text-cyan-100 text-sm leading-relaxed">
//                     {parseFloat(temperature) > result
//                       ? `At ${temperature}°C, the ice is likely to melt as it's above the predicted melting point of ${result}°C.`
//                       : `At ${temperature}°C, the ice should remain solid as it's below the predicted melting point of ${result}°C.`
//                     }
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-64 text-blue-300">
//                 <div className="text-center">
//                   <Snowflake className="mx-auto mb-4 opacity-50" size={48} />
//                   <p>Enter parameters and click &quot;Predict Melting Point&quot; to see results</p>
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
//           background: rgba(99, 102, 241, 0.5);
//           border-radius: 3px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: rgba(99, 102, 241, 0.7);
//         }
//       `}</style>
//     </div>
//   )
// }


// ligninfrontend\src\app\ice-melting\page.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Loader2, Snowflake, Thermometer, Calendar, MessageCircle, Bot, User, Zap } from 'lucide-react'
import Link from 'next/link'

interface IceMeltingResult {
  predicted_ice_melting_rate: number;
  temperature_k: number;
  year: number;
  month: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  data?: IceMeltingResult;
}

// Simple markdown renderer component
const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    // Handle headers
    text = text.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-blue-200 mb-2 mt-4">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-blue-200 mb-3 mt-4">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-blue-200 mb-3 mt-4">$1</h1>');
    
    // Handle bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong class="font-semibold text-white">$1</strong>');
    
    // Handle italic text
    text = text.replace(/\*(.*?)\*/g, '<em class="italic text-blue-100">$1</em>');
    text = text.replace(/_(.*?)_/g, '<em class="italic text-blue-100">$1</em>');
    
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-indigo-900/50 text-blue-300 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Handle code blocks
    text = text.replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```/g, '').trim();
      return `<pre class="bg-indigo-900/50 border border-blue-400/30 rounded-lg p-3 my-3 overflow-x-auto"><code class="text-blue-300 text-sm font-mono whitespace-pre">${code}</code></pre>`;
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

export default function IntelligentIceMeltingPredictor() {
  const [temperature, setTemperature] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: '❄️ **Hello!** I\'m your AI Ice Melting Analysis Assistant powered by *Google Gemini*. \n\nI can help you:\n• Understand ice melting predictions\n• Explain climate factors\n• Answer questions about glaciology\n• Analyze environmental impacts\n\n**Try predicting ice melting first!** 🧊',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyze' | 'chat'>('analyze');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const Base_url = process.env.NEXT_PUBLIC_BASE_URL
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${Base_url}/predict/ice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature_k: parseFloat(temperature),
          year: parseInt(year),
          month: parseInt(month),
        }),
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const data = await response.json()
      setResult(data.predicted_ice_melting_rate)
      
      // Generate AI explanation using Gemini
      const analysisPrompt = `As a glaciology and climate science expert, provide a comprehensive analysis of this ice melting prediction:

Ice Melting Rate: ${data.predicted_ice_melting_rate} gton
Temperature: ${temperature}K (${(parseFloat(temperature) - 273.15).toFixed(2)}°C)
Year: ${year}
Month: ${months[parseInt(month) - 1]}

Please provide:
1. **Ice Melting Analysis** - What does this melting rate tell us about the ice conditions?
2. **Temperature Impact** - How does this temperature affect ice stability?
3. **Seasonal Context** - How does the month/season influence ice melting?
4. **Climate Implications** - What are the broader environmental impacts?
5. **Comparison Context** - How does this compare to typical ice melting rates?

Format your response with clear headers and bullet points for easy reading. Use emojis appropriately and keep it informative yet engaging.`;

      const aiResponse = await callGeminiAPI(analysisPrompt);
      const resultData: IceMeltingResult = {
        predicted_ice_melting_rate: data.predicted_ice_melting_rate,
        temperature_k: parseFloat(temperature),
        year: parseInt(year),
        month: parseInt(month)
      };
      addAIMessage(`🎯 **Analysis Complete!**\n\n${aiResponse}`, resultData);
      
    } catch (err) {
      console.error(err);
      setError('Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
  const addMessage = (type: 'user' | 'ai', content: string, data?: IceMeltingResult | undefined) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      data
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const addAIMessage = (content: string, data?: IceMeltingResult | undefined) => addMessage('ai', content, data);
  const addUserMessage = (content: string) => addMessage('user', content);

  // Generate AI response using Gemini
  const generateAIResponse = async (userMessage: string, currentResult?: number): Promise<string> => {
    let prompt = '';

    if (currentResult !== null && currentResult !== undefined) {
      prompt = `You are an expert glaciologist and climate scientist AI assistant. The user has predicted ice melting with the following results:

Ice Melting Rate: ${currentResult} gton
Temperature: ${temperature}K (${(parseFloat(temperature) - 273.15).toFixed(2)}°C)
Year: ${year}
Month: ${months[parseInt(month) - 1]}

User question: "${userMessage}"

Provide a helpful, accurate, and engaging response about ice melting, climate science, and glaciology. Use markdown formatting with:
- **Bold text** for important terms
- *Italic text* for emphasis
- Bullet points for lists
- Code blocks for formulas if needed
- Headers (##) for sections if appropriate

Use appropriate emojis and keep it conversational but informative. If the user asks about specific aspects, explain them in the context of the current prediction results.`;
    } else {
      prompt = `You are an expert glaciologist and climate scientist AI assistant. The user hasn't run any ice melting prediction yet.

User message: "${userMessage}"

Provide a helpful response encouraging them to run a prediction first, or answer general questions about ice melting, glaciology, and climate science. Use markdown formatting with:
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
      const aiResponse = await generateAIResponse(userMessage, result ?? undefined);
      addAIMessage(aiResponse);
    } catch {
      addAIMessage('⚠️ Sorry, I encountered an error while processing your request. Please try again!');
    } finally {
      setChatLoading(false);
    }
  };

  const getMeltingStatus = (meltingPoint: number) => {
    if (meltingPoint < -10) return { status: '(-ve sign indicates the mass loss of ice shelf)', color: 'text-blue-300', bg: 'bg-blue-500/20' }
    if (meltingPoint < -5) return { status: 'Very Cold', color: 'text-cyan-300', bg: 'bg-cyan-500/20' }
    if (meltingPoint < 0) return { status: 'Below Freezing', color: 'text-indigo-300', bg: 'bg-indigo-500/20' }
    if (meltingPoint < 5) return { status: 'Near Melting', color: 'text-yellow-300', bg: 'bg-yellow-500/20' }
    return { status: 'Melting', color: 'text-red-300', bg: 'bg-red-500/20' }
  }

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 relative overflow-hidden">
  //     {/* Animated Ice Background */}
  //     <div className="absolute inset-0">
  //       <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
  //       {[...Array(25)].map((_, i) => (
  //         <Snowflake
  //           key={i}
  //           className="absolute text-white/20 animate-pulse"
  //           size={12 + Math.random() * 20}
  //           style={{
  //             left: `${Math.random() * 100}%`,
  //             top: `${Math.random() * 100}%`,
  //             animationDelay: `${Math.random() * 3}s`,
  //             animationDuration: `${2 + Math.random() * 3}s`,
  //             transform: `rotate(${Math.random() * 360}deg)`,
  //           }}
  //         />
  //       ))}
  //     </div>

  //     <div className="relative z-10 container mx-auto px-4 py-8">
  //       {/* Header */}
  //       <div className="flex items-center justify-between mb-8">
  //         <div className="flex items-center">
  //           <Link href="/" className="flex items-center text-blue-300 hover:text-blue-200 transition-colors mr-6">
  //             <ArrowLeft className="mr-2" size={20} />
  //             Back to Home
  //           </Link>
  //           <div className="flex items-center">
  //             <Snowflake className="text-blue-300 mr-3" size={32} />
  //             <h1 className="text-3xl font-bold text-white">Ice Melting Point Prediction</h1>
             
  //           </div>
  //         </div>
          
  //         {/* Tab Switcher */}
  //         <div className="flex bg-indigo-800/30 rounded-lg p-1">
  //           <button
  //             onClick={() => setActiveTab('analyze')}
  //             className={`px-4 py-2 rounded-md flex items-center transition-all ${
  //               activeTab === 'analyze' 
  //                 ? 'bg-blue-500 text-white shadow-lg' 
  //                 : 'text-blue-200 hover:text-white'
  //             }`}
  //           >
  //             <Snowflake className="mr-2" size={16} />
  //             Analyze
  //           </button>
  //           <button
  //             onClick={() => setActiveTab('chat')}
  //             className={`px-4 py-2 rounded-md flex items-center transition-all relative ${
  //               activeTab === 'chat' 
  //                 ? 'bg-blue-500 text-white shadow-lg' 
  //                 : 'text-blue-200 hover:text-white'
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
  //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
  //             <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
  //               <Thermometer className="mr-3 text-blue-300" size={24} />
  //               Environmental Parameters
  //             </h2>

  //             <form onSubmit={handleSubmit} className="space-y-6">
  //               <div>
  //                 <label className="block text-blue-200 text-sm font-medium mb-2">
  //                   <Thermometer className="inline mr-2" size={16} />
  //                   Temperature (K)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   step="0.01"
  //                   value={temperature}
  //                   onChange={(e) => setTemperature(e.target.value)}
  //                   className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
  //                   placeholder="Enter temperature in Kelvin..."
  //                   required
  //                 />
  //                 <p className="text-xs text-blue-300 mt-1">
  //                   Example: 273.15K = 0°C (freezing point)
  //                 </p>
  //               </div>

  //               <div>
  //                 <label className="block text-blue-200 text-sm font-medium mb-2">
  //                   <Calendar className="inline mr-2" size={16} />
  //                   Year
  //                 </label>
  //                 <input
  //                   type="number"
  //                   min="2000"
  //                   max="2050"
  //                   value={year}
  //                   onChange={(e) => setYear(e.target.value)}
  //                   className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
  //                   placeholder="Enter year (2000-2050)..."
  //                   required
  //                 />
  //               </div>

  //               <div>
  //                 <label className="block text-blue-200 text-sm font-medium mb-2">
  //                   <Calendar className="inline mr-2" size={16} />
  //                   Month
  //                 </label>
  //                 <select
  //                   value={month}
  //                   onChange={(e) => setMonth(e.target.value)}
  //                   className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
  //                   required
  //                 >
  //                   <option value="">Select month...</option>
  //                   {months.map((monthName, index) => (
  //                     <option key={index} value={index + 1} className="bg-indigo-800">
  //                       {monthName}
  //                     </option>
  //                   ))}
  //                 </select>
  //               </div>

  //               <button
  //                 type="submit"
  //                 disabled={loading}
  //                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
  //               >
  //                 {loading ? (
  //                   <>
  //                     <Loader2 className="animate-spin mr-2" size={20} />
  //                     Analyzing with AI...
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Zap className="mr-2" size={20} />
  //                     Predict with AI
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
  //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
  //             <div className="flex items-center justify-between mb-6">
  //               <h2 className="text-2xl font-semibold text-white">Prediction Results</h2>
  //               {result !== null && (
  //                 <button
  //                   onClick={() => setActiveTab('chat')}
  //                   className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-sm hover:bg-green-500/30 transition-all flex items-center"
  //                 >
  //                   <MessageCircle className="mr-1" size={14} />
  //                   Ask Gemini AI
  //                 </button>
  //               )}
  //             </div>

  //             {result !== null ? (
  //               <div className="space-y-6">
  //                 {/* Main Result */}
  //                 <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-xl p-6 border border-blue-400/30">
  //                   <div className="text-center">
  //                     <Snowflake className="mx-auto mb-4 text-blue-300" size={48} />
  //                     <h3 className="text-lg text-blue-200 mb-2">Ice Melting Rate</h3>
  //                     <div className="text-4xl font-bold text-white mb-4">
  //                       {result} gton/month
  //                     </div>

  //                     {(() => {
  //                       const status = getMeltingStatus(result)
  //                       return (
  //                         <div className={`inline-block px-4 py-2 rounded-full ${status.bg} ${status.color} font-medium`}>
  //                           {status.status}
  //                         </div>
  //                       )
  //                     })()}
  //                   </div>
  //                 </div>

  //                 {/* Temperature Analysis */}
  //                 <div className="bg-indigo-800/30 rounded-lg p-6 border border-blue-400/20">
  //                   <h4 className="text-blue-200 font-medium mb-4 flex items-center">
  //                     <Thermometer className="mr-2" size={18} />
  //                     Temperature Analysis
  //                   </h4>
  //                   <div className="space-y-3">
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-blue-300">Temperature (K):</span>
  //                       <span className="text-white font-semibold">{temperature}K</span>
  //                     </div>
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-blue-300">Temperature (°C):</span>
  //                       <span className="text-white font-semibold">{(parseFloat(temperature) - 273.15).toFixed(2)}°C</span>
  //                     </div>
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-blue-300">Ice Melting Rate:</span>
  //                       <span className="text-white font-semibold">{result} gton/month</span>
  //                     </div>
  //                   </div>
  //                 </div>

  //                 {/* Environmental Context */}
  //                 <div className="bg-indigo-800/30 rounded-lg p-6 border border-blue-400/20">
  //                   <h4 className="text-blue-200 font-medium mb-4 flex items-center">
  //                     <Calendar className="mr-2" size={18} />
  //                     Environmental Context
  //                   </h4>
  //                   <div className="space-y-3">
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-blue-300">Year:</span>
  //                       <span className="text-white font-semibold">{year}</span>
  //                     </div>
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-blue-300">Month:</span>
  //                       <span className="text-white font-semibold">{months[parseInt(month) - 1]}</span>
  //                     </div>
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-blue-300">Season:</span>
  //                       <span className="text-white font-semibold">
  //                         {parseInt(month) >= 3 && parseInt(month) <= 5 ? 'Spring' :
  //                           parseInt(month) >= 6 && parseInt(month) <= 8 ? 'Summer' :
  //                             parseInt(month) >= 9 && parseInt(month) <= 11 ? 'Autumn' : 'Winter'}
  //                       </span>
  //                     </div>
  //                   </div>
  //                 </div>

  //                 {/* Recommendation */}
  //                 <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 rounded-lg p-6 border border-cyan-400/20">
  //                   <h4 className="text-cyan-200 font-medium mb-3">💡 Climate Insight</h4>
  //                   <p className="text-cyan-100 text-sm leading-relaxed">
  //                     The predicted ice melting rate of {result} gton at {(parseFloat(temperature) - 273.15).toFixed(2)}°C 
  //                     indicates {result > 0 ? 'active melting conditions' : 'stable ice conditions'} for {months[parseInt(month) - 1]} {year}.
  //                   </p>
  //                 </div>
  //               </div>
  //             ) : (
  //               <div className="flex items-center justify-center h-64 text-blue-300">
  //                 <div className="text-center">
  //                   <Snowflake className="mx-auto mb-4 opacity-50" size={48} />
  //                   <p>Enter parameters and click &quot;Predict with AI&quot; to see results</p>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       ) : (
  //         /* Chat Interface */
  //         <div className="max-w-4xl mx-auto">
  //           <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-blue-400/30 h-[600px] flex flex-col">
  //             {/* Chat Header */}
  //             <div className="p-6 border-b border-blue-400/20">
  //               <div className="flex items-center">
  //                 <Bot className="text-blue-300 mr-3" size={24} />
  //                 <h2 className="text-xl font-semibold text-white">Gemini AI Glaciology Assistant</h2>
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
  //                           ? 'bg-blue-500 text-white ml-4'
  //                           : 'bg-indigo-800/50 text-blue-100 mr-4 border border-blue-400/20'
  //                       }`}
  //                     >
  //                       <div className="flex items-start space-x-2">
  //                         {message.type === 'ai' && <Bot size={16} className="text-blue-300 mt-1 flex-shrink-0" />}
  //                         {message.type === 'user' && <User size={16} className="text-white mt-1 flex-shrink-0" />}
  //                         <div className="flex-1">
  //                           {message.type === 'ai' ? (
  //                             <MarkdownRenderer content={message.content} />
  //                           ) : (
  //                             <p className="whitespace-pre-wrap">{message.content}</p>
  //                           )}
  //                           <p className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-blue-100' : 'text-blue-300'}`}>
  //                             {message.timestamp.toLocaleTimeString()}
  //                           </p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 ))}
                  
  //                 {chatLoading && (
  //                   <div className="flex justify-start">
  //                     <div className="bg-indigo-800/50 text-blue-100 mr-4 border border-blue-400/20 p-4 rounded-2xl">
  //                       <div className="flex items-center space-x-2">
  //                         <Bot size={16} className="text-blue-300" />
  //                         <div className="flex space-x-1">
  //                           <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
  //                           <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
  //                           <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
  //                         </div>
  //                         <span className="text-xs text-blue-400">Gemini is thinking...</span>
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
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 relative overflow-hidden">
    {/* Animated Ice Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
      {[...Array(25)].map((_, i) => (
        <Snowflake
          key={i}
          className="absolute text-white/20 animate-pulse"
          size={12 + Math.random() * 20}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>

    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0">
          <Link href="/" className="flex items-center text-blue-300 hover:text-blue-200 transition-colors sm:mr-6">
            <ArrowLeft className="mr-2" size={20} />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          <div className="flex items-center">
            <Snowflake className="text-blue-300 mr-2 sm:mr-3" size={24} />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Ice Melting Point Prediction
            </h1>
          </div>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-indigo-800/30 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md flex items-center justify-center transition-all text-sm ${
              activeTab === 'analyze' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <Snowflake className="mr-1 sm:mr-2" size={14} />
            <span className="hidden sm:inline">Analyze</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-md flex items-center justify-center transition-all relative text-sm ${
              activeTab === 'chat' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <MessageCircle className="mr-1 sm:mr-2" size={14} />
            <span className="hidden sm:inline">AI Chat</span>
            {chatMessages.length > 1 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {chatMessages.length - 1}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'analyze' ? (
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-400/30">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
              <Thermometer className="mr-2 sm:mr-3 text-blue-300" size={20} />
              Environmental Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Thermometer className="inline mr-2" size={16} />
                  Temperature (K)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter temperature in Kelvin..."
                  required
                />
                <p className="text-xs text-blue-300 mt-1">
                  Example: 273.15K = 0°C (freezing point)
                </p>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Year
                </label>
                <input
                  type="number"
                  min="2000"
                  max="2030"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter year (2000-2030)..."
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">Select month...</option>
                  {months.map((monthName, index) => (
                    <option key={index} value={index + 1} className="bg-indigo-800">
                      {monthName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2" size={18} />
                    Predict with AI
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-400/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">Prediction Results</h2>
              {result !== null && (
                <button
                  onClick={() => setActiveTab('chat')}
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-green-500/30 transition-all flex items-center w-fit"
                >
                  <MessageCircle className="mr-1" size={12} />
                  Ask Gemini AI
                </button>
              )}
            </div>

            {result !== null ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-xl p-4 sm:p-6 border border-blue-400/30">
                  <div className="text-center">
                    <Snowflake className="mx-auto mb-3 sm:mb-4 text-blue-300" size={40} />
                    <h3 className="text-base sm:text-lg text-blue-200 mb-2">Ice Melting Rate</h3>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                      {result} gton/month
                    </div>

                    {(() => {
                      const status = getMeltingStatus(result)
                      return (
                        <div className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${status.bg} ${status.color} font-medium text-xs sm:text-sm`}>
                          {status.status}
                        </div>
                      )
                    })()}
                  </div>
                </div>

                {/* Temperature Analysis */}
                <div className="bg-indigo-800/30 rounded-lg p-4 sm:p-6 border border-blue-400/20">
                  <h4 className="text-blue-200 font-medium mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Thermometer className="mr-2" size={16} />
                    Temperature Analysis
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs sm:text-sm">Temperature (K):</span>
                      <span className="text-white font-semibold text-xs sm:text-sm">{temperature}K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs sm:text-sm">Temperature (°C):</span>
                      <span className="text-white font-semibold text-xs sm:text-sm">{(parseFloat(temperature) - 273.15).toFixed(2)}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs sm:text-sm">Ice Melting Rate:</span>
                      <span className="text-white font-semibold text-xs sm:text-sm">{result} gton/month</span>
                    </div>
                  </div>
                </div>

                {/* Environmental Context */}
                <div className="bg-indigo-800/30 rounded-lg p-4 sm:p-6 border border-blue-400/20">
                  <h4 className="text-blue-200 font-medium mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Calendar className="mr-2" size={16} />
                    Environmental Context
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs sm:text-sm">Year:</span>
                      <span className="text-white font-semibold text-xs sm:text-sm">{year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs sm:text-sm">Month:</span>
                      <span className="text-white font-semibold text-xs sm:text-sm">{months[parseInt(month) - 1]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-xs sm:text-sm">Season:</span>
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        {parseInt(month) >= 3 && parseInt(month) <= 5 ? 'Spring' :
                          parseInt(month) >= 6 && parseInt(month) <= 8 ? 'Summer' :
                            parseInt(month) >= 9 && parseInt(month) <= 11 ? 'Autumn' : 'Winter'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 rounded-lg p-4 sm:p-6 border border-cyan-400/20">
                  <h4 className="text-cyan-200 font-medium mb-2 sm:mb-3 text-sm sm:text-base">💡 Climate Insight</h4>
                  <p className="text-cyan-100 text-xs sm:text-sm leading-relaxed">
                    The predicted ice melting rate of {result} gton at {(parseFloat(temperature) - 273.15).toFixed(2)}°C 
                    indicates {result > 0 ? 'active melting conditions' : 'stable ice conditions'} for {months[parseInt(month) - 1]} {year}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 sm:h-64 text-blue-300">
                <div className="text-center px-4">
                  <Snowflake className="mx-auto mb-3 sm:mb-4 opacity-50" size={40} />
                  <p className="text-sm sm:text-base">Enter parameters and click &quot;Predict with AI&quot; to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Chat Interface */
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-blue-400/30 h-[500px] sm:h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 sm:p-6 border-b border-blue-400/20">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <Bot className="text-blue-300 mr-2 sm:mr-3" size={20} />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Gemini AI Glaciology Assistant</h2>
                </div>
                <div className="sm:ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-xs sm:text-sm">Powered by Google Gemini</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
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
                          ? 'bg-blue-500 text-white ml-2 sm:ml-4'
                          : 'bg-indigo-800/50 text-blue-100 mr-2 sm:mr-4 border border-blue-400/20'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'ai' && <Bot size={14} className="text-blue-300 mt-1 flex-shrink-0" />}
                        {message.type === 'user' && <User size={14} className="text-white mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          {message.type === 'ai' ? (
                            <MarkdownRenderer content={message.content} />
                          ) : (
                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                          )}
                          <p className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-blue-100' : 'text-blue-300'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-indigo-800/50 text-blue-100 mr-2 sm:mr-4 border border-blue-400/20 p-3 sm:p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Bot size={14} className="text-blue-300" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-blue-400">Gemini is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
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
                    placeholder="Ask Gemini about seawater properties, predictions, or marine science..."
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
                        
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {[
                  "Explain density results",
                  "What affects sound velocity?",
                  "Compare with pure water",
                  "Help me understand the data"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setChatInput(suggestion)}
                    className="text-xs bg-blue-700/30 text-cyan-200 px-2 sm:px-3 py-1 rounded-full hover:bg-blue-700/50 transition-all"
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
        width: 6px;
      }
      .custom-scroll::-webkit-scrollbar-track {
        background: rgba(59, 130, 246, 0.1);
        border-radius: 3px;
      }
      .custom-scroll::-webkit-scrollbar-thumb {
        background: rgba(34, 211, 238, 0.5);
        border-radius: 3px;
      }
      .custom-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(34, 211, 238, 0.7);
      }
    `}</style>
  </div>
);
}