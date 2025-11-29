import iconThankYou from '../assets/images/icon-thank-you.svg'

const ThankYou = () => {
  return (
    <div className="text-center max-w-md mx-auto py-12">
      <div className="flex justify-center mb-6">
        <img src={iconThankYou} alt="Thank you" className="w-16 h-16" />
      </div>
      <h1 className="text-3xl font-bold text-marine-blue mb-4">Thank you!</h1>
      <p className="text-cool-gray leading-relaxed">
        Thanks for confirming your subscription! We hope you have fun using our platform.
        If you ever need support, please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  )
}

export default ThankYou
