const StepOne = ({ formData, updateFormData, errors }) => {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-marine-blue mb-2">Personal info</h1>
      <p className="text-cool-gray text-sm md:text-base mb-6">Please provide your name, email address, and phone number.</p>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-marine-blue text-sm font-medium">Name</label>
            {errors.name && <span className="text-strawberry-red text-sm font-bold">{errors.name}</span>}
          </div>
          <input
            type="text"
            placeholder="e.g. Stephen King"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purplish-blue transition-colors font-medium text-marine-blue ${errors.name ? 'border-strawberry-red' : 'border-light-gray'
              }`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-marine-blue text-sm font-medium">Email Address</label>
            {errors.email && <span className="text-strawberry-red text-sm font-bold">{errors.email}</span>}
          </div>
          <input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purplish-blue transition-colors font-medium text-marine-blue ${errors.email ? 'border-strawberry-red' : 'border-light-gray'
              }`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-marine-blue text-sm font-medium">Phone Number</label>
            {errors.phone && <span className="text-strawberry-red text-sm font-bold">{errors.phone}</span>}
          </div>
          <input
            type="tel"
            placeholder="e.g. +1 234 567 890"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-purplish-blue transition-colors font-medium text-marine-blue ${errors.phone ? 'border-strawberry-red' : 'border-light-gray'
              }`}
          />
        </div>
      </div>
    </div>
  )
}

export default StepOne
