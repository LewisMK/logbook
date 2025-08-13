export default function MainLayout({ children }) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
        <header>
          <h1>My Attachment App</h1>
          <nav>
            <a href="/landing">Home</a> | <a href="/signin">Sign In</a>
          </nav>
        </header>
  
        <main>{children}</main>
  
        <footer style={{ marginTop: 20, fontSize: 12, color: '#999' }}>
          &copy; {new Date().getFullYear()} Attachment App
        </footer>
      </div>
    )
  }
  