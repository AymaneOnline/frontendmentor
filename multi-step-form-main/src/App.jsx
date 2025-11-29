import { useState } from 'react'
import Sidebar from './components/Sidebar'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import ThankYou from './components/ThankYou'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isYearly, setIsYearly] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'arcade',
    addons: []
  })
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  const plans = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 }
  }

  const addons = [
    { id: 'online-service', name: 'Online service', description: 'Access to multiplayer games', monthly: 1, yearly: 10 },
    { id: 'larger-storage', name: 'Larger storage', description: 'Extra 1TB of cloud save', monthly: 2, yearly: 20 },
    { id: 'customizable-profile', name: 'Customizable profile', description: 'Custom theme on your profile', monthly: 2, yearly: 20 }
  ]

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  const validateCurrentStep = () => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'This field is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'This field is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'This field is required'
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleConfirm = () => {
    setConfirmed(true)
    setCurrentStep(5)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen md:flex md:items-center md:justify-center md:p-4">
        <div className="md:bg-white md:rounded-2xl md:shadow-xl max-w-4xl w-full md:overflow-hidden md:p-4 md:flex md:gap-4 md:min-h-[600px]">
          <Sidebar currentStep={currentStep} />
          <div className="flex-1 flex items-center justify-center md:p-8">
            <div className="bg-white rounded-xl shadow-lg mx-4 p-8 -mt-16 md:shadow-none md:m-0">
              <ThankYou />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center md:p-4">
      <div className="md:bg-white md:rounded-2xl md:shadow-xl max-w-4xl w-full md:overflow-hidden md:p-4 md:flex md:gap-4 md:min-h-[600px]">
        <Sidebar currentStep={currentStep} />

        <div className="flex-1 flex flex-col md:p-8 relative">
          <div className="bg-white rounded-xl shadow-lg mx-4 p-6 -mt-16 mb-20 md:shadow-none md:m-0 md:p-0 md:flex-1">
            {currentStep === 1 && (
              <StepOne
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                formData={formData}
                updateFormData={updateFormData}
                isYearly={isYearly}
                setIsYearly={setIsYearly}
                plans={plans}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                formData={formData}
                updateFormData={updateFormData}
                isYearly={isYearly}
                addons={addons}
              />
            )}
            {currentStep === 4 && (
              <StepFour
                formData={formData}
                isYearly={isYearly}
                plans={plans}
                addons={addons}
                goToStep={goToStep}
              />
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between md:static md:p-0 md:mt-8">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="text-cool-gray hover:text-marine-blue font-medium transition-colors text-sm md:text-base cursor-pointer"
              >
                Go Back
              </button>
            )}
            {currentStep < 4 && (
              <button
                onClick={nextStep}
                className={`bg-marine-blue text-white px-4 py-3 md:px-6 rounded-md md:rounded-lg hover:opacity-80 transition-all font-medium text-sm md:text-base cursor-pointer ${currentStep === 1 ? 'ml-auto' : ''}`}
              >
                Next Step
              </button>
            )}
            {currentStep === 4 && (
              <button
                onClick={handleConfirm}
                className="bg-purplish-blue text-white px-4 py-3 md:px-6 rounded-md md:rounded-lg hover:opacity-80 transition-all font-medium text-sm md:text-base cursor-pointer"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
