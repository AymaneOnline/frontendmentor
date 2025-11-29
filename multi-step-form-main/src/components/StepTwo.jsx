import iconArcade from '../assets/images/icon-arcade.svg'
import iconAdvanced from '../assets/images/icon-advanced.svg'
import iconPro from '../assets/images/icon-pro.svg'

const StepTwo = ({ formData, updateFormData, isYearly, setIsYearly, plans }) => {
  const planOptions = [
    { id: 'arcade', name: 'Arcade', icon: iconArcade },
    { id: 'advanced', name: 'Advanced', icon: iconAdvanced },
    { id: 'pro', name: 'Pro', icon: iconPro }
  ]

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-marine-blue mb-2">Select your plan</h1>
      <p className="text-cool-gray text-sm md:text-base mb-6">You have the option of monthly or yearly billing.</p>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-3 mb-6">
        {planOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => updateFormData('plan', option.id)}
            className={`p-4 border-2 rounded-lg text-left hover:border-purplish-blue transition-all flex md:flex-col gap-4 md:gap-10 cursor-pointer ${formData.plan === option.id
              ? 'border-purplish-blue bg-magnolia'
              : 'border-light-gray'
              }`}
          >
            <img src={option.icon} alt={option.name} className="w-10 h-10 flex-shrink-0" />
            <div>
              <div className="text-marine-blue font-bold mb-1">{option.name}</div>
              <div className="text-cool-gray text-sm">
                ${isYearly ? plans[option.id].yearly : plans[option.id].monthly}/{isYearly ? 'yr' : 'mo'}
              </div>
              {isYearly && (
                <div className="text-marine-blue text-xs mt-1">2 months free</div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-magnolia rounded-lg p-4 flex items-center justify-center gap-6">
        <span className={`font-medium ${!isYearly ? 'text-marine-blue' : 'text-cool-gray'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="w-12 h-6 bg-marine-blue rounded-full relative transition-all hover:bg-opacity-90 cursor-pointer"
        >
          <div
            className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isYearly ? 'left-7' : 'left-1'
              }`}
          />
        </button>
        <span className={`font-medium ${isYearly ? 'text-marine-blue' : 'text-cool-gray'}`}>
          Yearly
        </span>
      </div>
    </div>
  )
}

export default StepTwo
