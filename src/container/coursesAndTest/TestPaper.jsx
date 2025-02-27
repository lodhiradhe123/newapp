import { useState, useEffect } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";
import { HiOutlineCamera } from "react-icons/hi";

// Sample Questions with Different Answer Types
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    image: "", // If an image is needed, add a URL
    type: "single", // single choice
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    id: 2,
    question: "Identify the shape shown below.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Triangle_illustration.png",
    type: "single",
    options: ["Square", "Triangle", "Circle", "Hexagon"],
    correct: "Triangle",
  },
  {
    id: 3,
    question: "Select all prime numbers below.",
    image: "",
    type: "multiple", // multiple choice
    options: ["2", "4", "5", "9"],
    correct: ["2", "5"],
  },
  {
    id: 4,
    question: "Enter the sum of 25 + 75.",
    image: "",
    type: "input",
    correct: "100",
  },
];

export default function TestPaper() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [warnings, setWarnings] = useState(0);
  const [tabChange, setTabChange] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Start Webcam
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.getElementById("webcam");
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => console.error("Webcam access denied", err));
  }, []);

  // Detect Tab Change
  useEffect(() => {
    const handleTabChange = () => {
      if (document.hidden) {
        setWarnings((prev) => prev + 1);
        setTabChange(true);
      }
    };

    document.addEventListener("visibilitychange", handleTabChange);
    return () =>
      document.removeEventListener("visibilitychange", handleTabChange);
  }, []);

  // Auto Submit After 3 Warnings
  useEffect(() => {
    if (warnings >= 3) {
      alert(
        "You have switched tabs too many times! Test will be auto-submitted."
      );
      submitTest();
    }
  }, [warnings]);

  const handleOptionSelect = (questionId, option) => {
    const question = questions.find((q) => q.id === questionId);
    if (question.type === "multiple") {
      setSelectedAnswers((prev) => {
        const prevAnswers = prev[questionId] || [];
        return {
          ...prev,
          [questionId]: prevAnswers.includes(option)
            ? prevAnswers.filter((ans) => ans !== option)
            : [...prevAnswers, option],
        };
      });
    } else {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleInputChange = (questionId, value) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const submitTest = () => {
    alert("Test submitted successfully!");
    window.location.reload();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen p-6">
      {/* Left Panel - Question Area */}
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800">
          {questions[currentQuestion].question}
        </h2>
        {questions[currentQuestion].image && (
          <img
            src={questions[currentQuestion].image}
            alt="Question Illustration"
            className="mt-4 w-full max-w-sm rounded"
          />
        )}
        <p className="text-gray-600 mt-4">
          Answer the question carefully before proceeding to the next.
        </p>
      </div>

      {/* Right Panel - Answer Section */}
      <div
        className={`w-1/3 bg-white shadow-lg rounded-lg p-6 ml-6 transition-all ${
          expanded ? "w-1/3" : "w-16"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Options</h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600"
          >
            {expanded ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            {/* Single Choice & Multiple Choice Questions */}
            {questions[currentQuestion].type !== "input" &&
              questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type={
                      questions[currentQuestion].type === "multiple"
                        ? "checkbox"
                        : "radio"
                    }
                    name={`question-${questions[currentQuestion].id}`}
                    value={option}
                    checked={
                      questions[currentQuestion].type === "multiple"
                        ? selectedAnswers[
                            questions[currentQuestion].id
                          ]?.includes(option)
                        : selectedAnswers[questions[currentQuestion].id] ===
                          option
                    }
                    onChange={() =>
                      handleOptionSelect(questions[currentQuestion].id, option)
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}

            {/* Input Type Question */}
            {questions[currentQuestion].type === "input" && (
              <input
                type="text"
                value={selectedAnswers[questions[currentQuestion].id] || ""}
                onChange={(e) =>
                  handleInputChange(
                    questions[currentQuestion].id,
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Enter your answer"
              />
            )}
          </div>
        )}
      </div>

      {/* Webcam */}
      <div className="absolute top-4 right-4">
        <video
          id="webcam"
          className="w-24 h-24 rounded-full border-4 border-yellow-500"
          autoPlay
        ></video>
      </div>

      {/* Warning Message */}
      {tabChange && (
        <p className="absolute top-0 left-0 w-full text-center bg-red-600 text-white py-2 font-bold">
          Warning: Do not switch tabs! ({warnings}/3)
        </p>
      )}

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          className="px-6 py-2 bg-gray-300 rounded-lg font-semibold"
        >
          Prev
        </button>
        <button
          onClick={
            currentQuestion === questions.length - 1
              ? submitTest
              : () => setCurrentQuestion((prev) => prev + 1)
          }
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"
        >
          {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
        </button>
      </div>
    </div>
  );
}
