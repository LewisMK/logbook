'use client'

export default function Post({ post, studentName }) {
    return (
      <div style={styles.postCard}>
        {studentName && (
          <div style={styles.postHeader}>
            <strong>{studentName}</strong> &ndash;{' '}
            <span style={styles.postTime}>{post.timestamp}</span>
          </div>
        )}
        {!studentName && (
          <div style={styles.postTimeOnly}>{post.timestamp}</div>
        )}
        {post.text && <p style={styles.postText}>{post.text}</p>}
        {post.photo && (
          <img src={post.photo} alt="Post media" style={styles.postMedia} />
        )}
        {post.video && (
          <video controls style={styles.postMedia}>
            <source src={post.video} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    )
  }
  
  const styles = {
    postCard: {
      padding: 12,
      borderBottom: '1px solid #eee',
    },
    postHeader: {
      fontSize: 14,
      marginBottom: 8,
    },
    postTime: {
      color: '#999',
      fontSize: 12,
    },
    postTimeOnly: {
      color: '#999',
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 8,
    },
    postText: {
      fontSize: 16,
      marginBottom: 8,
      whiteSpace: 'pre-wrap',
    },
    postMedia: {
      maxWidth: '100%',
      borderRadius: 4,
    },
  }
  