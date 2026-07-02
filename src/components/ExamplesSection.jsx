const ExamplesSection = ({ ref }) => {
  return (
    <section ref={ref} id="examples" className="min-h-screen bg-marble-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold text-marble-900 sm:text-4xl">
          Примеры работ
        </h2>
        <p className="mt-4 text-marble-500">
          Здесь будут представлены наши проекты. Скоро добавим портфолио.
        </p>
      </div>
    </section>
  )
}

export default ExamplesSection
