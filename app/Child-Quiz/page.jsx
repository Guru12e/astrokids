"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { FaPhone } from "react-icons/fa6";
import {
  parentingReport,
  parentingResult,
  QuizQuestions,
} from "@/constant/constant";
import { useRouter } from "next/navigation";

const ChildQuiz = () => {
  const [display, setDisplay] = useState(0);
  const [result, setResult] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSet, setEmailSet] = useState(false);
  const [parentQuiz, setParentQuiz] = useState([]);
  const [parentIndex, setParentIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalMarks, setTotalMarks] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const parentOptions = [
    "Age (0 - 4 Years)",
    "Age (5 - 10 Years)",
    "Age (11 - 15 Years)",
    "Age (16 - 20 Years)",
  ];

  const optionMarks = {
    0: 100,
    1: 75,
    2: 50,
    3: 25,
  };

  useEffect(() => {
    const quizMark = localStorage.getItem("QuizTitle") ?? "";
    if (quizMark != "") {
      setEmailSet(true);
      setResult(true);
      setParentIndex(localStorage.getItem("ParentIndex"));
      setTitle(localStorage.getItem("QuizTitle"));
      setContent(localStorage.getItem("QuizContent"));
    }
  }, []);

  const handleNext = () => {
    if (display < parentQuiz.length - 1) {
      if (selectedAnswers[display] == null) {
        toast.error("Please select an answer to proceed.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return;
      }
      setDisplay(display + 1);
    } else {
      setResult(true);
      localStorage.setItem("ParentIndex", parentIndex);
      if (totalMarks >= 900 && totalMarks <= 1000) {
        setTitle(parentingResult[parentIndex][0].title);
        setContent(parentingResult[parentIndex][0].content);
        localStorage.setItem(
          "QuizTitle",
          parentingResult[parentIndex][0].title
        );
        localStorage.setItem(
          "QuizContent",
          parentingResult[parentIndex][0].content
        );
      } else if (totalMarks >= 700 && totalMarks < 900) {
        setTitle(parentingResult[parentIndex][1].title);
        setContent(parentingResult[parentIndex][1].content);
        localStorage.setItem(
          "QuizTitle",
          parentingResult[parentIndex][1].title
        );
        localStorage.setItem(
          "QuizContent",
          parentingResult[parentIndex][1].content
        );
      } else if (totalMarks >= 500 && totalMarks < 700) {
        setTitle(parentingResult[parentIndex][2].title);
        setContent(parentingResult[parentIndex][2].content);
        localStorage.setItem(
          "QuizTitle",
          parentingResult[parentIndex][2].title
        );
        localStorage.setItem(
          "QuizContent",
          parentingResult[parentIndex][2].content
        );
      } else {
        setTitle(parentingResult[parentIndex][3].title);
        setContent(parentingResult[parentIndex][3].content);
        localStorage.setItem(
          "QuizTitle",
          parentingResult[parentIndex][3].title
        );
        localStorage.setItem(
          "QuizContent",
          parentingResult[parentIndex][3].content
        );
      }
    }
  };

  const handlePrevious = () => {
    if (display > 0) {
      setDisplay(display - 1);
    }
  };

  const handleAnswerSelection = (option) => {
    setSelectedAnswers((prev) => ({ ...prev, [display]: option }));
  };

  const handleEmail = async () => {
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email to proceed.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }

    console.log(parseInt(number).toString());

    if (
      !number.trim() ||
      number.length != 10 ||
      parseInt(number).toString().length != 10
    ) {
      toast.error("Please enter a valid phone number to proceed.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }

    if (parentIndex === null) {
      toast.error("Please Select the Age Group", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }

    setLoading(true);
    await fetch("/api/addQuizEmail", {
      method: "POST",
      body: JSON.stringify({ email, number, age: parentOptions[parentIndex] }),
    });
    setEmailSet(true);
    setLoading(false);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
      <div className='max-w-4xl w-full bg-white p-8 rounded-3xl shadow-lg'>
        <div className='flex justify-between items-center mb-8'>
          <button
            onClick={() => {
              router.back();
            }}
            className='flex items-center text-indigo-600'
          >
            <ArrowLeftIcon
              size={30}
              className='hover:scale-110 transition-transform'
            />
            <span className='ml-2 font-medium'>Back</span>
          </button>
          <Image
            alt='logo'
            src='/images/logo.png'
            width={150}
            height={40}
            className='object-cover'
          />
        </div>

        {!result && (
          <h1 className='text-4xl font-bold text-center text-indigo-700 mb-10'>
            {emailSet ? "Know Your Child Better" : "Let's Begin"}
          </h1>
        )}

        {!emailSet ? (
          <div>
            <div className='space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='relative'>
                  <MdEmail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400' />
                  <input
                    type='email'
                    value={email}
                    placeholder='Enter your email'
                    className='w-full pl-12 pr-4 py-3 border outline-none rounded-lg focus:ring-2 focus:ring-indigo-500'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='relative'>
                  <FaPhone className='absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400' />
                  <input
                    type='text'
                    value={number}
                    placeholder='Enter your phone number'
                    className='w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500'
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className='block text-xl font-bold text-indigo-600 mb-4'>
                  Select Child's Age Group
                </label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {parentOptions.map((option, index) => (
                    <div key={index} className='flex items-center'>
                      <input
                        type='radio'
                        value={option}
                        id={option}
                        name='quizIndex'
                        onClick={() => {
                          setParentIndex(index);
                          setParentQuiz(QuizQuestions[index]);
                        }}
                      />
                      <label
                        htmlFor={option}
                        className='ml-3 text-lg cursor-pointer'
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleEmail}
                disabled={loading}
                className={`w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : "Start Quiz"}
              </button>
            </div>
          </div>
        ) : result ? (
          <div className='text-center'>
            <h2 className='text-3xl font-semibold text-indigo-600 mb-4'>
              You Have a {title} in your Home
            </h2>
            <p className='text-lg text-gray-800 mb-4'>{content}</p>

            <div className='w-full flex xl:flex-row flex-col-reverse justify-between border-t-4 xl:border-t-0 xl:border-l-4 border-indigo-500 rounded-md p-6 bg-indigo-50 gap-6'>
              <div className='w-full xl:w-2/3'>
                <h3 className='text-2xl font-semibold text-start text-indigo-600 mb-4'>
                  Astro Kids Personalized Astrology Report offers:
                </h3>
                {
                  <ul className='list-disc list-inside text-start text-lg text-gray-800'>
                    {parentingReport[parentIndex].map((item, index) => (
                      <li key={index}>
                        <span className='font-bold'>{item.title}: </span>
                        {item.content}
                      </li>
                    ))}
                  </ul>
                }
                <div className='mb-4 mt-6'>
                  <Link
                    href='/child-details'
                    className='gradient-90 text-white mt-4 px-6 py-3 rounded-lg text-lg shadow-md'
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
              <div className='w-[100%] mx-auto xl:w-1/3 relative aspect-square'>
                <Image
                  src={`/images/book-cover${parentIndex}.png`}
                  alt='parenting'
                  fill
                  objectFit='cover'
                  quality={100}
                />
              </div>
            </div>
            <button
              className='mt-8 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
              onClick={() => {
                localStorage.removeItem("ParentIndex");
                localStorage.removeItem("QuizTitle");
                localStorage.removeItem("QuizContent");
                setEmailSet(false);
                setResult(false);
                setDisplay(0);
                setSelectedAnswers({});
                setTotalMarks(0);
              }}
            >
              Retake A Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className='w-full h-4 bg-gray-200 rounded-full mb-8 relative'>
              <div
                className='h-4 bg-indigo-600 rounded-full transition-all duration-300'
                style={{
                  width: `${((display + 1) / parentQuiz.length) * 100}%`,
                }}
              />
            </div>
            <div>
              <h2 className='text-xl font-bold mb-6'>
                Question {display + 1} of {parentQuiz.length}
              </h2>
              <div className='space-y-6'>
                <p className='text-lg'>{parentQuiz[display].question}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {parentQuiz[display].options.map((option, index) => (
                    <div key={index} className='flex items-center '>
                      <input
                        type='radio'
                        value={option}
                        id={option}
                        name={`question-${display}`}
                        className='cursor-pointer'
                        checked={selectedAnswers[display] == index}
                        onChange={() => handleAnswerSelection(index)}
                      />
                      <label
                        htmlFor={option}
                        className='ml-3 text-lg cursor-pointer'
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-between mt-6'>
                <button
                  onClick={handlePrevious}
                  disabled={display === 0}
                  className='px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className='px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
                >
                  {display === parentQuiz.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildQuiz;
