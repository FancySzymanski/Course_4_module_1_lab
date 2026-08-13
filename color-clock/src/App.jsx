import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './App.css'

const presets = [
  { name: 'Fire', hour: '#ff0000', minute: '#ff9900', seconds: '#ffe100' },
  { name: 'Ocean', hour: '#003f5c', minute: '#2f7ed8', seconds: '#58c9d8' },
  { name: 'Forest', hour: '#1b4332', minute: '#40916c', seconds: '#95d5b2' },
  { name: 'Custom' },
]

function App() {
  const header = "Focus App"
  const [time, setTime] = useState(new Date())
  const [hourColor, setHourColor] = useState('#ff0000')
  const [minuteColor, setMinuteColor] = useState('#0000ff')
  const [secondsColor, setSecondsColor] = useState('#00ff00')
  const [selectedPreset, setSelectedPreset] = useState('Fire')

  const [customHourColor, setCustomHourColor] = useState('#ff0000')
  const [customMinuteColor, setCustomMinuteColor] = useState('#0000ff')
  const [customSecondsColor, setCustomSecondsColor] = useState('#00ff00')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  function handlePresetClick(preset) {
    setSelectedPreset(preset.name)
    if (preset.name !== 'Custom') {
      setHourColor(preset.hour)
      setMinuteColor(preset.minute)
      setSecondsColor(preset.seconds)
    } else {
      setHourColor(customHourColor)
      setMinuteColor(customMinuteColor)
      setSecondsColor(customSecondsColor)
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '64px' }}>{header}</h1>
      <p style={{ marginBottom: '78px', fontSize: 64, color: '#333333' }}>{format(time, 'PP')}</p>

      <p style={{marginLeft: '28px', paddingBottom: '24px'}}>
        <span style={{fontSize: 240, color: hourColor }}>{format(time, 'h')}</span>
        <span style={{fontSize: 300, color: hourColor }}>:</span>
        <span style={{fontSize: 240, color: minuteColor }}>{format(time, 'mm')}</span>
        <span style={{fontSize: 32, color: secondsColor }}>{format(time, 'ss')}</span>
      </p>

      <div style={{paddingBottom: '12px'}}>
       {presets.map((preset) => (
        <button 
          key={preset.name}
          onClick={() => handlePresetClick(preset)} 
          style={{
            fontWeight: selectedPreset === preset.name ? 'bold' : 'normal',
            marginRight: '8px'
          }}
          >
          {preset.name}
          </button>
        ))} 
      </div>

      {selectedPreset === 'Custom' && (
      <div>
        <div>
          <label>
          Hour color:{' '}
          <input
            type="color"
            value={hourColor}
            onChange={(e) => { 
              setCustomHourColor(e.target.value)
              setHourColor(e.target.value)
            }}
          />
          </label>
        </div>

        <div>
          <label>
          Minute color:{' '}
          <input
            type="color"
            value={minuteColor}
            onChange={(e) => {
              setCustomMinuteColor(e.target.value)
              setMinuteColor(e.target.value)
            }}
          />
          </label>
        </div>

        <div>
        <label>
          Seconds color:{' '}
          <input
            type="color"
            value={secondsColor}
            onChange={(e) => { 
              setCustomSecondsColor(e.target.value)
              setSecondsColor(e.target.value)
            }}
          />
          </label>
        </div>
    </div>
  )}
  </div>
  )
}

export default App