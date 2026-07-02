const Toast = ({ message, visible }) => {
  if (!visible) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-marble-900 px-6 py-3 text-white shadow-lg transition-all duration-300">
      {message}
    </div>
  )
}

export default Toast
