'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '../layouts/MainLayout'
import Post from '../components/Post'
import AttendanceButton from '../components/AttendanceButton'
import WeeklyCommentForm from '../components/WeeklyCommentForm'

const mockPosts = [
  {
    id: 1,
    studentName: 'John Doe',
    text: 'Worked on UI design and prototyping for the new app feature.',
    photo: null,
    video: null,
    timestamp: '2025-08-01 10:30 AM',
  },
  {
    id: 2,
    studentName: 'John Doe',
    text: '',
    photo: 'https://via.placeholder.com/300x150.png?text=Student+Project+Photo',
    video: null,
    timestamp: '2025-08-02 11:15 AM',
  },
  {
    id: 3,
    studentName: 'John Doe',
    text: 'Recorded client meeting video and took notes.',
    photo: null,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: '2025-08-03 1:45 PM',
  },
]

export default function SupervisorPage() {

    const router = useRouter()

  useEffect(() => {
    const sessionStr = localStorage.getItem('authSession')
    if (!sessionStr) {
      router.push('/signin')
      return
    }
    try {
      const session = JSON.parse(sessionStr)
      if (session.role !== 'supervisor' || !session.token) {
        router.push('/signin')
      }
    } catch {
      router.push('/signin')
    }
  }, [router])
  const [attendanceVerified, setAttendanceVerified] = useState(false)

  function handleVerifyAttendance() {
    if (attendanceVerified) {
      alert('Attendance has already been verified.')
    } else {
      setAttendanceVerified(true)
      alert('Attendance verified and signed.')
    }
  }

  function handleWeeklyCommentSubmit(comment) {
    alert('Weekly comment submitted:\n' + comment)
    // clear state handled inside WeeklyCommentForm
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Industry Supervisor Dashboard</h2>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Student Posts</h3>
          {mockPosts.length === 0 ? (
            <p style={styles.noPosts}>No posts from the student yet.</p>
          ) : (
            mockPosts.map(post => (
              <Post key={post.id} post={post} studentName={post.studentName} />
            ))
          )}
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Weekly Comment</h3>
          <WeeklyCommentForm onSubmit={handleWeeklyCommentSubmit} />
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Attendance Verification</h3>
          <AttendanceButton
            isActive={attendanceVerified}
            onClick={handleVerifyAttendance}
            labelActive="Attendance Verified"
            labelInactive="Verify Attendance"
          />
        </section>
      </div>
    </MainLayout>
  )
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '0 auto',
    paddingBottom: 40,
  },
  heading: {
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 40,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 6,
  },
  subHeading: {
    marginBottom: 12,
    color: '#333',
  },
  noPosts: {
    fontStyle: 'italic',
    color: '#888',
  },
}
