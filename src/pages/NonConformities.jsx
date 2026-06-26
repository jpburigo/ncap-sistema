import { useEffect, useState } from 'react'
import { ncService } from '../services/api'
import { useNCStore } from '../store/ncStore'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import NCForm from '../components/NCForm'

export default function NonConformities() {
  const { nonConformities, setNonConformities } = useNCStore()
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchNonConformities()
  }, [])

  const fetchNonConformities = async () => {
    try {
      const response = await ncService.list()
      setNonConformities(response.data)
    } catch (err) {
      console.error('Erro ao buscar não conformidades:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      try {
        await ncService.delete(id)
        fetchNonConformities()
      } catch (err) {
        console.error('Erro ao deletar:', err)
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingId(null)
  }

  const filtered = nonConformities.filter(
    (nc) =>
      nc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nc.norm?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusColor = {
    aberta: 'badge-danger',
    em_andamento: 'badge-warning',
    fechada: 'badge-success',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Não Conformidades
          </h1>
          <p className="text-gray-600 mt-1">
            Total: {filtered.length} conformidades
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2 w-full md:w-auto"
        >
          <FiPlus size={20} />
          Nova NC
        </button>
      </div>

      {showForm && (
        <NCForm
          onClose={handleFormClose}
          editingId={editingId}
          onSuccess={fetchNonConformities}
        />
      )}

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por título ou norma..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((nc) => (
            <div key={nc.id} className="card">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {nc.title}
                    </h3>
                    <span className={statusColor[nc.status] || 'badge-warning'}>
                      {nc.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{nc.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>📋 {nc.norm}</span>
                    <span>📅 {new Date(nc.createdAt).toLocaleDateString()}</span>
                    <span>👤 {nc.responsible}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(nc.id)
                      setShowForm(true)
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(nc.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhuma não conformidade encontrada
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
