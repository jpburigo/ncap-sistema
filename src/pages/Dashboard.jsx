import { useEffect, useState } from 'react'
import { reportService } from '../services/api'
import { FiAlertCircle, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const response = await reportService.getSummary()
      setSummary(response.data)
    } catch (err) {
      console.error('Erro ao buscar resumo:', err)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumo de Não Conformidades e Ações</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiAlertCircle}
          label="Não Conformidades"
          value={summary?.totalNC || 0}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Ações Fechadas"
          value={summary?.closedActions || 0}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={FiClock}
          label="Ações em Andamento"
          value={summary?.pendingActions || 0}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Taxa de Conformidade"
          value={`${summary?.complianceRate || 0}%`}
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Por Norma ISO
          </h3>
          <div className="space-y-4">
            {['ISO 9001', 'ISO 14001', 'ISO 45001'].map((norm) => (
              <div key={norm} className="flex justify-between items-center">
                <span className="text-gray-700">{norm}</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${Math.random() * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Status das Ações
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Abertas', value: 8, color: 'bg-red-500' },
              { label: 'Em Progresso', value: 5, color: 'bg-yellow-500' },
              { label: 'Concluídas', value: 12, color: 'bg-green-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-gray-700">{label}</span>
                </div>
                <span className="font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
