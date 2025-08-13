'use client'
import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'

export default function SignInPage() {
  const [role, setRole] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!role) {
      alert('Please select a role to continue.')
      return
    }
    // Redirect to auth page for the selected role
    window.location.href = `/auth/${role}`
  }
  

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign In / Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Please select your role:
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={styles.select}
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="supervisor">Industry Supervisor</option>
              <option value="assessor">University Assessor</option>
            </select>
          </label>
          <button type="submit" style={styles.button}>Continue</button>
        </form>
      </div>
    </MainLayout>
  )
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '40px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 6,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: 20,
    color: '#4CAF50',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 16,
    fontWeight: '600',
  },
  select: {
    marginTop: 8,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: 16,
    padding: 12,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  }
}
