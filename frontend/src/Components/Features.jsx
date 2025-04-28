export default function Features() {
    const features = [
      { icon: "fas fa-bolt", title: "Lightning Fast", description: "Accurate transcriptions delivered in seconds with cutting-edge tech." },
      { icon: "fas fa-dollar-sign", title: "Forever Free", description: "No costs, no subscriptions. Free access for everyone, always." },
      { icon: "fas fa-lock", title: "Privacy First", description: "Your data stays yours. We don’t store or share anything." },
      { icon: "fas fa-file-pdf", title: "Seamless PDFs", description: "Download beautifully formatted PDFs with a single click." },
    ];
  
    return (
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Why Transcriptofy Shines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 shadow-lg transform transition-transform hover:-translate-y-2">
                <div className="text-blue-600 mb-4 text-5xl">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  