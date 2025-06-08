// // ligninfrontend\src\app\allprediction\page.tsx
// 'use client'
// import { useState } from 'react'
// import {  Send, Loader2, Snowflake, Thermometer, Calendar, Activity, Waves, Zap, ArrowLeft } from 'lucide-react'
// import Link from 'next/link'


// type PredictionResult = {
//   model_info?: {
//     model_name: string
//     overall_r2_score: number
//     overall_rmse: number
//     output_count: number
//   }
//   input_parameters?: {
//     year: number
//     month: number
//     temperature_k: number
//     temperature_celsius?: number
//   }
//   predictions?: {
//     [key: string]: number
//   }
//   prediction_timestamp?: string
// }

// export default function IceMeltingPage() {
//   const [temperature, setTemperature] = useState('')
//   const [year, setYear] = useState('')
//   const [month, setMonth] = useState('')
//   const [result, setResult] = useState<PredictionResult | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
// const Base_url = process.env.NEXT_PUBLIC_BASE_URL

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ]

//   const handleSubmit = async () => {
//     if (!temperature || !year || !month) {
//       setError('Please fill all required fields')
//       return
//     }

//     setLoading(true)
//     setError('')

//     try {
//       const response = await fetch(`${Base_url}/predict/multi-output`, {
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

//       if (!response.ok) {
//         throw new Error('Prediction failed')
//       }

//       const data = await response.json()
//       console.log("Full API response:", data)
//       setResult(data)
//     } catch (err) {
//       console.error(err);
//       setError('Failed to get prediction. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

// interface MeltingStatus {
//     status: string
//     color: string
//     bg: string
// }

// const getMeltingStatus = (meltingPoint: number): MeltingStatus => {
//     if (meltingPoint < -10) return { status: 'Frozen Solid', color: 'text-blue-300', bg: 'bg-blue-500/20' }
//     if (meltingPoint < -5) return { status: 'Very Cold', color: 'text-cyan-300', bg: 'bg-cyan-500/20' }
//     if (meltingPoint < 0) return { status: 'Below Freezing', color: 'text-indigo-300', bg: 'bg-indigo-500/20' }
//     if (meltingPoint < 5) return { status: 'Near Melting', color: 'text-yellow-300', bg: 'bg-yellow-500/20' }
//     return { status: 'Melting', color: 'text-red-300', bg: 'bg-red-500/20' }
// }

// interface FormatPredictionValue {
//     (key: string, value: number | string): string | number;
// }

// const formatPredictionValue: FormatPredictionValue = (key, value) => {
//     if (typeof value === 'number') {
//         if (Math.abs(value) < 0.01 && value !== 0) {
//             return value.toExponential(3)
//         }
//         return value.toFixed(3)
//     }
//     return value
// }

// interface PredictionIconMap {
//     (key: string): React.ComponentType<{ className?: string; size?: number }>;
// }

// const getPredictionIcon: PredictionIconMap = (key) => {
//     if (key.toLowerCase().includes('temperature') || key.toLowerCase().includes('thermal')) return Thermometer
//     if (key.toLowerCase().includes('velocity') || key.toLowerCase().includes('ultrasonic')) return Waves
//     if (key.toLowerCase().includes('density') || key.toLowerCase().includes('pressure')) return Activity
//     if (key.toLowerCase().includes('energy') || key.toLowerCase().includes('capacity')) return Zap
//     return Activity
// }

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
//          <Link href="/" className="flex items-center mb-3 text-blue-300 hover:text-blue-200 transition-colors mr-6">
//             <ArrowLeft className="mr-2" size={20} />
//             Back to Home
//           </Link>
//         <div className="flex items-center mb-8">
//           <div className="flex items-center">
//             <Snowflake className="text-blue-300 mr-3" size={32} />
//             <h1 className="text-3xl font-bold text-white">Ice Properties Prediction System</h1>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Form */}
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
//             <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
//               <Thermometer className="mr-3 text-blue-300" size={24} />
//               Environmental Parameters
//             </h2>

//             <div className="space-y-6">
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
//                 type="button"
//                 onClick={handleSubmit}
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
//                     Predict Ice Properties
//                   </>
//                 )}
//               </button>
//             </div>

//             {error && (
//               <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* Results */}
//           <div className="space-y-6">
//             {result ? (
//               <>




