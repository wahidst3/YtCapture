export default function HowItWorks() {
    const steps = [
      { step: 1, title: "Copy YouTube URL", description: "Grab the link of the YouTube video you want to transcribe." },
      { step: 2, title: "Paste in Transcriptofy", description: "Drop the URL into our sleek input field." },
      { step: 3, title: "Download Your PDF", description: "Hit 'Transcribe Now' and get your PDF in moments." },
    ];
  
    return (
      <section id="how-it-works" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">How It Works</h2>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  