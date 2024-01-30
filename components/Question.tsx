'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    setValue('')
    setResponse(answer)
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={value}
          onChange={onChange} 
          type="text" 
          placeholder="Ask a question"
          className='border border-black/20 px-4 py-2 text-lg rounded-lg'  
        />
        <button 
          disabled={loading}
          type="submit" 
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg">
          Ask
        </button>
      </form>
      {loading && (<div>Loading...</div>)}
      {response && (<div>{response}</div>)}
    </div>
  )
}

export default Question