import { useState } from 'react'

const Anecdote = ({text, votes}) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initVotes = {}
  anecdotes.forEach((value, index) => initVotes[index] = 0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)
  const [mostVoted, setMostVoted] = useState(0)

  const handleNext = () => setSelected(Math.floor(Math.random() * (anecdotes.length)))
  const handleVote = () => {
    const updateVotes = {...votes, [selected]: votes[selected] + 1}
    setVotes(updateVotes)

    const mostVotedArticle = getMostVotedIndex(updateVotes)
    setMostVoted(mostVotedArticle)
  }

  const getMostVotedIndex = (votes) => {
    let mostVotedIndex = 0

    for (const i in votes) {
      if (votes[i] > votes[mostVotedIndex])
        mostVotedIndex = i
    }
    
    return mostVotedIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      
      <Button handleClick={handleVote} text="vote"></Button>
      <Button handleClick={handleNext} text="next anecdote"></Button>

      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
    </div>
  )
}

export default App
