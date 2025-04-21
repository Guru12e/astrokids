"use client";
import { MessageCircle, MessageCircleCodeIcon, ArrowLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdWhatsapp } from "react-icons/md";

const EnquiryAutomation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined question categories and their respective questions
  const qaCategories = {
    report: [
      {
        question: "How do I generate my astrology report?",
        answer:
          "To generate your personalized astrology report, visit our 'Plans' section, enter your birth details (date, time, place), and select a report type. The report will be generated instantly after processing.",
      },
      {
        question: "How do I buy the report?",
        answer:
          "After generating your report in the 'Plans' section, select your preferred plan and proceed to payment. We accept credit cards, UPI, and other secure payment methods.",
      },
      {
        question: "What’s included in the astrology report?",
        answer:
          "The report includes your horoscope, planetary positions, dosha analysis, and personalized recommendations based on Vedic astrology principles.",
      },
    ],
    refund: [
      {
        question: "What is your refund policy?",
        answer:
          "We offer a full refund within 7 days of purchase if you’re not satisfied with your astrology report. Contact our support team to initiate the process.",
      },
      {
        question: "How long does it take to process a refund?",
        answer:
          "Refunds are typically processed within 3-5 business days after approval. You’ll receive a confirmation email once completed.",
      },
    ],
    support: [
      {
        question: "How do I contact support?",
        answer:
          "You can reach our support team via email at support@astrologyplatform.com or through the 'Contact Us' section on our website.",
      },
      {
        question: "What are your support hours?",
        answer:
          "Our support team is available 24/7 to assist you with any queries or issues.",
      },
    ],
    general: [
      {
        question: "Can I get a sample report?",
        answer:
          "Yes, you can view a sample report in the 'Resources' section of our website to understand the format and details included.",
      },
      {
        question: "Do you offer consultations?",
        answer:
          "Yes, we provide personalized astrology consultations. Book a session through the 'Consultations' page on our website.",
      },
    ],
  };

  // List of categories for initial selection
  const categories = [
    { id: "report", label: "Report Questions" },
    { id: "refund", label: "Refund Questions" },
    { id: "support", label: "Support Questions" },
    { id: "general", label: "General Questions" },
  ];

  useEffect(() => {
    // Initialize with a welcome message when chat opens
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Welcome! Please select a category to ask about.",
          sender: "bot",
        },
      ]);
      setSelectedCategory(null);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setMessages((prev) => [
      ...prev,
      {
        text: `Selected: ${categories.find((c) => c.id === categoryId).label}`,
        sender: "user",
      },
    ]);
  };

  const handleQuestionClick = (question, answer) => {
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: answer, sender: "bot" }]);
      setIsTyping(false);
    }, 500);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setMessages((prev) => [
      ...prev,
      { text: "Back to categories", sender: "user" },
      { text: "Please select a category to ask about.", sender: "bot" },
    ]);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+919597867340";
    const message = encodeURIComponent(
      "Hello! I have a question about my astrology report."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setIsMenuOpen(false);
  };

  const handleAIChatClick = () => {
    setIsOpen(true);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed z-[1000] flex justify-end flex-col items-end gap-3 bottom-4 right-4 font-sans">
      {isOpen && (
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-2xl w-[80vw] md:w-[40vw] h-[80vh] flex flex-col transform transition-all duration-300">
          <div className="bg-gradient-to-r from-[#2DB787] to-[#239c6b] text-white rounded-t-xl p-4 flex justify-between items-center shadow-md">
            <h2 className="text-lg font-bold tracking-tight">Enquiry Bot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-transform duration-200 hover:scale-110"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-100/50 backdrop-blur-sm scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex animate-fade-in ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-[1.4] transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#2DB787] to-[#239c6b] text-white shadow-md"
                      : "bg-white text-gray-800 shadow-lg border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white p-3 rounded-2xl shadow-lg flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            {!selectedCategory && (
              <div className="mt-4 flex flex-col gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="w-max mx-auto text-left p-3 bg-gradient-to-r from-[#2DB787] to-[#239c6b] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-md font-medium"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
            {selectedCategory && (
              <div className="mt-4 flex flex-col gap-3">
                {qaCategories[selectedCategory].map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleQuestionClick(item.question, item.answer)
                    }
                    className="w-max mx-auto text-left p-3 text-white rounded-xl hover:text-black hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm font-medium bg-gradient-to-r from-[#2DB787] to-[#239c6b]"
                  >
                    {item.question}
                  </button>
                ))}
                <button
                  onClick={handleBackToCategories}
                  className="w-max mx-auto flex items-center gap-2 p-3 text-white rounded-xl hover:text-black hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm font-medium bg-gradient-to-r from-[#2DB787] to-[#239c6b]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Categories
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="bg-gradient-to-r from-[#2DB787] to-[#239c6b] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isMenuOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl w-48 p-3 animate-slide-in">
          <button
            onClick={handleWhatsAppClick}
            className="w-full text-left px-4 py-2 text-gray-800 leading-[1.2] hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
          >
            <MdWhatsapp className="w-6 h-6 text-green-600" />
            <span className="flex-1 font-medium">Chat with WhatsApp</span>
          </button>
          <button
            onClick={handleAIChatClick}
            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
          >
            <MessageCircleCodeIcon className="w-6 h-6 text-[#2DB787]" />
            <span className="flex-1 font-medium">Chat with Bot</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EnquiryAutomation;
