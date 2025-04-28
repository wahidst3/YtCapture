// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import axios from 'axios'
// import Loader from './Loader'
// import DownloadButton from './Button'



// function App() {
//   const [link,setLink]=useState("")
//   const [videoTitle,setVideoTitle]=useState("")
//   //error
//   const [error,setError]=useState("")
//   const [msg,setMsg]=useState("")

  
//   const [loading,setLoading]=useState(false)
//  const handleSubmit=(e)=>{

//   e.preventDefault()
//   setError(false)
//   if(link===""){
//     alert("Please enter a link")
//     return
//   }
//   setVideoTitle("")
// setLoading(true)
//    axios.post('http://localhost:3000/download', { link: link }).then(res=>{
//     setLoading(false)
//     setVideoTitle(res.data)}).catch((err,res)=>{
//       setMsg("Please enter a valid link")
//       setLoading(false)
//       setError(true)
//       console.log(err)
//     }
//     )

// console.log(link)
// setLink("")
//   }
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-amber-50">
//       <h1 className="text-3xl font-bold mb-6">YouTube Video  to Audio Downloader</h1>
//       <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           value={link}
//           onChange={(e) => setLink(e.target.value)}
//           placeholder="Enter YouTube link..." 
//           className="p-2 border rounded" 
//         />
//         <button 
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Transcribe & Download
//         </button>
//       </form>
//       {error && <p className='text-red-500'>Failed to Process Stream Plz try again or Copy Link Again</p>}
//       {loading && <Loader />}
//       {/* <h1>{videoTitle}</h1> */}
    
//       {videoTitle!=="" && <> <div className='border-2  w-[30%] h-[70vh] mt-8 overflow-y-scroll p-5'>
//         <div className='w-full  h-10 bg-red-500'>s</div>
// <p className='w-full h-full' contentEditable={true}>{videoTitle}</p>

//       </div>
//       <DownloadButton />
//       </> }
     
    
//     </div>
//   )
// }

// export default App;
import Navbar from "./Components/Nav";
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import HowItWorks from "./Components/Works";
import CTA from "./Components/CTA";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
