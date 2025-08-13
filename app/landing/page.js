import MainLayout from '../layouts/MainLayout'

export default function LandingPage() {
  return (
    <MainLayout>
      <div style={{ textAlign: 'center', paddingTop: 80 }}>
        <h2 style={{ fontSize: 36, fontWeight: '700', color: '#4CAF50', marginBottom: 20 }}>
          Welcome to the Student Attachment Portal
        </h2>
        <p style={{ fontSize: 18, color: '#555', maxWidth: 600, margin: '0 auto 40px' }}>
          Track your attachment activities, submit posts with text, photos & videos, sign your attendance, and get feedback from your supervisor and assessor.
        </p>
        <a href="../signin" style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '14px 32px',
          borderRadius: 6,
          fontSize: 18,
          textDecoration: 'none',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          Get Started
        </a>
      </div>
    </MainLayout>
  )
}
