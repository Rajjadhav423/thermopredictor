'use client'
import { useState } from 'react'
import { ArrowLeft, Send, Loader2, Waves, Thermometer, Beaker } from 'lucide-react'
import Link from 'next/link'

interface SeawaterResult {
  "Seawater Density (kg/m³)": number
  "Ultrasonic Velocity (m/s)": number
  "Thermal Expansion Coefficient (K⁻¹)": number
  "Adiabatic Compressibility (TPa⁻¹)": number
  "Isothermal Compressibility (TPa⁻¹)": number
  "Heat Capacity (kJ/kg·K)": number
  "Intermolecular Free Length (×10⁻¹¹ m)": number
  "Internal Pressure (MPa)": number
  "Cohesion Energy Density (Pa·m)": number
  "Grüneisen Parameter": number
  "Acoustic Impedance (×10⁴ kg/m²·s)": number
  "Non-Linearity Parameter": number
}

export default function SeawaterPage() {
  const [temperature, setTemperature] = useState('')
  const [salinity, setSalinity] = useState('')
  const [result, setResult] = useState<SeawaterResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://ligninchatbot.onrender.com/predict_seawater', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature: parseFloat(temperature),
          salinity: parseFloat(salinity),
        }),
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const data = await response.json()
      setResult(data.prediction)
    } catch {
      setError('Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatValue = (value: number): string => {
    if (value > 1000 || value < 0.001) {
      return value.toExponential(3)
    }
    return value.toFixed(4)
  }

  const getPropertyIcon = (property: string) => {
    if (property.includes('Density')) return '⚖️'
    if (property.includes('Velocity')) return '🌊'
    if (property.includes('Temperature') || property.includes('Thermal')) return '🌡️'
    if (property.includes('Compressibility')) return '🔬'
    if (property.includes('Heat')) return '🔥'
    if (property.includes('Pressure')) return '💨'
    if (property.includes('Acoustic')) return '🔊'
    return '📊'
  }

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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-cyan-300 hover:text-cyan-200 transition-colors mr-6">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          <div className="flex items-center">
            <Waves className="text-cyan-300 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-white">Seawater Analysis</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Beaker className="mr-3 text-cyan-300" size={24} />
              Input Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-cyan-200 text-sm font-medium mb-2">
                  <Thermometer className="inline mr-2" size={16} />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  placeholder="Enter temperature..."
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-200 text-sm font-medium mb-2">
                  <Waves className="inline mr-2" size={16} />
                  Salinity (ppt)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={salinity}
                  onChange={(e) => setSalinity(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-800/50 border border-cyan-400/50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  placeholder="Enter salinity..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Analyze Seawater
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
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30">
            <h2 className="text-2xl font-semibold text-white mb-6">Analysis Results</h2>

            {result ? (
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scroll">
                {Object.entries(result).map(([property, value]) => (
                  <div key={property} className="bg-blue-800/30 rounded-lg p-4 border border-cyan-400/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-xl mr-3">{getPropertyIcon(property)}</span>
                        <div>
                          <h4 className="text-cyan-200 font-medium text-sm mb-1">{property}</h4>
                          <p className="text-white text-lg font-semibold">{formatValue(value)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-cyan-300">
                <div className="text-center">
                  <Waves className="mx-auto mb-4 opacity-50" size={48} />
                  <p>Enter parameters and click &quot;Analyze Seawater&quot; to see results</p>
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
          background: rgba(34, 211, 238, 0.5);
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.7);
        }
      `}</style>
    </div>
  )
}
