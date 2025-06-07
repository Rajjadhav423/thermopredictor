'use client'
import { useState } from 'react'
import { ArrowLeft, Send, Loader2, Snowflake, Thermometer, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function IceMeltingPage() {
  const [temperature, setTemperature] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://ligninchatbot.onrender.com/predict/ice', {
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
      console.log("response is ", response)
      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      console.log("response is ", response)

      const data = await response.json()
      console.log("data is ",data)
      setResult(data.predicted_ice_melting_rate)
    } catch (err) {
      console.error(err);
      setError('Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getMeltingStatus = (meltingPoint: number) => {
    if (meltingPoint < -10) return { status: 'Frozen Solid', color: 'text-blue-300', bg: 'bg-blue-500/20' }
    if (meltingPoint < -5) return { status: 'Very Cold', color: 'text-cyan-300', bg: 'bg-cyan-500/20' }
    if (meltingPoint < 0) return { status: 'Below Freezing', color: 'text-indigo-300', bg: 'bg-indigo-500/20' }
    if (meltingPoint < 5) return { status: 'Near Melting', color: 'text-yellow-300', bg: 'bg-yellow-500/20' }
    return { status: 'Melting', color: 'text-red-300', bg: 'bg-red-500/20' }
  }

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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-blue-300 hover:text-blue-200 transition-colors mr-6">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          <div className="flex items-center">
            <Snowflake className="text-blue-300 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-white">Ice Melting Point Prediction</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Thermometer className="mr-3 text-blue-300" size={24} />
              Environmental Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Enter temperature..."
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Year
                </label>
                <input
                  type="number"
                  min="2000"
                  max="2050"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Enter year..."
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
                  className="w-full px-4 py-3 bg-indigo-800/50 border border-blue-400/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
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
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Predict Melting Point
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
            <h2 className="text-2xl font-semibold text-white mb-6">Prediction Results</h2>

            {result !== null ? (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-xl p-6 border border-blue-400/30">
                  <div className="text-center">
                    <Snowflake className="mx-auto mb-4 text-blue-300" size={48} />
                    <h3 className="text-lg text-blue-200 mb-2">Ice Melting Point</h3>
                    <div className="text-4xl font-bold text-white mb-4">
                      {result} (gton)
                    </div>
                    
                    {(() => {
                      const status = getMeltingStatus(result)
                      return (
                        <div className={`inline-block px-4 py-2 rounded-full ${status.bg} ${status.color} font-medium`}>
                          {status.status}
                        </div>
                      )
                    })()}
                  </div>
                </div>

                {/* Temperature Analysis */}
                <div className="bg-indigo-800/30 rounded-lg p-6 border border-blue-400/20">
                  <h4 className="text-blue-200 font-medium mb-4 flex items-center">
                    <Thermometer className="mr-2" size={18} />
                    Temperature Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Input Temperature:</span>
                      <span className="text-white font-semibold">{temperature}K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Predicted Melting Point:</span>
                      <span className="text-white font-semibold">{result}K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Temperature Difference:</span>
                      <span className={`font-semibold ${parseFloat(temperature) > result ? 'text-red-300' : 'text-blue-300'}`}>
                        {(parseFloat(temperature) - result)}K
                      </span>
                    </div>
                  </div>
                </div>

                {/* Environmental Context */}
                <div className="bg-indigo-800/30 rounded-lg p-6 border border-blue-400/20">
                  <h4 className="text-blue-200 font-medium mb-4 flex items-center">
                    <Calendar className="mr-2" size={18} />
                    Environmental Context
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Year:</span>
                      <span className="text-white font-semibold">{year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Month:</span>
                      <span className="text-white font-semibold">{months[parseInt(month) - 1]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Season:</span>
                      <span className="text-white font-semibold">
                        {parseInt(month) >= 3 && parseInt(month) <= 5 ? 'Spring' :
                         parseInt(month) >= 6 && parseInt(month) <= 8 ? 'Summer' :
                         parseInt(month) >= 9 && parseInt(month) <= 11 ? 'Autumn' : 'Winter'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-cyan-800/30 to-blue-800/30 rounded-lg p-6 border border-cyan-400/20">
                  <h4 className="text-cyan-200 font-medium mb-3">💡 Insight</h4>
                  <p className="text-cyan-100 text-sm leading-relaxed">
                    {parseFloat(temperature) > result 
                      ? `At ${temperature}°C, the ice is likely to melt as it's above the predicted melting point of ${result}°C.`
                      : `At ${temperature}°C, the ice should remain solid as it's below the predicted melting point of ${result}°C.`
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-blue-300">
                <div className="text-center">
                  <Snowflake className="mx-auto mb-4 opacity-50" size={48} />
                  <p>Enter parameters and click &quot;Predict Melting Point&quot; to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
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
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  )
}
