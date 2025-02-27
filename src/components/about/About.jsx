export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-yellow-100 p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-3xl p-8 backdrop-blur-md">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-4">
          About Our Student Live Test Platform
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-6 text-center">
          Welcome to <span className="font-semibold">Student Live Test</span> –
          an interactive platform designed to help students **prepare, practice,
          and excel** in their educational journey. We provide **real-time
          assessments** and **skill-building programs** to boost confidence and
          academic success.
        </p>

        {/* Features Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-white shadow-md p-3 rounded-lg">
            <span className="text-yellow-500 text-xl font-bold">✓</span>
            <p className="text-gray-700">
              Participate in <strong>real-time live tests</strong> from
              anywhere.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white shadow-md p-3 rounded-lg">
            <span className="text-yellow-500 text-xl font-bold">✓</span>
            <p className="text-gray-700">
              Get <strong>instant results and feedback</strong> to track your
              progress.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white shadow-md p-3 rounded-lg">
            <span className="text-yellow-500 text-xl font-bold">✓</span>
            <p className="text-gray-700">
              Access <strong>various educational programs</strong> provided by
              our experts.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white shadow-md p-3 rounded-lg">
            <span className="text-yellow-500 text-xl font-bold">✓</span>
            <p className="text-gray-700">
              Compete with <strong>students globally</strong> and improve your
              learning.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-gray-800">
            Ready to test your skills and improve?
          </p>
          <a
            href="/signup"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-xl text-lg mt-3 hover:bg-yellow-600 transition font-semibold"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
}
