'use client'

export default function AttendanceButton({ isActive, onClick, labelActive, labelInactive }) {
    return (
      <button
        onClick={onClick}
        style={{
          ...styles.button,
          backgroundColor: isActive ? '#4CAF50' : '#f44336',
        }}
      >
        {isActive ? labelActive : labelInactive}
      </button>
    )
  }
  
  const styles = {
    button: {
      padding: '12px 24px',
      fontSize: 18,
      color: 'white',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      width: 220,
    },
  }
  