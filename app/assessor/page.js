'use client'

import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import Post from '../components/Post'

const mockStudentPosts = [
  {
    id: 1,
    text: 'Worked on UI design and prototyping for the new app feature.',
    photo: null,
    video: null,
    timestamp: '2025-08-01 10:30 AM',
  },
  {
    id: 2,
    text: '',
    photo: 'https://via.placeholder.com/300x150.png?text=Student+Project+Photo',
    video: null,
    timestamp: '2025-08-02 11:15 AM',
  },
  {
    id: 3,
    text: 'Recorded client meeting video and took notes.',
    photo: null,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: '2025-08-03 1:45 PM',
  },
]

const mockWeeklyComment = "The student has shown consistent progress this week, demonstrating good understanding and initiative in assigned tasks."

const mockAttendance = {
  signedByStudent: true,
  verifiedBySupervisor: true,
}

export default function AssessorPage() {
  const [weeklyComment] = useState(mockWeeklyComment)
  const [studentPosts] = useState(mockStudentPosts)
  const [attendance] = useState(mockAttendance)

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>University Assessor Dashboard</h2>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Student Posts</h3>
          {studentPosts.length === 0 ? (
            <p style={styles.noPosts}>No posts available.</p>
          ) : (
            studentPosts.map(post => (
              <Post key={post.id} post={post} />
            ))
          )}
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Supervisor's Weekly Comment</h3>
          <p style={styles.commentBox}>
            {weeklyComment || 'No comments submitted yet.'}
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeading}>Attendance Status</h3>
          <p>
            <strong>Signed by Student:</strong>{' '}
            <span style={attendance.signedByStudent ? styles.statusYes : styles.statusNo}>
              {attendance.signedByStudent ? 'Yes' : 'No'}
            </span>
          </p>
          <p>
            <strong>Verified by Supervisor:</strong>{' '}
            <span style={attendance.verifiedBySupervisor ? styles.statusYes : styles.statusNo}>
              {attendance.verifiedBySupervisor ? 'Yes' : 'No'}
            </span>
          </p>
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
    padding: 15,
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
  commentBox: {
    backgroundColor: '#f0f8ff',
    border: '1px solid #add8e6',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  statusYes: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  statusNo: {
    color: '#f44336',
    fontWeight: '700',
  },
}
