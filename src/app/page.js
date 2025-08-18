import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to ABTA
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            This is Challenge 1 implementation - a responsive navbar with collapsible mobile menu, 
            search functionality, and navigation to Challenge 2.
          </p>
        </div>
      </main>
    </div>
  );
}
