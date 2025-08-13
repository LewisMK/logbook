'use client'

import { useState } from 'react'

export default function WeeklyCommentForm({ onSubmit }) {
  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!comment.trim()) {
      alert('Please enter a weekly comment before submitting.')
      return
    }
    onSubmit(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        rows={4}
        placeholder="Write your weekly comment about the student's progress..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>Submit Comment</button>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 12,
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
}
