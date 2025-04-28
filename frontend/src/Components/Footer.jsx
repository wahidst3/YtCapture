export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Transcriptofy. All rights reserved.</p>
          <p className="mt-3 text-gray-400">Crafted with <i className="fas fa-heart text-red-500"></i> for content creators worldwide</p>
        </div>
      </footer>
    );
  }
  