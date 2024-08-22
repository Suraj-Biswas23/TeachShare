import Image from 'next/image';

const testimonials = [
  { name: 'Hrishabh gautam', role: 'Professor', quote: 'TeachShare has revolutionized how I share resources with my students.', avatar: '/avatar1.jpg' },
  { name: 'Suraj Biswas', role: 'Student', quote: 'I love how easy it is to find and collaborate on study materials.', avatar: '/avatar2.jpg' },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
              <p className="text-gray-600 italic mb-4">{`"${testimonial.quote}"`}</p>
              <div className="flex items-center">
                <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}