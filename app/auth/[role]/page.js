'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '../../layouts/MainLayout'

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AuthPage({ params }) {
  // Unwrap params safely for Next.js versions where params can be a Promise
  const routeParams = React.use ? React.use(params) : params
  const { role } = routeParams

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Student registration extra fields
  const [attachmentCompany, setAttachmentCompany] = useState('')
  const [attachmentLocation, setAttachmentLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [supervisorName, setSupervisorName] = useState('')
  const [supervisorContact, setSupervisorContact] = useState('')

  const router = useRouter()

  useEffect(() => {
    // Validate role or redirect to /landing
    if (!['student', 'supervisor', 'assessor'].includes(role)) {
      router.push('/landing')
      return
    }
    // Auto-redirect if already logged in as correct role
    const sessionStr = localStorage.getItem('authSession')
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr)
        if (session.role === role && session.token) {
          router.push(`/${role}`)
        }
      } catch {
        // ignore parse errors
      }
    }
  }, [role, router])

  function validateForm() {
    if (!email || !password) {
      alert('Please fill in all required fields.')
      return false
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.')
      return false
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return false
    }
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match.')
      return false
    }

    // Additional validations for student registration
    if (!isLogin && role === 'student') {
      if (!attachmentCompany.trim()) {
        alert('Please enter the name of your place of attachment.')
        return false
      }
      if (!attachmentLocation.trim()) {
        alert('Please enter the location of your place of attachment.')
        return false
      }
      if (!startDate) {
        alert('Please select a start date.')
        return false
      }
      if (!endDate) {
        alert('Please select an end date.')
        return false
      }
      if (new Date(endDate) < new Date(startDate)) {
        alert('End date cannot be before start date.')
        return false
      }
      if (!supervisorName.trim()) {
        alert('Please enter your industry supervisor\'s name.')
        return false
      }
      if (!supervisorContact.trim()) {
        alert('Please enter your industry supervisor\'s contact.')
        return false
      }
    }

    return true
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return

    // Simulated auth success - save session data locally with extra student info if register
    const fakeToken = 'auth-token-' + Math.random().toString(36).substring(2)

    const authSession = {
      role,
      email,
      token: fakeToken,
      timestamp: Date.now(),
      ...( !isLogin && role === 'student' && {
        attachmentCompany,
        attachmentLocation,
        startDate,
        endDate,
        supervisorName,
        supervisorContact
      })
    }

    localStorage.setItem('authSession', JSON.stringify(authSession))

    alert(`${isLogin ? 'Logged in' : 'Registered'} as ${role} successfully! Redirecting to dashboard...`)
    router.push(`/${role}`)
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>{role.charAt(0).toUpperCase() + role.slice(1)} Portal</h2>

        <div style={styles.tabContainer}>
          <button
            onClick={() => setIsLogin(true)}
            style={{ ...styles.tabButton, ...(isLogin ? styles.activeTab : {}) }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{ ...styles.tabButton, ...(!isLogin ? styles.activeTab : {}) }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
              required
              pattern={emailRegex.source}
            />
          </label>

          <label style={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength={6}
            />
          </label>

          {!isLogin && (
            <label style={styles.label}>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
                minLength={6}
              />
            </label>
          )}

          {!isLogin && role === 'student' && (
            <>
              <label style={styles.label}>
                Place of Attachment (Company Name):
                <input
                  type="text"
                  value={attachmentCompany}
                  onChange={e => setAttachmentCompany(e.target.value)}
                  style={styles.input}
                  required
                />
              </label>

              <label style={styles.label}>
                Location of Attachment:
                <input
                  type="text"
                  value={attachmentLocation}
                  onChange={e => setAttachmentLocation(e.target.value)}
                  style={styles.input}
                  required
                />
              </label>

              <label style={styles.label}>
                Start Date:
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={styles.input}
                  required
                />
              </label>

              <label style={styles.label}>
                End Date:
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  style={styles.input}
                  required
                />
              </label>

              <label style={styles.label}>
                Industry Supervisor Name:
                <input
                  type="text"
                  value={supervisorName}
                  onChange={e => setSupervisorName(e.target.value)}
                  style={styles.input}
                  required
                />
              </label>

              <label style={styles.label}>
                Industry Supervisor Contact:
                <input
                  type="tel"
                  value={supervisorContact}
                  onChange={e => setSupervisorContact(e.target.value)}
                  style={styles.input}
                  required
                />
              </label>
            </>
          )}

          <button type="submit" style={styles.submitButton}>
            {isLogin ? 'Login' : 'Register'}
          </button>
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
  },
  tabContainer: {
    display: 'flex',
    marginBottom: 20,
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderBottom: 'none',
    outline: 'none',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 14,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginTop: 6,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  submitButton: {
    marginTop: 20,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
}
