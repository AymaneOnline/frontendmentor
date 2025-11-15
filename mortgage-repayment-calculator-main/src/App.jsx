import { useState } from 'react'
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    amount: '',
    term: '',
    rate: '',
    type: 'repayment'
  })
  
  const [errors, setErrors] = useState({})
  const [results, setResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Remove commas for calculation, but keep them for display
    let processedValue = value
    if (name === 'amount') {
      processedValue = value.replace(/,/g, '')
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type
    }))
    
    if (errors.type) {
      setErrors(prev => ({
        ...prev,
        type: ''
      }))
    }
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'This field is required'
    }
    
    if (!formData.term || isNaN(formData.term) || parseFloat(formData.term) <= 0) {
      newErrors.term = 'This field is required'
    }
    
    // Interest rate validation removed since it's disabled
    
    if (!formData.type) {
      newErrors.type = 'This field is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateRepayments = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const principal = parseFloat(formData.amount)
    // Use the rate from form if available, otherwise use 0 for interest-free calculation
    const annualRate = formData.rate ? parseFloat(formData.rate) / 100 : 0
    const monthlyRate = annualRate / 12
    const numberOfPayments = parseFloat(formData.term) * 12

    // Calculate monthly payment using mortgage formula (repayment only)
    if (monthlyRate === 0) {
      // Interest-free calculation: just divide principal by number of payments
      const monthlyPayment = principal / numberOfPayments
      const totalRepayment = principal
      
      setResults({
        monthlyPayment: formatNumber(monthlyPayment),
        totalRepayment: formatNumber(totalRepayment)
      })
    } else {
      const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      
      const totalRepayment = monthlyPayment * numberOfPayments
      
      setResults({
        monthlyPayment: formatNumber(monthlyPayment),
        totalRepayment: formatNumber(totalRepayment)
      })
    }
  }

  const handleClearAll = () => {
    setFormData({
      amount: '',
      term: '',
      rate: '',
      type: 'repayment'
    })
    setErrors({})
    setResults(null)
  }

  const formatAmountDisplay = (value) => {
    if (!value) return ''
    const numValue = value.replace(/,/g, '')
    if (isNaN(numValue)) return value
    return new Intl.NumberFormat('en-GB').format(numValue)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
      <main className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden lg:flex" role="main">
        {/* Left side - Form */}
        <section className="lg:w-1/2 p-6 lg:p-10" aria-label="Mortgage Calculator Form">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Mortgage Calculator</h1>
            <button
              onClick={handleClearAll}
              type="button"
              aria-label="Clear all form fields"
              className="text-slate-700 underline text-sm hover:text-slate-900 transition-colors"
            >
              Clear All
            </button>
          </div>

          <form onSubmit={calculateRepayments} aria-label="Calculate mortgage repayments">
            {/* Mortgage Amount */}
            <div className="mb-6">
              <label htmlFor="amount" className="block text-slate-700 text-sm font-medium mb-3">
                Mortgage Amount
              </label>
              <div className={`relative flex items-center border rounded-md overflow-hidden transition-all ${
                errors.amount ? 'border-red' : 'border-slate-500 hover:border-slate-900 focus-within:border-lime'
              }`}>
                <span className={`px-4 py-3 font-bold transition-colors ${
                  errors.amount ? 'bg-red text-white' : 'bg-slate-100 text-slate-700'
                }`} aria-hidden="true">
                  £
                </span>
                <input
                  id="amount"
                  type="text"
                  name="amount"
                  value={formatAmountDisplay(formData.amount)}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'amount',
                      value: e.target.value.replace(/,/g, '')
                    }
                  })}
                  aria-invalid={!!errors.amount}
                  aria-describedby={errors.amount ? "amount-error" : undefined}
                  className="flex-1 px-4 py-3 text-slate-900 font-bold outline-none input-number"
                  placeholder="0"
                  required
                />
              </div>
              {errors.amount && (
                <p id="amount-error" className="text-red text-sm mt-2" role="alert">{errors.amount}</p>
              )}
            </div>

            {/* Mortgage Term and Interest Rate */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Mortgage Term */}
              <div>
                <label htmlFor="term" className="block text-slate-700 text-sm font-medium mb-3">
                  Mortgage Term
                </label>
                <div className={`relative flex items-center border rounded-md overflow-hidden transition-all ${
                  errors.term ? 'border-red' : 'border-slate-500 hover:border-slate-900 focus-within:border-lime'
                }`}>
                  <input
                    id="term"
                    type="number"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.term}
                    aria-describedby={errors.term ? "term-error" : undefined}
                    className="flex-1 px-4 py-3 text-slate-900 font-bold outline-none input-number min-w-0"
                    placeholder="0"
                    required
                  />
                  <span className={`px-4 py-3 font-bold transition-colors whitespace-nowrap flex-shrink-0 ${
                    errors.term ? 'bg-red text-white' : 'bg-slate-100 text-slate-700'
                  }`} aria-hidden="true">
                    years
                  </span>
                </div>
                {errors.term && (
                  <p id="term-error" className="text-red text-sm mt-2" role="alert">{errors.term}</p>
                )}
              </div>

              {/* Interest Rate */}
              <div>
                <label htmlFor="rate" className="block text-slate-500 text-sm font-medium mb-3">
                  Interest Rate
                </label>
                <div className="relative flex items-center border rounded-md overflow-hidden border-slate-300 bg-slate-100 opacity-60">
                  <input
                    id="rate"
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    step="0.01"
                    disabled
                    aria-label="Interest Rate (currently disabled)"
                    className="flex-1 px-4 py-3 text-slate-500 font-bold outline-none input-number min-w-0 bg-slate-100 cursor-not-allowed"
                    placeholder="0"
                  />
                  <span className="px-4 py-3 font-bold transition-colors whitespace-nowrap flex-shrink-0 bg-slate-200 text-slate-500" aria-hidden="true">
                    %
                  </span>
                </div>
                {errors.rate && (
                  <p className="text-red text-sm mt-2" role="alert">{errors.rate}</p>
                )}
              </div>
            </div>

            {/* Mortgage Type */}
            <fieldset className="mb-8">
              <legend className="block text-slate-700 text-sm font-medium mb-3">
                Mortgage Type
              </legend>
              
              {/* Repayment Option */}
              <div
                onClick={() => handleTypeChange('repayment')}
                className={`flex items-center p-3 border rounded-md mb-3 cursor-pointer transition-all ${
                  formData.type === 'repayment'
                    ? 'border-lime bg-lime/10'
                    : 'border-slate-500 hover:border-lime'
                }`}
              >
                <div className="relative flex flex-shrink-0">
                  <input
                    id="type-repayment"
                    type="radio"
                    name="type"
                    value="repayment"
                    checked={formData.type === 'repayment'}
                    onChange={() => handleTypeChange('repayment')}
                    aria-label="Repayment mortgage"
                    className="appearance-none w-5 h-5 border-2 border-slate-700 rounded-full checked:border-lime checked:border-[6px] cursor-pointer"
                  />
                </div>
                <label htmlFor="type-repayment" className="ml-4 text-slate-900 font-bold cursor-pointer">Repayment</label>
              </div>

              {/* Interest Only Option - Disabled */}
              <div
                className="flex items-center p-3 border rounded-md border-slate-300 bg-slate-100 opacity-60 cursor-not-allowed"
                aria-disabled="true"
              >
                <div className="relative flex flex-shrink-0">
                  <input
                    id="type-interest-only"
                    type="radio"
                    name="type"
                    value="interest-only"
                    checked={false}
                    disabled
                    aria-label="Interest Only mortgage (disabled)"
                    className="appearance-none w-5 h-5 border-2 border-slate-400 rounded-full cursor-not-allowed"
                  />
                </div>
                <label htmlFor="type-interest-only" className="ml-4 text-slate-500 font-bold cursor-not-allowed">Interest Only</label>
              </div>

              {errors.type && (
                <p className="text-red text-sm mt-2" role="alert">{errors.type}</p>
              )}
            </fieldset>

            {/* Calculate Button */}
            <button
              type="submit"
              aria-label="Calculate monthly mortgage repayments"
              className="w-full lg:w-auto px-10 py-4 bg-lime text-slate-900 font-bold rounded-full flex items-center justify-center gap-3 hover:bg-lime/80 transition-colors focus:outline-none focus:ring-4 focus:ring-lime/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM8.25 11a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 8.25 11Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 7.25a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM15.75 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Z"/>
              </svg>
              Calculate Repayments
            </button>
          </form>
        </section>

        {/* Right side - Results */}
        <section className="lg:w-1/2 bg-slate-900 p-6 lg:p-10 lg:rounded-bl-[80px] flex" aria-label="Calculation Results" aria-live="polite">
          {!results ? (
            // Empty State
            <div className="text-center w-full my-auto">
              <div className="mb-4 flex justify-center">
                <img src="/assets/images/illustration-empty.svg" alt="Illustration of a calculator and money" className="w-48" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-4">Results shown here</h2>
              <p className="text-slate-300 leading-relaxed">
                Complete the form and click "calculate repayments" to see what your monthly repayments would be.
              </p>
            </div>
          ) : (
            // Results State
            <div className="w-full">
              <h2 className="text-white text-2xl font-bold mb-4">Your results</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click "calculate repayments" again.
              </p>
              
              <div className="bg-black/25 rounded-lg p-6 border-t-4 border-lime">
                <div className="mb-6">
                  <p className="text-slate-300 mb-3">Your monthly repayments</p>
                  <p className="text-lime text-5xl font-bold" aria-label={`Monthly repayment: £${results.monthlyPayment}`}>£{results.monthlyPayment}</p>
                </div>
                
                <hr className="border-slate-700 mb-6" />
                
                <div>
                  <p className="text-slate-300 mb-3">Total you'll repay over the term</p>
                  <p className="text-white text-2xl font-bold" aria-label={`Total repayment: £${results.totalRepayment}`}>£{results.totalRepayment}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
