'use client'
import { useState } from 'react'
import {  Send, Loader2, Snowflake, Thermometer, Calendar, Activity, Waves, Zap, ArrowLeft } from 'lucide-react'
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

export default function IceMeltingPage() {
  const [temperature, setTemperature] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
const Base_url = process.env.NEXT_PUBLIC_BASE_URL

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handleSubmit = async () => {
    if (!temperature || !year || !month) {
      setError('Please fill all required fields')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${Base_url}/multi-output`, {
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
    } catch (err) {
      console.error(err);
      setError('Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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

const formatPredictionValue: FormatPredictionValue = (key, value) => {
    if (typeof value === 'number') {
        if (Math.abs(value) < 0.01 && value !== 0) {
            return value.toExponential(3)
        }
        return value.toFixed(3)
    }
    return value
}

interface PredictionIconMap {
    (key: string): React.ComponentType<{ className?: string; size?: number }>;
}

const getPredictionIcon: PredictionIconMap = (key) => {
    if (key.toLowerCase().includes('temperature') || key.toLowerCase().includes('thermal')) return Thermometer
    if (key.toLowerCase().includes('velocity') || key.toLowerCase().includes('ultrasonic')) return Waves
    if (key.toLowerCase().includes('density') || key.toLowerCase().includes('pressure')) return Activity
    if (key.toLowerCase().includes('energy') || key.toLowerCase().includes('capacity')) return Zap
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
         <Link href="/" className="flex items-center mb-3 text-blue-300 hover:text-blue-200 transition-colors mr-6">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
        <div className="flex items-center mb-8">
          <div className="flex items-center">
            <Snowflake className="text-blue-300 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-white">Ice Properties Prediction System</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Thermometer className="mr-3 text-blue-300" size={24} />
              Environmental Parameters
            </h2>

            <div className="space-y-6">
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
                type="button"
                onClick={handleSubmit}
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
                    Predict Ice Properties
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
             
               

            
                {/* Ice Melting Rate - Highlighted */}
                {result.predictions && result.predictions['ice melting rate (gton/month)'] !== undefined && (
                  <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 rounded-2xl p-6 border border-blue-400/30">
                    <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                      <Snowflake className="mr-3 text-blue-300" size={32} />
                      Ice Melting Rate
                    </h3>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white mb-4">
                        {result.predictions['ice melting rate (gton/month)']} 
                        <span className="text-2xl text-blue-300 ml-2">gton/month</span>
                      </div>
                      {(() => {
                        const status = getMeltingStatus(result.predictions['ice melting rate (gton/month)'])
                        return (
                          <div className={`inline-block px-6 py-3 rounded-full ${status.bg} ${status.color} font-medium text-lg`}>
                            {status.status}
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                )}

                {/* All Predictions */}
                {result.predictions && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Activity className="mr-3 text-cyan-300" size={24} />
                      Complete Prediction Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scroll">
                      {Object.entries(result.predictions).map(([key, value], index) => {
                        const IconComponent = getPredictionIcon(key)
                        return (
                          <div key={index} className="bg-indigo-800/30 rounded-lg p-4 border border-blue-400/20 hover:bg-indigo-800/40 transition-colors">
                            <div className="flex items-start space-x-3">
                              <IconComponent className="text-cyan-300 mt-1 flex-shrink-0" size={18} />
                              <div className="flex-1 min-w-0">
                                <div className="text-blue-200 text-sm font-medium truncate" title={key}>
                                  {key}
                                </div>
                                <div className="text-white font-semibold text-lg mt-1">
                                  {formatPredictionValue(key, value)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Prediction Timestamp */}
                {result.prediction_timestamp && (
                  <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-blue-400/20">
                    <div className="text-blue-300 text-sm">
                      Prediction generated at: {new Date(result.prediction_timestamp).toLocaleString()}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30">
                <div className="flex items-center justify-center h-64 text-blue-300">
                  <div className="text-center">
                    <Snowflake className="mx-auto mb-4 opacity-50" size={48} />
                    <p>Enter parameters and click &quot;Predict Ice Properties&quot; to see results</p>
                  </div>
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