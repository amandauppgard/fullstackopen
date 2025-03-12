import { useState } from 'react'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const StatisticLine = ({text, value, sign}) => {
  return(
    <p>{text} { value} {sign}</p>
  )
}

const Statistics = ({good, neutral, bad, all, positive, average}) => {
  // statistics are only rendered if feedback has been given
  if (all <= 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text = "good"/></td>
          <td><StatisticLine value = {good}/></td>
        </tr>
        <tr>
          <td><StatisticLine text = "neutral"/></td>
          <td><StatisticLine value = {neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine text = "bad"/></td>
          <td><StatisticLine value = {bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text = "all"/></td>
          <td><StatisticLine value = {all}/></td>
        </tr>
        <tr>
          <td><StatisticLine text = "average"/></td>
          <td><StatisticLine value = {average}/></td>
        </tr>
        <tr>
          <td><StatisticLine text = "positive"/></td>
          <td><StatisticLine value = {positive} sign='%'/></td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // values for statistics
  const all = good + neutral + bad;
  const average = (good*1 + bad*-1) / all;
  const positive = good / all * 100
  
  const setGoodValue = newGoodValue => {
    setGood(newGoodValue)
  }

  const setNeutralValue = newNeutralValue => {
    setNeutral(newNeutralValue)
  }

  const setBadValue = newBadValue => {
    setBad(newBadValue)
  }

  return (
    <div>
      <h1>give feedback</h1>      
      <Button onClick={() => setGoodValue(good + 1)} text = "good"/>
      <Button onClick={() => setNeutralValue(neutral + 1)} text = "neutral"/>
      <Button onClick={() => setBadValue(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral = {neutral} bad = {bad} all = {all} positive = {positive} average = {average} />
    </div>
  )
}

export default App