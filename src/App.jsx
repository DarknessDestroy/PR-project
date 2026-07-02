import { useRef, useState } from 'react'
import Hero_Section from './components/Information.jsx'
import Header from './components/Header'
import Toast from './components/Copy_Message.jsx'
import ExamplesSection from './components/ExamplesSection'
import ContactsSection from './components/Contacts.jsx'

const App = () => {
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  // Рефы для секций
  const homeRef = useRef(null)
  const examplesRef = useRef(null)
  const contactsRef = useRef(null)

  // Функция плавной прокрутки
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Функция показа тоста
  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 2500)
  }

  // Функция копирования текста в буфер обмена
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Номер скопирован!')
    }).catch(err => {
      console.error('Ошибка копирования:', err)
      showToast('Не удалось скопировать номер')
    })
  }

  return (
    <div className="flex min-h-screen flex-col text-marble-900">
      <Header
        scrollToSection={scrollToSection}
        homeRef={homeRef}
        examplesRef={examplesRef}
        contactsRef={contactsRef}
      />

      {/* Отступ сверху, чтобы контент не перекрывался хедером */}
      <div className="h-14" />

      <main className="flex flex-1 flex-col">
        {/* Секция «Главная» */}
        <div ref={homeRef}>
          <Hero_Section />
        </div>

        {/* Секция «Примеры работ» */}
        <ExamplesSection ref={examplesRef} />

        {/* Секция «Контакты» */}
        <ContactsSection ref={contactsRef} copyToClipboard={copyToClipboard} />
      </main>

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  )
}

export default App
