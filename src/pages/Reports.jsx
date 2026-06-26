import { useEffect, useState } from 'react'
import { reportService } from '../services/api'
import { FiDownload, FiTrendingUp } from 'react-icons/fi'

export default function Reports() {
  const [reports, setReports] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedNorm, setSelectedNorm] = useState('ISO 9001')

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await reportService.getSummary()
      setReports(response.data)
    } catch (err) {
      console.error('Erro ao buscar relatórios:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = (format) => {
    console.log(`Exportando relatório em ${format}`)
    // Implementar export PDF/Excel
  }

  const norms = ['ISO 9001', 'ISO 14001', 'ISO 45001']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-2">
          Análise e acompanhamento de conformidades
        </p>
      </div>

      {/* Export Options */}
      <div className="card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Exportar Relatório
        </h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleExport('pdf')}
            className="btn-primary flex items-center gap-2"
          >
            <FiDownload size={18} />
            PDF
          </button>
          <button
            onClick={() => handleExport('xlsx')}
            className="btn-secondary flex items-center gap-2"
          >
            <FiDownload size={18} />
            Excel
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Norm Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Relatório por Norma ISO
            </h3>
            <div className="flex flex-wrap gap-2">
              {norms.map((norm) => (
                <button
                  key={norm}
                  onClick={() => setSelectedNorm(norm)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedNorm === norm
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {norm}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <p className="text-gray-600 text-sm mb-1">Não Conformidades</p>
              <p className="text-4xl font-bold text-gray-900">
                {reports.ncByNorm?.[selectedNorm] || 0}
              </p>
              <div className="mt-2 flex items-center gap-1 text-red-600 text-sm">
                <FiTrendingUp size={16} />
                Taxa: 12% acima da meta
              </div>
            </div>

            <div className="card">
              <p className="text-gray-600 text-sm mb-1">Ações Planejadas</p>
              <p className="text-4xl font-bold text-gray-900">
                {reports.actionsByNorm?.[selectedNorm] || 0}
              </p>
              <div className="mt-2 flex items-center gap-1 text-yellow-600 text-sm">
                <FiTrendingUp size={16} />
                Média de conclusão: 75%
              </div>
            </div>

            <div className="card">
              <p className="text-gray-600 text-sm mb-1">Taxa de Fechamento</p>
              <p className="text-4xl font-bold text-green-600">
                {reports.closureRate?.[selectedNorm] || 0}%
              </p>
              <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                <FiTrendingUp size={16} />
                ↑ 8% em relação ao mês anterior
              </div>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhamento por Status
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Percentual
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Tendência
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { status: 'Abertas', total: 5, percent: 25, trend: '+12%' },
                    { status: 'Em Andamento', total: 8, percent: 40, trend: '-8%' },
                    { status: 'Concluídas', total: 7, percent: 35, trend: '+15%' },
                  ].map((row) => (
                    <tr key={row.status} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {row.status}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.total}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${row.percent}%` }}
                            />
                          </div>
                          <span>{row.percent}%</span>
                        </div>
                      </td>
                      <td
                        className={`px-4 py-3 font-medium ${
                          row.trend.startsWith('+')
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {row.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
