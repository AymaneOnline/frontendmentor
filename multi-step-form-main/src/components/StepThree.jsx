import iconCheckmark from '/assets/images/icon-checkmark.svg'

const StepThree = ({ formData, updateFormData, isYearly, addons }) => {
  const toggleAddon = (addonId) => {
    const currentAddons = formData.addons || []
    const newAddons = currentAddons.includes(addonId)
      ? currentAddons.filter(id => id !== addonId)
      : [...currentAddons, addonId]
    updateFormData('addons', newAddons)
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-marine-blue mb-2">Pick add-ons</h1>
      <p className="text-cool-gray text-sm md:text-base mb-6">Add-ons help enhance your gaming experience.</p>

      <div className="space-y-4">
        {addons.map((addon) => {
          const isSelected = formData.addons?.includes(addon.id)
          return (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 hover:border-purplish-blue transition-all cursor-pointer ${isSelected
                ? 'border-purplish-blue bg-magnolia'
                : 'border-light-gray'
                }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${isSelected
                  ? 'bg-purplish-blue border-purplish-blue'
                  : 'border-light-gray'
                  }`}
              >
                {isSelected && (
                  <img src={iconCheckmark} alt="check" className="w-3" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="text-marine-blue font-bold">{addon.name}</div>
                <div className="text-cool-gray text-sm">{addon.description}</div>
              </div>
              <div className="text-purplish-blue text-sm">
                +${isYearly ? addon.yearly : addon.monthly}/{isYearly ? 'yr' : 'mo'}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default StepThree
