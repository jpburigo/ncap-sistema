import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiAlertCircle,
  FiCheckSquare,
  FiFileText,
  FiX
} from 'react-icons/fi'

const navItems = [
  { path: '/', label: 'Dashboard', icon: FiHome },
  { path: '/nao-conformidades', label: 'Não Conformidades', icon: FiAlertCircle },
  { path: '/plano-acao', label: 'Plano de Ação', icon: FiCheckSquare },
  { path: '/relatorios', label: 'Relatórios', icon: FiFileText },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg transform transition-transform duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex justify-between items-center md:block">
          <h2 className="text-2xl font-bold">NCAP</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm md:text-base">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
