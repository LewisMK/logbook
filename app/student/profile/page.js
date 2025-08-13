'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '../../layouts/MainLayout'

export default function StudentProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    email: '',
    attachmentCompany: '',
    attachmentLocation: '',
    startDate: '',
    endDate: '',
    supervisorName: '',
    supervisorContact: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  // On mount, load profile from localStorage
  useEffect(() => {
    const sessionStr = localStorage.getItem('authSession')
    if (!sessionStr) {
      router.push('/signin')
      return
    }
    try {
      const session = JSON.parse(sessionStr)
      if (session.role !== 'student' || !session.token) {
        router.push('/signin')
        return
      }
      setProfile({
        email: session.email || '',
        attachmentCompany: session.attachmentCompany || '',
        attachmentLocation: session.attachmentLocation || '',
        startDate: session.startDate || '',
        endDate: session.endDate || '',
        supervisorName: session.supervisorName || '',
        supervisorContact: session.supervisorContact || '',
      })
    } catch {
      router.push('/signin')
    }
  }, [router])

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  // Save changes to localStorage
  function handleSave() {
    // Basic validation example
    if (
      !profile.email ||
      !profile.attachmentCompany ||
      !profile.attachmentLocation ||
      !profile.startDate ||
      !profile.endDate ||
      !profile.supervisorName ||
      !profile.supervisorContact
    ) {
      alert('Please fill out all fields before saving.')
      return
    }
    if (new Date(profile.endDate) < new Date(profile.startDate)) {
      alert('End date cannot be before start date.')
      return
    }

    const sessionStr = localStorage.getItem('authSession')
    if (!sessionStr) {
      alert('Session expired, please sign in again.')
      router.push('/signin')
      return
    }
    try {
      const session = JSON.parse(sessionStr)

      // Update session with edited profile details
      const updatedSession = {
        ...session,
        email: profile.email,
        attachmentCompany: profile.attachmentCompany,
        attachmentLocation: profile.attachmentLocation,
        startDate: profile.startDate,
        endDate: profile.endDate,
        supervisorName: profile.supervisorName,
        supervisorContact: profile.supervisorContact,
      }
      localStorage.setItem('authSession', JSON.stringify(updatedSession))
      alert('Profile updated successfully!')
      setIsEditing(false)
    } catch {
      alert('Error saving profile.')
    }
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>Student Profile</h2>

        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          style={{ ...styles.editButton, backgroundColor: isEditing ? '#4CAF50' : '#2196F3' }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <form style={styles.form} onSubmit={e => e.preventDefault()}>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>

          <label style={styles.label}>
            Place of Attachment (Company Name):
            <input
              type="text"
              name="attachmentCompany"
              value={profile.attachmentCompany}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>

          <label style={styles.label}>
            Location of Attachment:
            <input
              type="text"
              name="attachmentLocation"
              value={profile.attachmentLocation}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>

          <label style={styles.label}>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={profile.startDate}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>

          <label style={styles.label}>
            End Date:
            <input
              type="date"
              name="endDate"
              value={profile.endDate}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>

          <label style={styles.label}>
            Industry Supervisor Name:
            <input
              type="text"
              name="supervisorName"
              value={profile.supervisorName}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>

          <label style={styles.label}>
            Industry Supervisor Contact:
            <input
              type="tel"
              name="supervisorContact"
              value={profile.supervisorContact}
              onChange={handleChange}
              style={styles.input}
              readOnly={!isEditing}
            />
          </label>
        </form>
      </div>
    </MainLayout>
  )
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 6,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
  },
  title: {
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: '8px 14px',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  label: {
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
}
