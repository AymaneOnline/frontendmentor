import React, { useMemo, useState } from 'react'

function clampNumber(n, min, max) {
  if (Number.isNaN(n)) return min
  return Math.min(Math.max(n, min), max)
}

const TIP_PRESETS = [5, 10, 15, 25, 50]

export default function App() {
  const [bill, setBill] = useState('')
  const [people, setPeople] = useState('')
  const [tipPercent, setTipPercent] = useState(0)
  const [customTip, setCustomTip] = useState('')

  // Derived numeric values
  const billValue = useMemo(() => parseFloat(bill) || 0, [bill])
  const peopleValue = useMemo(() => parseInt(people) || 0, [people])
  const effectiveTip = useMemo(() => {
    const custom = parseFloat(customTip)
    if (!Number.isNaN(custom) && custom > 0) return clampNumber(custom, 0, 100)
    return clampNumber(tipPercent, 0, 100)
  }, [customTip, tipPercent])

  const { tipPerPerson, totalPerPerson } = useMemo(() => {
    if (billValue > 0 && peopleValue > 0) {
      const tip = (billValue * (effectiveTip / 100)) / peopleValue
      const total = billValue / peopleValue + tip
      return {
        tipPerPerson: tip,
        totalPerPerson: total,
      }
    }
    return { tipPerPerson: 0, totalPerPerson: 0 }
  }, [billValue, peopleValue, effectiveTip])

  const showBillZeroError = bill !== '' && parseFloat(bill) === 0
  const showPeopleZeroError = people !== '' && parseInt(people) === 0

  const formatMoney = (v) => `$${v.toFixed(2)}`

  const preventExpKeys = (e) => {
    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
      e.preventDefault()
    }
  }

  const onSelectTip = (value) => {
    setTipPercent(value)
    setCustomTip('')
  }

  const onCustomTipChange = (e) => {
    const val = e.target.value
    // allow empty string, else clamp
    if (val === '') {
      setCustomTip('')
      setTipPercent(0)
      return
    }
    const n = clampNumber(parseFloat(val) || 0, 0, 100)
    setCustomTip(String(n))
    setTipPercent(0)
  }

  const onReset = (e) => {
    e?.preventDefault()
    setBill('')
    setPeople('')
    setTipPercent(0)
    setCustomTip('')
  }

  return (
    <main>
      <div className="logo">
        <img src="/logo.svg" alt="Splitter's Logo" className="logo-img" width="87" height="54" />
      </div>

      <div className="tip-calculator">
        <form id="calculate" onSubmit={(e) => e.preventDefault()}>
          <div className="input">
            <label htmlFor="bill">Bill</label>
            <input
              type="number"
              name="bill"
              id="bill"
              className={`numberInput${showBillZeroError ? ' error' : ''}`}
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              onKeyDown={preventExpKeys}
              min={0}
              inputMode="decimal"
            />
            <span className={`error-message bill-error${showBillZeroError ? '' : ' hidden'}`}>Can't be zero</span>
            <img src="/icon-dollar.svg" alt="Dollar icon" className="icon-dollar" width="11" height="17" />
          </div>

          <div className="tip-input">
            <p className="label">Select Tip %</p>
            <div className="tip-buttons">
              {TIP_PRESETS.map((p) => (
                <button
                  key={p}
                  className={`tip-button${effectiveTip === p && customTip === '' ? ' active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onSelectTip(p)
                  }}
                >
                  {p}%
                </button>
              ))}
              <input
                type="number"
                id="custom"
                placeholder="Custom"
                value={customTip}
                min={0}
                max={100}
                onKeyDown={preventExpKeys}
                onChange={onCustomTipChange}
              />
            </div>
          </div>

          <div className="input">
            <label htmlFor="people-number">Number of People</label>
            <input
              type="number"
              className={`numberInput${showPeopleZeroError ? ' error' : ''}`}
              id="people-number"
              name="people-number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              onKeyDown={preventExpKeys}
              min={0}
              inputMode="numeric"
            />
            <span className={`error-message person-error${showPeopleZeroError ? '' : ' hidden'}`}>Can't be zero</span>
            <img src="/icon-person.svg" alt="Person icon" className="icon-person" width="13" height="16" />
          </div>
        </form>

        <div className="result">
          <div className="tip-amount">
            <p>
              Tip Amount <br /> <span>/ person</span>
            </p>
            <p id="tip-amount-value" className="value">
              {formatMoney(tipPerPerson)}
            </p>
          </div>
          <div className="total">
            <p>
              Total <br /> <span>/ person</span>
            </p>
            <p id="total" className="value">
              {formatMoney(totalPerPerson)}
            </p>
          </div>

          <form id="reset" onSubmit={onReset}>
            <button type="submit">Reset</button>
          </form>
        </div>
      </div>
    </main>
  )
}
