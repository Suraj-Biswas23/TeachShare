import { FaShare, FaRobot, FaComments, FaFilter } from 'react-icons/fa';

export default function KeyFeatures() {
  const features = [
    { title: 'Resource Sharing', description: 'Share and access a wide variety of educational materials.', icon: FaShare },
    { title: 'AI Moderation', description: 'Ensure high-quality content with our dual moderation system.', icon: FaRobot },
    { title: 'Chat with PDF', description: 'Interact with documents using our AI-driven tool.', icon: FaComments },
    { title: 'Advanced Filtering', description: 'Find relevant materials quickly with our robust filtering system.', icon: FaFilter },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300 text-center transform hover:-translate-y-2">
              <feature.icon className="text-5xl text-blue-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}