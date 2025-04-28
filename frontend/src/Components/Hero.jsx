import { useState } from "react";
import axios from 'axios';
import Loader from '../Loader';
import DownloadButton from '../Button';
import "../App.css";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [transcriptions, setTranscriptions] = useState([]);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const transcribeVideo = async () => {
    setError(false);

    if (!url.trim()) {
      alert('Please enter a YouTube video URL');
      return;
    }
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/download', { link: url });
      const newTranscription = {
        id: Date.now(),
        title: res.data.title.slice(0, 50) + (res.data.length > 50 ? "..." : ""),
        fullText: res.data.transcription.text,
        duration: formatDuration(res.data.duration), 
      };
      setTranscriptions([...transcriptions, newTranscription]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMsg("Failed to process the video. Please check the URL and try again.");
      setError(true);
      setLoading(false);
    }

    setUrl("");
  };

  const toggleEdit = (id) => {
    setEditingId(editingId === id ? null : id);
  };
console.log(transcriptions)
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-12 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(79, 70, 229, 0.95), rgba(59, 130, 246, 0.85))`,
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight animate-fade-in-down">
          Turn YouTube Videos into <span className="text-yellow-300">Transcripts & PDFs</span> Instantly!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 animate-fade-in-up">
          Paste a YouTube link and get a professional PDF transcription in seconds. Free, fast, and secure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Paste YouTube video URL here..."
            className="flex-grow px-6 py-4 rounded-full border border-transparent bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg transition-all duration-300"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={transcribeVideo}
          >
            Transcribe Now
          </button>
        </div>

        {error && (
          <p className="text-red-300 mt-6 animate-fade-in">{msg}</p>
        )}
        {loading && (
          <div className="mt-6 animate-pulse mx-auto w-full">
            <Loader />
          </div>
        )}

        {transcriptions.length > 0 && (
          <div className="mt-10 animate-fade-in-up w-full sm:w-[70%] mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-yellow-400 text-gray-900 font-bold rounded-t-xl">
                <div className="col-span-6">Title</div>
                <div className="col-span-3">Duration</div>
                <div className="col-span-3">Action</div>
              </div>
              {transcriptions.map((transcription) => (
                <div key={transcription.id}>
                  <div className="grid grid-cols-12 gap-4 p-4 items-center text-gray-200 hover:bg-white/5 transition-colors">
                    <div className="col-span-6">{transcription.title}</div>
                    <div className="col-span-3">{transcription.duration}</div>
                    <div className="col-span-3">
                      <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all duration-300"
                        onClick={() => toggleEdit(transcription.id)}
                      >
                        {editingId === transcription.id ? "Close" : "Edit"}
                      </button>
                    </div>
                  </div>
                  {editingId === transcription.id && (
                    <div className="p-4 border-t border-gray-600">
                      <div className="bg-white/5 p-4 rounded-md max-h-[40vh] overflow-y-auto">
                        <p
                          className="w-full text-gray-200"
                          contentEditable={true}
                          onBlur={(e) => {
                            const updatedTranscriptions = transcriptions.map((t) =>
                              t.id === transcription.id ? { ...t, fullText: e.target.innerText } : t
                            );
                            setTranscriptions(updatedTranscriptions);
                          }}
                        >
                          {transcription.fullText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <DownloadButton />
            </div>
          </div>
        )}
{transcriptions.length === 0 && !loading && !error &&
        <div className="mt-12 ulub relative">
          <img
            src="https://cdn-docs.vizard.ai/0-web-static/image/www/video_to_text_header.webp"
            alt="Illustration"
            className="w-full max-w-md mx-auto opacity-90 animate-float"
          />
        </div>}
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          ќ

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}