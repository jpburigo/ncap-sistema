import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiLogOut } from 'react-icons/fi'

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">NCAP</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:inline">
            {user?.name || 'Usuário'}
          </span>
          <button
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Sair"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
