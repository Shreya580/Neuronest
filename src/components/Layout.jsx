function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        {children}
      </div>

    </div>
  );
}

export default Layout;