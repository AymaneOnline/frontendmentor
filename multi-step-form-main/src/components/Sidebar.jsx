const Sidebar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Your info' },
    { number: 2, label: 'Select plan' },
    { number: 3, label: 'Add-ons' },
    { number: 4, label: 'Summary' }
  ]

  return (
    <div
      className="pt-8 pb-24 px-8 bg-cover bg-center md:w-72 md:rounded-xl md:p-8 md:bg-[url('/assets/images/bg-sidebar-desktop.svg')] bg-[url('/assets/images/bg-sidebar-mobile.svg')]"
    >
      <div className="flex md:flex-col gap-4 md:gap-8 justify-center md:justify-start">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all ${currentStep === step.number || (currentStep === 5 && step.number === 4)
                ? 'bg-light-blue text-marine-blue border-light-blue'
                : 'border-white text-white'
                }`}
            >
              {step.number}
            </div>
            <div className="hidden md:block">
              <div className="text-cool-gray text-xs uppercase">Step {step.number}</div>
              <div className="text-white font-bold uppercase text-sm">{step.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