//                 {/* Ice Melting Rate - Highlighted */}
//                 {result.predictions && result.predictions['ice melting rate (gton/month)'] !== undefined && (
//                   <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-2xl p-6 border border-blue-400/30">
//                     <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
//                       <Snowflake className="mr-3 text-blue-300" size={32} />
//                       Ice Melting Rate
//                     </h3>
//                     <div className="text-center">
//                       <div className="text-5xl font-bold text-white mb-4">
//                         {result.predictions['ice melting rate (gton/month)']} 
//                         <span className="text-2xl text-blue-300 ml-2">gton/month</span>
//                       </div>
//                       {(() => {
//                         const status = getMeltingStatus(result.predictions['ice melting rate (gton/month)'])
//                         return (
//                           <div className={`inline-block px-6 py-3 rounded-full ${status.bg} ${status.color} font-medium text-lg`}>
//                             {status.status}
//                           </div>
//                         )
//                       })()}
//                     </div>
//                   </div>
//                 )}

//                 {/* All Predictions */}
//                 {result.predictions && (
//                   <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
//                     <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
//                       <Activity className="mr-3 text-cyan-300" size={24} />
//                       Complete Prediction Results
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scroll">
//                       {Object.entries(result.predictions).map(([key, value], index) => {
//                         const IconComponent = getPredictionIcon(key)
//                         return (
//                           <div key={index} className="bg-indigo-800/30 rounded-lg p-4 border border-blue-400/20 hover:bg-indigo-800/40 transition-colors">
//                             <div className="flex items-start space-x-3">
//                               <IconComponent className="text-cyan-300 mt-1 flex-shrink-0" size={18} />
//                               <div className="flex-1 min-w-0">
//                                 <div className="text-blue-200 text-sm font-medium truncate" title={key}>
//                                   {key}
//                                 </div>
//                                 <div className="text-white font-semibold text-lg mt-1">
//                                   {formatPredictionValue(key, value)}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Prediction Timestamp */}
//                 {result.prediction_timestamp && (
//                   <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-blue-400/20">
//                     <div className="text-blue-300 text-sm">
//                       Prediction generated at: {new Date(result.prediction_timestamp).toLocaleString()}
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
//                 <div className="flex items-center justify-center h-64 text-blue-300">
//                   <div className="text-center">
//                     <Snowflake className="mx-auto mb-4 opacity-50" size={48} />
//                     <p>Enter parameters and click &quot;Predict Ice Properties&quot; to see results</p>
//                   </div>
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


// ligninfrontend\src\app\allprediction\page.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Snowflake, Thermometer, Calendar, Activity, Waves, Zap, ArrowLeft, MessageCircle, Bot, User, Info } from 'lucide-react'
import Link from 'next/link'

type PredictionResult = {
    model_info?: {
        model_name: string
        overall_r2_score: number
        overall_rmse: number
        output_count: number
    }
    input_parameters?: {
        year: number
        month: number
        temperature_k: number
        temperature_celsius?: number
    }
    predictions?: {
        [key: string]: number
    }
    prediction_timestamp?: string
}

