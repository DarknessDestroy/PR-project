import { TelegramIcon, CopyIcon, MaxIcon } from './Icons'

const Contacts= ({ ref, copyToClipboard }) => {
  return (
    <section ref={ref} id="contacts" className="min-h-screen bg-marble-100 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold text-marble-900 sm:text-4xl">
          Контакты
        </h2>
        <p className="mt-4 text-marble-500">
          Свяжитесь с нами любым удобным способом.
        </p>
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 mx-auto">
          <button
          title="Скопировать номер в буфер обмена"
            onClick={() => copyToClipboard('+7 978 959 83 25')}
            className="marble-btn-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium sm:text-base"
          >
            <CopyIcon />
            +7 (978) 959-83-25 (Иван)
          </button>
          <a
          title="Написать в Telegram"
            href="https://t.me/DesrtroyDark"
            target="_blank"
            rel="noopener noreferrer"
            className="marble-btn-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium sm:text-base"
          >
            <TelegramIcon />
            Написать в Telegram
          </a>

          <a
          title="Написать в MAX"
            href="https://web.max.ru/138756035"
            target="_blank"
            rel="noopener noreferrer"
            className="marble-btn-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium sm:text-base"
          >
            <MaxIcon />
            Написать в MAX
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contacts
