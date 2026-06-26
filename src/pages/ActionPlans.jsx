import { useEffect, useState } from 'react'
import { actionPlanService } from '../services/api'
import { useNCStore } from '../store/ncStore'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiCalendar } from 'react-icons/fi'
import ActionPlanForm from '../components/ActionPlanForm'

export default function ActionPlans() {
  const { actionPlans, setActionPlans } = useNCStore()
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchActionPlans()
  }, [])

  const fetchActionPlans = async () => {
    try {
      const response = await actionPlanService.list()
      setActionPlans(response.data)
    } catch (err) {
      console.error('Erro ao buscar planos de ação:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      try {
        await actionPlanService.delete(id)
        fetchActionPlans()
      } catch (err) {
        console.error('Erro ao deletar:', err)
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingId(null)
  }

  let filtered = actionPlans.filter((plan) =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (filterStatus !== 'all') {
    filtered = filtered.filter((plan) => plan.status === filterStatus)
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date() > new Date(dueDate)
  }

  const statusColor = {
    aberta: 'badge-danger',
    em_andamento: 'badge-warning',
    concluida: 'badge-success',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plano de Ação</h1>
          <p className="text-gray-600 mt-1">
            Total: {filtered.length} ações
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2 w-full md:w-auto"
        >
          <FiPlus size={20} />
          Nova Ação
        </button>
      </div>

      {showForm && (
        <ActionPlanForm
          onClose={handleFormClose}
          editingId={editingId}
          onSuccess={fetchActionPlans}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field md:w-48"
        >
          <option value="all">Todos os Status</option>
          <option value="aberta">Abertas</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluida">Concluídas</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((plan) => (
            <div
              key={plan.id}
              className={`card border-l-4 ${
                isOverdue(plan.dueDate)
                  ? 'border-l-red-500'
                  : 'border-l-blue-500'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {plan.title}
                    </h3>
                    <span className={statusColor[plan.status] || 'badge-warning'}>
                      {plan.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {plan.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiCalendar size={16} />
                      Prazo:{' '}
                      {new Date(plan.dueDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div>Responsável: {plan.responsible}</div>
                    <div>
                      Progresso: {plan.progress}%
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(plan.id)
                      setShowForm(true)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      plan.progress === 100
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum plano de ação encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
