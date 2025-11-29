const StepFour = ({ formData, isYearly, plans, addons, goToStep }) => {
  const selectedPlan = plans[formData.plan]
  const planPrice = isYearly ? selectedPlan.yearly : selectedPlan.monthly

  const selectedAddons = addons.filter(addon => formData.addons?.includes(addon.id))
  const addonsTotal = selectedAddons.reduce((sum, addon) => {
    return sum + (isYearly ? addon.yearly : addon.monthly)
  }, 0)

  const total = planPrice + addonsTotal

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-marine-blue mb-2">Finishing up</h1>
      <p className="text-cool-gray text-sm md:text-base mb-6">Double-check everything looks OK before confirming.</p>

      <div className="bg-magnolia rounded-lg p-6">
        <div className="flex items-center justify-between pb-4 border-b border-light-gray">
          <div>
            <div className="text-marine-blue font-bold capitalize">
              {formData.plan} ({isYearly ? 'Yearly' : 'Monthly'})
            </div>
            <button
              onClick={() => goToStep(2)}
              className="text-cool-gray underline hover:text-purplish-blue text-sm transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>
          <div className="text-marine-blue font-bold">
            ${planPrice}/{isYearly ? 'yr' : 'mo'}
          </div>
        </div>

        {selectedAddons.length > 0 && (
          <div className="mt-4 space-y-3">
            {selectedAddons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <div className="text-cool-gray text-sm">{addon.name}</div>
                <div className="text-marine-blue text-sm">
                  +${isYearly ? addon.yearly : addon.monthly}/{isYearly ? 'yr' : 'mo'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 mt-6">
        <div className="text-cool-gray text-sm">
          Total (per {isYearly ? 'year' : 'month'})
        </div>
        <div className="text-purplish-blue font-bold text-xl">
          +${total}/{isYearly ? 'yr' : 'mo'}
        </div>
      </div>
    </div>
  )
}

export default StepFour
