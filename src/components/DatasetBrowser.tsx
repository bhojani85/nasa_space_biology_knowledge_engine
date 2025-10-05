"use client"

import { useState } from 'react'
import { Badge } from './ui/badge'
import { Database, Leaf, Mountain, ChevronDown, ChevronUp } from 'lucide-react'

interface Dataset {
  id: string
  name: string
  description: string
  icon: 'database' | 'leaf' | 'mountain'
  samples: number
  status: 'active' | 'archived'
  tags: string[]
}

const datasets: Dataset[] = [
  {
    id: '1',
    name: 'GeneLab RNA-Seq',
    description: 'Comprehensive gene expression data from spaceflight experiments. Includes data from ISS missions studying plant and microbial responses.',
    icon: 'database',
    samples: 1247,
    status: 'active',
    tags: ['RNA', 'Gene Expression', 'ISS']
  },
  {
    id: '2',
    name: 'Veggie Plant Growth',
    description: 'Plant growth studies from the Veggie facility aboard ISS. Tracks growth patterns, LED lighting effects, and crop yields.',
    icon: 'leaf',
    samples: 856,
    status: 'active',
    tags: ['Plants', 'Growth', 'Agriculture']
  },
  {
    id: '3',
    name: 'Mars Regolith Samples',
    description: 'Soil composition analysis from Mars simulants. Chemical and biological properties relevant to future agriculture.',
    icon: 'mountain',
    samples: 432,
    status: 'active',
    tags: ['Mars', 'Soil', 'Chemistry']
  }
]

const iconMap = {
  database: Database,
  leaf: Leaf,
  mountain: Mountain
}

export default function DatasetBrowser() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-2 sm:space-y-3">
        {datasets.map((dataset) => {
          const Icon = iconMap[dataset.icon]
          const isExpanded = expandedId === dataset.id

          return (
            <div
              key={dataset.id}
              className={`group cursor-pointer rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                isExpanded
                  ? 'bg-green-500/20 border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)]'
                  : 'bg-green-500/10 border-green-500/30 hover:border-green-500/50 hover:bg-green-500/15'
              }`}
              onClick={() => toggleExpand(dataset.id)}
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 sm:gap-3 flex-1">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/20 border border-green-500/30 shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-green-300 mb-1 text-sm sm:text-base">{dataset.name}</h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 mb-1.5 sm:mb-2 line-clamp-1">
                        {dataset.description}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 flex-wrap">
                        <span>{dataset.samples} samples</span>
                        <Badge variant="outline" className="text-[10px] sm:text-xs border-green-500/40 text-green-400">
                          {dataset.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-green-400 shrink-0 ml-2">
                    {isExpanded ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3">{dataset.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {dataset.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] sm:text-xs bg-green-500/10 border-green-500/30 text-green-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}