interface ChatMessage {
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    data?: PredictionResult;
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

export default function IceMeltingPage() {
    const [temperature, setTemperature] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [result, setResult] = useState<PredictionResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Chat states
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'ai',
            content: '❄️ **Hello!** I\'m your AI Ice Properties Assistant powered by *Google Gemini*. \n\nI can help you:\n• Understand ice melting predictions\n• Explain environmental impacts\n• Answer questions about ice physics\n• Interpret prediction results\n\n**Try analyzing some ice properties first!** 🧊',
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

    const handleSubmit = async () => {
        if (!temperature || !year || !month) {
            setError('Please fill all required fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${Base_url}/predict/multi-output`, {
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
            console.log("Full API response:", data)
            setResult(data)

            // Generate AI explanation using Gemini
            const analysisPrompt = `As an ice physics and climate science expert, provide a comprehensive analysis of these ice property predictions for temperature ${temperature}K in ${months[parseInt(month) - 1]} ${year}:

${data.predictions ? Object.entries(data.predictions).map(([key, value]) => `${key}: ${value}`).join('\n') : 'No predictions available'}

Please provide:
1. **Ice Melting Analysis** - What does the melting rate tell us about current conditions?
2. **Environmental Context** - How do these values relate to climate patterns?
3. **Physical Properties Explanation** - Key insights about the predicted ice properties
4. **Seasonal Impact** - How does the month/season affect these predictions?
5. **Climate Implications** - What do these results suggest about environmental changes?

Format your response with clear headers and bullet points for easy reading. Use emojis appropriately and keep it informative yet engaging.`;

            const aiResponse = await callGeminiAPI(analysisPrompt);
            addAIMessage(`🎯 **Ice Analysis Complete!**\n\n${aiResponse}`, data);

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
    const addMessage = (type: 'user' | 'ai', content: string, data?: PredictionResult | undefined) => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date(),
            data
        };
        setChatMessages(prev => [...prev, newMessage]);
    };

    const addAIMessage = (content: string, data?: PredictionResult | undefined) => addMessage('ai', content, data);
    const addUserMessage = (content: string) => addMessage('user', content);

    // Generate AI response using Gemini
    const generateAIResponse = async (userMessage: string, currentResult?: PredictionResult): Promise<string> => {
        let prompt = '';

        if (currentResult?.predictions) {
            prompt = `You are an expert ice physics and climate science AI assistant. The user has analyzed ice properties with the following predictions:

Temperature: ${currentResult.input_parameters?.temperature_k}K
Year: ${currentResult.input_parameters?.year}
Month: ${currentResult.input_parameters?.month}

${Object.entries(currentResult.predictions).map(([key, value]) => `${key}: ${value}`).join('\n')}

User question: "${userMessage}"

Provide a helpful, accurate, and engaging response about ice properties, climate science, or environmental impacts. Use markdown formatting with:
- **Bold text** for important terms
- *Italic text* for emphasis
- Bullet points for lists
- Code blocks for formulas if needed
- Headers (##) for sections if appropriate

Use appropriate emojis and keep it conversational but informative. Focus on ice physics, climate science, and environmental implications.`;
        } else {
            prompt = `You are an expert ice physics and climate science AI assistant. The user hasn't run any ice property analysis yet.

User message: "${userMessage}"

Provide a helpful response encouraging them to run an analysis first, or answer general questions about ice properties, climate science, or environmental impacts. Use markdown formatting with:
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

    interface MeltingStatus {
        status: string
        color: string
        bg: string
    }

    const getMeltingStatus = (meltingPoint: number): MeltingStatus => {
        if (meltingPoint < -10) return { status: 'Frozen Solid', color: 'text-blue-300', bg: 'bg-blue-500/20' }
        if (meltingPoint < -5) return { status: 'Very Cold', color: 'text-cyan-300', bg: 'bg-cyan-500/20' }
        if (meltingPoint < 0) return { status: 'Below Freezing', color: 'text-indigo-300', bg: 'bg-indigo-500/20' }
        if (meltingPoint < 5) return { status: 'Near Melting', color: 'text-yellow-300', bg: 'bg-yellow-500/20' }
        return { status: 'Melting', color: 'text-red-300', bg: 'bg-red-500/20' }
    }

    interface FormatPredictionValue {
        (key: string, value: number | string): string | number;
    }

    // const formatPredictionValue: FormatPredictionValue = (key, value) => {
    //     if (typeof value === 'number') {
    //         if (Math.abs(value) < 0.0001 && value !== 0) {
    //             return value.toExponential(4)
    //         }
    //         return value.toFixed(4)
    //     }
    //     return value
    // }
    const formatPredictionValue: FormatPredictionValue = (key, value) => {
    if (typeof value === 'number') {
        return value.toFixed(4); // always fixed to 4 decimal places
    }
    return value;
};


    interface PredictionIconMap {
        (key: string): React.ComponentType<{ className?: string; size?: number }>;
    }

    const getPredictionIcon: PredictionIconMap = (key) => {
        if (key.toLowerCase().includes('temperature') || key.toLowerCase().includes('thermal')) return Thermometer
        if (key.toLowerCase().includes('velocity') || key.toLowerCase().includes('ultrasonic')) return Waves
        if (key.toLowerCase().includes('density') || key.toLowerCase().includes('pressure')) return Activity
        if (key.toLowerCase().includes('energy') || key.toLowerCase().includes('capacity')) return Zap
        if (key.toLowerCase().includes('melting')) return Snowflake
        return Activity
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 relative overflow-hidden">
            {/* Animated Ice Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
                {[...Array(25)].map((_, i) => (
                    <Snowflake
                        key={i}
                        className="absolute text-white/20 animate-pulse hidden sm:block"
                        size={8 + Math.random() * 16}
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

            <div className="relative z-10 container mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-8">
                {/* Header */}
                <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                        <Link href="/" className="flex items-center text-blue-300 hover:text-blue-200 transition-colors sm:mr-4 lg:mr-6">
                            <ArrowLeft className="mr-1 sm:mr-2" size={18} />
                            <span className="text-sm sm:text-base">Back to Home</span>
                        </Link>
                        <div className="flex items-center">
                            <Snowflake className="text-blue-300 mr-2" size={20} />
                            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-white">
                                <span className="block sm:hidden">Ice Prediction</span>
                                <span className="hidden sm:block lg:hidden">Ice Properties System</span>
                                <span className="hidden lg:block">Ice Properties Prediction System</span>
                            </h1>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-indigo-800/30 rounded-lg p-1 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab('analyze')}
                            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md flex items-center justify-center transition-all text-sm ${activeTab === 'analyze'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-blue-200 hover:text-white'
                                }`}
                        >
                            <Activity className="mr-1 sm:mr-2" size={14} />
                            Analyze
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md flex items-center justify-center transition-all relative text-sm ${activeTab === 'chat'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-blue-200 hover:text-white'
                                }`}
                        >
                            <MessageCircle className="mr-1 sm:mr-2" size={14} />
                            AI Chat
                            {chatMessages.length > 1 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {chatMessages.length - 1}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {activeTab === 'analyze' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {/* Input Form */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-400/30">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
                                <Thermometer className="mr-2 sm:mr-3 text-blue-300" size={18} />
                                Environmental Parameters
                            </h2>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-blue-200 text-sm font-medium mb-2">
                                        <Thermometer className="inline mr-2" size={14} />
                                        Temperature (K)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={temperature}
                                        onChange={(e) => setTemperature(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm sm:text-base"
                                        placeholder="Enter temperature..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-blue-200 text-sm font-medium mb-2">
                                        <Calendar className="inline mr-2" size={14} />
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        min="2000"
                                        max="2050"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm sm:text-base"
                                        placeholder="Enter year..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-blue-200 text-sm font-medium mb-2">
                                        <Calendar className="inline mr-2" size={14} />
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
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={18} />
                                            <span>Analyzing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="mr-2" size={18} />
                                            <span className="hidden sm:inline">Predict Ice Properties</span>
                                            <span className="sm:hidden">Predict</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-xs sm:text-sm">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Results */}
                        <div className="space-y-4 sm:space-y-6">
                            {result ? (
                                <>
                                    {/* Ice Melting Rate - Highlighted */}
                                    {result.predictions && result.predictions['ice melting rate (gton/month)'] !== undefined && (
                                        <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-400/30">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white flex items-center mb-2 sm:mb-0">
                                                    <Snowflake className="mr-2 text-blue-300" size={20} />
                                                    Ice Melting Rate
                                                </h3>
                                                {result && (
                                                    <button
                                                        onClick={() => setActiveTab('chat')}
                                                        className="bg-green-500/20 text-green-300 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-green-500/30 transition-all flex items-center self-start sm:self-auto"
                                                    >
                                                        <MessageCircle className="mr-1" size={12} />
                                                        <span>Ask AI</span>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                                                    {formatPredictionValue("one",result.predictions['ice melting rate (gton/month)'])}
                                                    <span className="text-sm sm:text-lg lg:text-2xl text-blue-300 ml-1 sm:ml-2 block sm:inline">gton/month</span>
                                                </div>
                                                {(() => {
                                                    const status = getMeltingStatus(result.predictions['ice melting rate (gton/month)'])
                                                    return (
                                                        <div className={`inline-block px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full ${status.bg} ${status.color} font-medium text-sm sm:text-base lg:text-lg`}>
                                                            {status.status}
                                                        </div>
                                                    )
                                                })()}
                                            </div>
                                        </div>
                                    )}

                                    {/* All Predictions */}
                                    {result.predictions && (
                                        <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-400/30">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
                                                <Activity className="mr-2 sm:mr-3 text-cyan-300" size={18} />
                                                Complete Prediction Results
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3 sm:gap-4 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto custom-scroll">
                                                {Object.entries(result.predictions).map(([key, value], index) => {
                                                    const IconComponent = getPredictionIcon(key)
                                                    return (
                                                        <div key={index} className="bg-indigo-800/30 rounded-lg p-3 sm:p-4 border border-blue-400/20 hover:bg-indigo-800/40 transition-colors">
                                                            <div className="flex items-start space-x-2 sm:space-x-3">
                                                                <IconComponent className="text-cyan-300 mt-1 flex-shrink-0" size={14} />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-blue-200 text-xs sm:text-sm font-medium leading-tight mb-1" title={key}>
                                                                        {key.length > 30 ? `${key.substring(0, 30)}...` : key}
                                                                    </div>
                                                                    <div className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                                                                        {formatPredictionValue(key, value)}
                                                                    </div>
                                                                </div>
                                                                <Info className="text-blue-400/50 hover:text-blue-400 transition-all flex-shrink-0" size={12} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Prediction Timestamp */}
                                    {result.prediction_timestamp && (
                                        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-blue-400/20">
                                            <div className="text-blue-300 text-xs sm:text-sm">
                                                Prediction generated at: {new Date(result.prediction_timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-400/30">
                                    <div className="flex items-center justify-center h-32 sm:h-40 lg:h-64 text-blue-300">
                                        <div className="text-center px-4">
                                            <Snowflake className="mx-auto mb-3 sm:mb-4 opacity-50" size={24} />
                                            <p className="text-xs sm:text-sm lg:text-base">
                                                <span className="block sm:hidden">Enter parameters to see results</span>
                                                <span className="hidden sm:block">Enter parameters and click &quot;Predict Ice Properties&quot; to see results</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Chat Interface */
                    <div className="max-w-full lg:max-w-6xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-blue-400/30 h-[calc(100vh-200px)] sm:h-[70vh] lg:h-[600px] flex flex-col">
                            {/* Chat Header */}
                            <div className="p-3 sm:p-4 lg:p-6 border-b border-blue-400/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center min-w-0 flex-1">
                                        <Bot className="text-blue-300 mr-2 flex-shrink-0" size={18} />
                                        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white truncate">
                                            <span className="block sm:hidden">AI Assistant</span>
                                            <span className="hidden sm:block lg:hidden">Gemini AI Assistant</span>
                                            <span className="hidden lg:block">Gemini AI Ice Properties Assistant</span>
                                        </h2>
                                    </div>
                                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-300 text-xs hidden sm:inline">Gemini</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto custom-scroll">
                                <div className="space-y-3 sm:space-y-4">
                                    {chatMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl ${message.type === 'user'
                                                        ? 'bg-cyan-500 text-white ml-2'
                                                        : 'bg-blue-800/50 text-cyan-100 mr-2 border border-cyan-400/20'
                                                    }`}
                                            >
                                                <div className="flex items-start space-x-2">
                                                    {message.type === 'ai' && <Bot size={14} className="text-cyan-300 mt-1 flex-shrink-0" />}
                                                    {message.type === 'user' && <User size={14} className="text-white mt-1 flex-shrink-0" />}
                                                    <div className="flex-1 min-w-0">
                                                        {message.type === 'ai' ? (
                                                            <MarkdownRenderer content={message.content} />
                                                        ) : (
                                                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
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
                                            <div className="bg-blue-800/50 text-cyan-100 mr-2 border border-cyan-400/20 p-3 sm:p-4 rounded-2xl">
                                                <div className="flex items-center space-x-2">
                                                    <Bot size={14} className="text-cyan-300" />
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                    <span className="text-xs text-cyan-400">Thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-3 sm:p-4 lg:p-6 border-t border-cyan-400/20">
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
                                            placeholder="Ask about ice properties..."
                                            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
                                            disabled={chatLoading}
                                        />
                                        <button
                                            onClick={handleChatSubmit}
                                            disabled={!chatInput.trim() || chatLoading}
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                                    {[
                                        "Explain results",
                                        "Sound velocity?",
                                        "Compare water",
                                        "Help understand"
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