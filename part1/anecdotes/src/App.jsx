import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  // creates an array of the same lenght as anecodotes, filled with zeroes
  const initialVotes = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVotes)
 
  const incrementVote = (index) => {
    const nextVote = votes.map((v, i) =>{
      if(i === index) {
        return v+1;
      } else {
        return v;
      }
    });
    setVotes(nextVote)
  }

  // random number between 0-7
  const setRandomNumber = () => {
    return(
      Math.floor(Math.random()*(anecdotes.length))
    )
  }

  // sets random anecdote
  const setRandomSelected = () => {
    setSelected(setRandomNumber())
  }

  // returns the anecdote with the most votes
  const mostVoted = () => {
    let highestVote = 0;
    let hvAnecdote = '';

    for(let i = 0; i < votes.length; i++){
      if(highestVote < votes[i]){
        highestVote = votes[i]
        hvAnecdote = anecdotes[i]
      }
    }

    return(hvAnecdote)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Button onClick={() => incrementVote(selected)} text = 'vote'/>
      <Button onClick={() => setRandomSelected()} text = 'next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{mostVoted()}</p>
    </div>
  )
}

export default App