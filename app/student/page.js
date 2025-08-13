'use client'

import { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '../layouts/MainLayout'
import Post from '../components/Post'
import AttendanceButton from '../components/AttendanceButton'

export default function StudentPage() {

    const router = useRouter()

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
        }
      } catch {
        router.push('/signin')
      }
    }, [router]) 

  const [posts, setPosts] = useState([])
  const [attendanceSigned, setAttendanceSigned] = useState(false)
  const textRef = useRef()
  const videoRef = useRef()
  const photoRef = useRef()

  function handlePost(e) {
    e.preventDefault()
    const text = textRef.current.value.trim()
    const videoFile = videoRef.current.files[0]
    const photoFile = photoRef.current.files[0]

    if (!text && !videoFile && !photoFile) {
      alert('Please enter text or select a photo/video to post.')
      return
    }

    const newPost = {
      id: Date.now(),
      text,
      video: videoFile ? URL.createObjectURL(videoFile) : null,
      photo: photoFile ? URL.createObjectURL(photoFile) : null,
      timestamp: new Date().toLocaleString(),
    }

    setPosts([newPost, ...posts])
    textRef.current.value = ''
    videoRef.current.value = null
    photoRef.current.value = null
  }

  function handleSignAttendance() {
    if (attendanceSigned) {
      alert('Attendance already signed for today.')
    } else {
      setAttendanceSigned(true)
      alert('Attendance signed successfully!')
    }
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Student Dashboard</h2>
        
        <button
          onClick={() => router.push('/student/profile')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Profile
        </button>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Post an Activity</h3>
          <form onSubmit={handlePost} style={styles.form}>
            <textarea
              ref={textRef}
              placeholder="Describe your activity..."
              style={styles.textarea}
              rows={3}
            />
            <label style={styles.fileLabel}>
              Upload Photo:
              <input type="file" accept="image/*" ref={photoRef} style={styles.fileInput} />
            </label>
            <label style={styles.fileLabel}>
              Upload Video:
              <input type="file" accept="video/*" ref={videoRef} style={styles.fileInput} />
            </label>
            <button type="submit" style={styles.postButton}>Post Activity</button>
          </form>
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Attendance</h3>
          <AttendanceButton
            isActive={attendanceSigned}
            onClick={handleSignAttendance}
            labelActive="Attendance Signed"
            labelInactive="Sign Attendance"
          />
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Your Posts</h3>
          {posts.length === 0 ? (
            <p style={styles.noPosts}>No posts yet.</p>
          ) : (
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          )}
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    resize: 'vertical',
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 12,
  },
  fileLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  fileInput: {
    marginTop: 4,
  },
  postButton: {
    marginTop: 12,
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  noPosts: {
    fontStyle: 'italic',
    color: '#888',
  },
}
