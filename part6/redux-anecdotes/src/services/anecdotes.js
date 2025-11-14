const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0}),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await response.json()
}

const update = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`)
    if (!res.ok) throw new Error('Could not find anecdote')
    const anecdote = await res.json()

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...anecdote, votes: anecdote.votes + 1})
    }

    const response = await fetch(`${baseUrl}/${id}`, options)

    if (!response.ok) throw new Error('Failed to update anecdote')

    return await response.json()
}

export default { getAll, createNew, update }