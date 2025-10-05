"use client"

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Button } from './ui/button'
import { BarChart3, LineChart as LineChartIcon, Radar as RadarIcon } from 'lucide-react'

const sampleData = [
  { name: 'Day 1', geneExpression: 65, growth: 45, biomass: 30 },
  { name: 'Day 7', geneExpression: 75, growth: 62, biomass: 48 },
  { name: 'Day 14', geneExpression: 85, growth: 78, biomass: 65 },
  { name: 'Day 21', geneExpression: 90, growth: 85, biomass: 78 },
  { name: 'Day 28', geneExpression: 88, growth: 90, biomass: 85 },
]

const radarData = [
  { subject: 'Growth Rate', A: 85, fullMark: 100 },
  { subject: 'Gene Expression', A: 90, fullMark: 100 },
  { subject: 'Biomass', A: 78, fullMark: 100 },
  { subject: 'Root Density', A: 70, fullMark: 100 },
  { subject: 'Leaf Count', A: 82, fullMark: 100 },
]

type ChartType = 'bar' | 'line' | 'radar'

export default function GraphVisualization() {
  const [chartType, setChartType] = useState<ChartType>('bar')

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex gap-1.5 sm:gap-2 justify-center flex-wrap">
        <Button
          variant={chartType === 'bar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('bar')}
          className={`text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 ${chartType === 'bar' 
            ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
            : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
          }`}
        >
          <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Bar
        </Button>
        <Button
          variant={chartType === 'line' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('line')}
          className={`text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 ${chartType === 'line' 
            ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
            : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
          }`}
        >
          <LineChartIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Line
        </Button>
        <Button
          variant={chartType === 'radar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('radar')}
          className={`text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 ${chartType === 'radar' 
            ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
            : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
          }`}
        >
          <RadarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Radar
        </Button>
      </div>

      <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#a855f7" tick={{ fontSize: 10 }} />
              <YAxis stroke="#a855f7" tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#000000cc', 
                  border: '1px solid #a855f7',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="geneExpression" fill="#8b5cf6" name="Gene Expression" />
              <Bar dataKey="growth" fill="#06b6d4" name="Growth Rate" />
              <Bar dataKey="biomass" fill="#10b981" name="Biomass" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {chartType === 'line' && (
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#a855f7" tick={{ fontSize: 10 }} />
              <YAxis stroke="#a855f7" tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#000000cc', 
                  border: '1px solid #a855f7',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="geneExpression" stroke="#8b5cf6" strokeWidth={2} name="Gene Expression" />
              <Line type="monotone" dataKey="growth" stroke="#06b6d4" strokeWidth={2} name="Growth Rate" />
              <Line type="monotone" dataKey="biomass" stroke="#10b981" strokeWidth={2} name="Biomass" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'radar' && (
          <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="subject" stroke="#a855f7" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis stroke="#a855f7" tick={{ fontSize: 10 }} />
              <Radar name="Performance" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#000000cc', 
                  border: '1px solid #a855f7',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="text-[10px] sm:text-xs text-center text-gray-400">
        Real-time visualization of space biology experiment data
      </p>
    </div>
  )
}