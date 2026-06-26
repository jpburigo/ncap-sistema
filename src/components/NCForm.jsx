import { useEffect, useState } from 'react'
import { ncService } from '../services/api'
import { FiX } from 'react-icons/fi'

const NORMS = ['ISO 9001', 'ISO 14001', 'ISO 45001']
const STATUSES = [
  { value: 'aberta', label: 'Aberta' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'fechada', label: 'Fechada' },
]

export default function NCForm({ onClose, editingId, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    norm: 'ISO 9001',
    status: 'aberta',
    responsible: '',
    evidence: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingId) {
      loadNC()
    }
  }, [editingId])

  const loadNC = async () => {
    try {
      const response = await ncService.getById(editingId)
      setFormData(response.data)
    } catch (err) {
      setError('Erro ao carregar não conformidade')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (editingId) {
        await ncService.update(editingId, formData)
      } else {
        await ncService.create(formData)
      }
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {editingId ? 'Editar NC' : 'Nova Não Conformidade'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="input-field resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Norma ISO *
              </label>
              <select
                name="norm"
                value={formData.norm}
                onChange={handleChange}
                className="input-field"
              >
                {NORMS.map((norm) => (
                  <option key={norm} value={norm}>
                    {norm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                {STATUSES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsável *
            </label>
            <input
              type="text"
              name="responsible"
              value={formData.responsible}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evidência
            </label>
            <textarea
              name="evidence"
              value={formData.evidence}
              onChange={handleChange}
              rows="2"
              className="input-field resize-none"
              placeholder="Anexe evidências ou links"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
