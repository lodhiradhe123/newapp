import { useState, useEffect, useRef } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";
import Navbar from "../../components/navbar/Nav";
import TestNavbar from "./TestPaperNav";
import { IoIosInformationCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

// Sample Questions
const questions = [
  {
    id: 1,
    title: "General Questions",
    problem: "Easy",
    score: 2,
    question: "What is the capital of France?",
    image: "", // If needed, add image URL
    type: "single",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    id: 2,
    question: "Identify the shape shown below.vsdgfasgasdg",
    image: "https://images.tpointtech.com/ds/images/graph-algorithms3.png",
    type: "single",
    options: ["Square", "Triangle", "Tree", "Depth-first search"],
    correct: "Triangle",
  },
  {
    id: 3,
    question:
      "Provide instant feedback Leverage real-time feedback to adjust your teaching strategies and student learning paths. Whether through automated grading of coding assignments or personalized suggestions. W3Schools Academy helps you provide instant, meaningful feedback to students. Adapt lessons based on performance to ensure every student is on the right path.",
    image: "",
    type: "multiple",
    options: ["2", "4", "5", "9"],
    correct: ["2", "5"],
  },
  {
    id: 4,
    question: "Dijkstra's shortest path algorithm",
    image: "https://images.tpointtech.com/ds/images/graph-algorithms5.png",
    type: "textarea",
    correct: "",
  },
];

export default function TestPaper() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [warnings, setWarnings] = useState(0);
  const [tabChange, setTabChange] = useState(false);
  const [panelSize, setPanelSize] = useState(
    window.innerWidth < 768 ? 100 : 30 // If screen is small (sm, md), set 100%, otherwise 30%
  );

  const [dragging, setDragging] = useState(false);
  const [guideStart, setGuideStart] = useState(false);
  const separatorRef = useRef(null);
  const [setting, setSetting] = useState(false);

  // Function to Enable Fullscreen Mode
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari, Edge
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  // Function to Exit Fullscreen Mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, Edge
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  //timer
  const [timeLeft, setTimeLeft] = useState(5 * 60); // Default: 5 minutes (300 seconds)
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    //timer started
    if (timerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      submitTest(); // Auto-submit when time reaches 0
    }
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  //dark mode theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Retrieve preference
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  // Start Webcam
  useEffect(() => {
    if (guideStart) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = document.getElementById("webcam");
          if (video) {
            video.srcObject = stream;
          }
        })
        .catch((err) => console.error("Webcam access denied", err));
    }
  }, [guideStart]);

  // Detect Tab Change
  useEffect(() => {
    const handleTabChange = () => {
      if (guideStart) {
        if (document.hidden) {
          setWarnings((prev) => prev + 1);
          setTabChange(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleTabChange);
    return () =>
      document.removeEventListener("visibilitychange", handleTabChange);
  }, [guideStart]);

  // Auto Submit After 3 Warnings
  useEffect(() => {
    if (warnings >= 3) {
      alert(
        "You have switched tabs too many times! Test will be auto-submitted."
      );
      submitTest();
    }
  }, [warnings]);

  // Answer Selection
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

  // submit test finalized
  const submittest = () => toast("Test submitted successfully!");
  const submitTest = () => {
    console.log("Submitted Answers:", selectedAnswers);
    window.location.reload();
    exitFullscreen();
    submittest();

    // Stop Webcam Stream
    const video = document.getElementById("webcam");
    if (video && video.srcObject) {
      let stream = video.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop each track
      video.srcObject = null; // Clear video stream
    }
  };

  //save answer
  const notify = () => toast("Your answer has been saved !");
  const saveAnswer = () => {
    notify();
  };

  // Handle Panel Resize (Drag Functionality)
  const startDrag = () => setDragging(true);
  const stopDrag = () => setDragging(false);
  const onDrag = (e) => {
    if (dragging) {
      const newSize = (e.clientX / window.innerWidth) * 100;
      if (newSize > 20 && newSize < 80) {
        setPanelSize(newSize);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, [dragging]);

  return (
    <>
      <div
        className={`w-full h-screen flex-col  bg-gray-100  ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        } `}
      >
        {guideStart && (
          <>
            <TestNavbar warnings={warnings} darkMode={darkMode} />
            <div
              className={`h-12 bg-gray-100  flex mx-4 text-md font-semi bold justify-between ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
              }`}
            >
              <div
                className={`flex gap-10  ${
                  darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                }`}
              >
                {/* <h1 className="mt-4  px-2 rounded-t-2xl">Problems</h1>
                <h1 className="mt-4">Submissions</h1>
                <h1 className="mt-4">Doubts</h1> */}
              </div>
              <div className="mt-4 mr-4 flex items-center gap-4">
                <div className="top-2 left-3 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs md:text-sm">
                  ⏳ Time Left: {formatTime(timeLeft)}
                </div>

                {/* Settings Icon */}
                <IoIosInformationCircle
                  onClick={() => setSetting(!setting)}
                  className="cursor-pointer text-xl"
                />

                {/* Light/Dark Mode Toggle */}
                <div
                  className="relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all cursor-pointer"
                  onClick={toggleDarkMode}
                >
                  <div
                    className={`w-5 h-5  rounded-full shadow-md transform transition-all ${
                      darkMode
                        ? "translate-x-6 bg-white "
                        : "translate-x-0 bg-gray-600 "
                    }`}
                  >
                    {darkMode ? "🌙" : "☀️"}
                  </div>
                </div>

                {/* Text Indicator */}
                {/* <span className="text-sm font-semibold">
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </span> */}
              </div>
            </div>
          </>
        )}

        {/* Left Panel - Question Section */}
        <div
          className={`w-full flex flex-col md:flex-row px-4 p-2 pb-6 min-h-[77%] relative gap-2
             ${darkMode ? "bg-gray-500 text-white" : "bg-gray-100 text-black"}`}
        >
          <Toaster />
          {guideStart ? (
            <>
              <div
                className={`w-full md:w-[50%] shadow-lg p-4 md:p-8 rounded-lg  ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
                style={{ width: `${panelSize}%` }}
              >
                <h2 className="text-xl font-bold ">
                  {questions[currentQuestion].title}
                </h2>
                <h2 className="text-sm font-normal">
                  {questions[currentQuestion].problem}▪️ Score -
                  {questions[currentQuestion].score}
                </h2>

                <hr className="mt-2 " />
                <h1 className="text-sm md:text-lg font-bold mt-2">
                  Problem statement
                </h1>
                <h4 className="text-sm   mt-0">
                  {questions[currentQuestion].question}
                </h4>
                {questions[currentQuestion].image && (
                  <img
                    src={questions[currentQuestion].image}
                    alt="Question Illustration"
                    className="mt-4 w-full max-w-sm rounded"
                  />
                )}
              </div>

              {/* Resizable Separator */}
              <div
                ref={separatorRef}
                className="hidden md:block w-1 bg-gray-400 cursor-col-resize"
                onMouseDown={startDrag}
              ></div>

              {/* Right Panel - Answer Section */}
              <div
                className={` w-full md:flex-1 shadow-lg p-4 md:p-6 rounded-lg ${
                  darkMode ? " text-white bg-gray-900" : "bg-white text-black"
                }`}
              >
                <h3 className="text-lg font-bold ">Options</h3>
                <div className="mt-4 space-y-3">
                  {/* Single Choice & Multiple Choice Questions */}
                  {questions[currentQuestion].type !== "input" &&
                    questions[currentQuestion].type !== "textarea" &&
                    questions[currentQuestion].options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3 cursor-pointer border-1  px-1 py-2 rounded-md focus:ring-yellow-400 w-2/3"
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
                              : selectedAnswers[
                                  questions[currentQuestion].id
                                ] === option
                          }
                          onChange={() =>
                            handleOptionSelect(
                              questions[currentQuestion].id,
                              option
                            )
                          }
                          className="w-5 h-5"
                        />
                        <span className="">{option}</span>
                      </label>
                    ))}

                  {/* Input Type Question */}
                  {questions[currentQuestion].type === "input" && (
                    <input
                      type="text"
                      value={
                        selectedAnswers[questions[currentQuestion].id] || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          questions[currentQuestion].id,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-yellow-400 "
                      placeholder="Enter your answer"
                    />
                  )}

                  {/* Textarea Question (For Typing Long Answers) */}
                  {questions[currentQuestion].type === "textarea" && (
                    <textarea
                      value={
                        selectedAnswers[questions[currentQuestion].id] || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          questions[currentQuestion].id,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 "
                      placeholder="Write your response here..."
                      rows="7"
                    />
                  )}
                </div>
              </div>

              {/* Webcam Monitoring */}
              {/* <div className="absolute top-3 right-2">
                <video
                  id="webcam"
                  className="w-16  rounded-full bg-cover overflow-hidden border-2 border-amber-50 "
                  autoPlay
                ></video>
              </div> */}
              {/* Tab Switch Warning */}
              {/* {tabChange && (
                <p className="absolute top-0 left-0 w-full text-center bg-red-600 text-white py-2 font-bold">
                  Warning: Do not switch tabs! ({warnings}/3)
                </p>
              )} */}
            </>
          ) : (
            <>
              <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-around items-center">
                <h2 className="text-2xl font-bold text-yellow-500">
                  Test Guidelines
                </h2>
                <ul className="list-disc text-gray-700 text-left">
                  <li>Ensure a stable internet connection.</li>
                  <li>Webcam should be turned on throughout the test.</li>
                  <li>
                    Do not switch tabs, otherwise you may be disqualified.
                  </li>
                  <li>
                    Choose the correct answers and submit before the timer ends.
                  </li>
                  <li>Use a laptop or desktop for the best experience.</li>
                  <li>
                    Full-screen mode is required – exiting full screen may lead
                    to auto-submission.
                  </li>
                </ul>
                <button
                  onClick={() => {
                    setGuideStart(true);
                    setTimerRunning(true);
                    enterFullscreen();
                  }}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg  hover:bg-yellow-600 transition font-semibold"
                >
                  Start Test
                </button>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        {guideStart && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 text-sm md:text-base">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="px-6 py-2 bg-gray-300 rounded-lg font-semibold"
            >
              Prev
            </button>
            <button
              disabled={currentQuestion === 0}
              // onClick={saveAnswer}
              onClick={
                currentQuestion === questions.length - 1
                  ? submitTest
                  : saveAnswer
              }
              className="px-6 py-2 bg-gray-300 rounded-lg font-semibold"
            >
              {currentQuestion === questions.length - 1
                ? "Submit Test"
                : "Save"}
            </button>
            <button
              onClick={
                currentQuestion === questions.length - 1
                  ? ""
                  : () => setCurrentQuestion((prev) => prev + 1)
              }
              className="px-6 py-2  rounded-lg bg-gray-300 font-semibold"
            >
              {currentQuestion === questions.length - 1 ? "Next" : "Next"}
            </button>
          </div>
        )}
      </div>

      {setting && (
        <div className="  absolute top-22 right-4">
          {/* Progress Bar */}
          {/* <div className="w-full h-3  rounded-lg">
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}
