"use client";
import { set } from "mongoose";
import React, { useState } from "react";
const Admin = () => {
  const [loading, setloading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pendingOrder, setPendingOrder] = useState([]);
  const [finishedOrder, setFinishedOrder] = useState([]);
  const [requestOrders, setRequestOrders] = useState([]);
  const [resourcesOrders, setResourcesOrders] = useState([]);
  const [filterIndex, setFilterInedx] = useState(5);
  const [quizEmail, setQuizEmail] = useState([]);
  const [confirming, setConfirming] = useState({ email: "", orderId: "" });
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  const ageOption = [
    "Age (0 - 4 Years)",
    "Age (5 - 10 Years)",
    "Age (11 - 15 Years)",
    "Age (16 - 20 Years)",
  ];

  const plans = [
    "Starter Parenting",
    "Pro Parenting",
    "Ultimate Parenting",
    "Master Parenting",
  ];

  const handleCheckboxChange = (email, orderId) => {
    setConfirming({ email: email, orderId: orderId });
  };

  const getChildDetails = async () => {
    setPageLoading(true);

    setPendingOrder([]);
    setFinishedOrder([]);
    setRequestOrders([]);
    setQuizEmail([]);
    setResourcesOrders([]);

    const res = await fetch("/api/getChildDetails", {
      method: "POST",
    });

    const res1 = await fetch("/api/getrequestDetails", {
      method: "POST",
    });

    const res3 = await fetch("/api/getQuizEmail", {
      method: "POST",
    });

    const res4 = await fetch("/api/getSampleReports", {
      method: "POST",
    });

    const details = await res.json();
    const details1 = await res1.json();
    const details3 = await res3.json();
    const details4 = await res4.json();

    const pendingOrderRes = [];
    const finishedOrderRes = [];
    const requestOrders = [];
    const quizEmail = [];
    const resources = [];

    details.map((item) => {
      item.childDetails.map((child) => {
        if (child.isChecked == false) {
          pendingOrderRes.unshift({
            id: item.id,
            name: child.name,
            dob: child.dob,
            time: child.time,
            place: child.place,
            gender: child.gender,
            email: item.email,
            number: child.number,
            orderId: child.orderId,
            changes: child.isChange,
            plan: child.plan,
            lat: child.lat,
            lon: child.lon,
            createdAt: child.addedAt,
          });
        } else {
          finishedOrderRes.unshift({
            id: item.id,
            name: child.name,
            dob: child.dob,
            time: child.time,
            place: child.place,
            gender: child.gender,
            email: item.email,
            number: child.number,
            orderId: child.orderId,
            changes: child.isChange,
            plan: child.plan ? child.plan : "Late Teen",
            createdAt: child.addedAt,
          });
        }
      });
    });

    setPendingOrder(pendingOrderRes);
    setFinishedOrder(finishedOrderRes);
    setDisplayIndex(0);
    setPageLoading(false);
    setDisplayData(pendingOrder);

    details1.map((item) => {
      item.childDetails.map((child) => {
        requestOrders.unshift({
          id: item.id,
          name: child.name,
          dob: child.dob,
          time: child.time,
          place: child.place,
          gender: child.gender,
          email: item.email,
          number: child.number,
          createdAt: child.addedAt,
        });
      });
    });
    setRequestOrders(requestOrders);

    details3.map((item) => {
      quizEmail.unshift({
        id: item.id,
        email: item.email,
        number: item.number ? item.number : "-",
        age: item.age ? item.age : "-",
        createdAt: item.addedAt,
      });
    });
    setQuizEmail(quizEmail);

    details4.map((item) => {
      resources.unshift({
        id: item.id,
        email: item.email,
        name: item.name,
        type: item.type,
        createdAt: item.addedAt,
      });
    });

    setResourcesOrders(resources);
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    setloading(true);

    const res = await fetch("/api/adminLogin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      setIsAdmin(true);
      getChildDetails();
      setDisplayData(pendingOrder);
      setDisplayIndex(0);
    } else {
      alert("Invalid Credentials");
    }

    setloading(false);
  };

  const handleConfirm = async (email, orderId) => {
    try {
      setloading(true);
      const res = await fetch("/api/updateChildDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          isChecked: true,
          orderId,
        }),
      });

      if (res.status === 200) {
        getChildDetails();
        setConfirming({ email: "", orderId: "" });
      } else {
        console.log("Failed to update child status");
      }

      setloading(false);
    } catch (error) {
      console.log("Error updating child status:", error);
    }
  };

  const HandleReport = async (item) => {
    setloading(true);
    const res = await fetch(
      "https://report-api-0fic.onrender.com/generate_report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dob: `${item.dob} ${item.time}:00`,
          location: item.place.split(",")[0],
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          gender: item.gender,
          name: item.name,
          input: plans.indexOf(item.plan) + 1,
        }),
      }
    );

    setloading(false);
    if (res.status == 200) {
      alert("Check Mail");
    }
  };

  const processState = (time, status) => {
    if (displayData == 1) {
      return "Report Generated";
    }
    const date = new Date(time);
    const today = new Date();
    const diffTime = Math.abs(today - date);

    if (status) {
      return "Generate Report";
    }

    return diffTime < 10800000 ? "Wait For Update" : "Generate Report";
  };

  const handleCancel = () => {
    setConfirming({ id: 0, name: "" });
  };

  const foramtDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      {pageLoading ? (
        <div className='w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center'>
          loading....
        </div>
      ) : isAdmin ? (
        <div className='w-screen h-screen overflow-hidden bg-white text-black pt-5'>
          <div className='flex justify-center items-center mb-4 px-6'>
            <h1 className='text-2xl md:flex-1 font-bold xl:text-center flex-1'>
              Report Progress
            </h1>
            <button
              className='text-blue-400 text-end'
              onClick={getChildDetails}
            >
              Refresh
            </button>
          </div>
          <div className='flex xl:flex-row flex-col w-full h-full overflow-hidden'>
            <div className='flex flex-col px-10'>
              <button
                onClick={() => {
                  setDisplayData(pendingOrder);
                  setDisplayIndex(0);
                  setFilterInedx(5);
                }}
                className={`${
                  displayIndex == 0 ? "text-blue-500" : "text-black"
                }`}
              >
                Pending Orders ({pendingOrder.length})
              </button>
              {displayIndex == 0 &&
                plans.map((plan, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        setDisplayData(
                          pendingOrder.filter((item) => item.plan == plan)
                        );
                        setFilterInedx(index);
                      }}
                      className={`w-full text-black text-center ${
                        pendingOrder.length > 0 ? "block" : "hidden"
                      } ${
                        filterIndex == index ? "text-blue-500" : "text-black"
                      }`}
                    >
                      {plan}
                    </button>
                  </div>
                ))}
              <button
                onClick={() => {
                  setDisplayData(finishedOrder);
                  setDisplayIndex(1);
                  setFilterInedx(5);
                }}
                className={`${
                  displayIndex == 1 ? "text-blue-500" : "text-black"
                }`}
              >
                Finished Orders ({finishedOrder.length})
              </button>
              {displayIndex == 1 &&
                plans.map((plan, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        setDisplayData(
                          finishedOrder.filter((item) => item.plan == plan)
                        );
                        setFilterInedx(index);
                      }}
                      className={`w-full text-black text-center ${
                        finishedOrder.length > 0 ? "block" : "hidden"
                      } ${
                        filterIndex == index ? "text-blue-500" : "text-black"
                      }`}
                    >
                      {plan}
                    </button>
                  </div>
                ))}
              <button
                onClick={() => {
                  setDisplayData(requestOrders);
                  setDisplayIndex(2);
                }}
                className={`${
                  displayIndex == 2 ? "text-blue-500" : "text-black"
                }`}
              >
                Non Payment Orders ({requestOrders.length})
              </button>
              <button
                onClick={() => {
                  setDisplayData(quizEmail);
                  setDisplayIndex(4);
                  setFilterInedx(5);
                }}
                className={`${
                  displayIndex == 4 ? "text-blue-500" : "text-black"
                }`}
              >
                Quiz ({quizEmail.length})
              </button>
              {displayIndex == 4 &&
                ageOption.map((age, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        setDisplayData(
                          quizEmail.filter((item) => item.age == age)
                        );
                        setFilterInedx(index);
                      }}
                      className={`w-full text-black text-center ${
                        quizEmail.length > 0 ? "block" : "hidden "
                      } ${
                        filterIndex == index ? "text-blue-500" : "text-black"
                      }`}
                    >
                      {age}
                    </button>
                  </div>
                ))}
              <button
                onClick={() => {
                  setDisplayData(resourcesOrders);
                  setDisplayIndex(5);
                }}
                className={`${
                  displayIndex == 5 ? "text-blue-500" : "text-black"
                }`}
              >
                Resourses ({resourcesOrders.length})
              </button>
            </div>
            <div className='overflow-y-scroll flex-1 pb-10 flex flex-col'>
              {displayData.length > 0 ? (
                displayData.map((item, index) => (
                  <div key={index} className='p-4 border-b border-gray-300'>
                    {displayIndex != 3 && displayIndex != 4 && (
                      <h2 className='font-semibold text-xl'>{item.name}</h2>
                    )}
                    <div className='mt-2'>
                      {displayIndex != 3 &&
                        displayIndex != 4 &&
                        displayIndex != 5 && (
                          <p>
                            <span className='font-semibold'>
                              Date of Birth:{" "}
                            </span>
                            {item.dob} {item.time}:00
                          </p>
                        )}
                      {displayIndex != 3 &&
                        displayIndex != 4 &&
                        displayIndex != 5 && (
                          <p>
                            <span className='font-semibold'>
                              Place of Birth:{" "}
                            </span>
                            {item.place}
                          </p>
                        )}
                      {displayIndex != 3 &&
                        displayIndex != 4 &&
                        displayIndex != 5 && (
                          <p>
                            <span className='font-semibold'>Gender: </span>
                            {item.gender}
                          </p>
                        )}
                      {displayIndex == 0 && (
                        <p>
                          <span className='font-semibold'>lat & lon: </span>
                          {item.lat} & {item.lon}
                        </p>
                      )}

                      <p>
                        <span className='font-semibold'>Email: </span>
                        {item.email}
                      </p>
                      {displayIndex != 5 && (
                        <p>
                          <span className='font-semibold'>Number: </span>
                          {item.number}
                        </p>
                      )}
                      {displayIndex == 5 && (
                        <p>
                          <span className='font-semibold'>Type: </span>
                          {item.type}
                        </p>
                      )}
                      {(displayIndex == 0 || displayIndex == 1) && (
                        <p>
                          <span className='font-semibold'>Plan: </span>
                          {item.plan}
                        </p>
                      )}
                      {displayIndex == 4 && (
                        <p>
                          <span className='font-semibold'>Age: </span>
                          {item.age}
                        </p>
                      )}
                      <p>
                        <span className='font-semibold'>Created At: </span>
                        {foramtDate(new Date(item.createdAt))}
                      </p>
                      {displayIndex !== 2 &&
                        displayIndex !== 3 &&
                        displayIndex !== 4 &&
                        displayIndex != 5 && (
                          <>
                            <p>
                              <span className='font-semibold'>
                                Data Changes:{" "}
                              </span>
                              {item?.changes.toString()}
                            </p>

                            <p>
                              <span className='font-semibold'>Order Id: </span>
                              {item.orderId}
                            </p>

                            <p>
                              <span className='font-semibold'>Process: </span>
                              {processState(item.createdAt, item.changes)}
                            </p>
                          </>
                        )}
                      {displayIndex == 0 && (
                        <div>
                          <div className='mt-4'>
                            <label className='flex items-center space-x-2'>
                              <input
                                type='checkbox'
                                disabled={loading}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleCheckboxChange(item.email, item.orderId)
                                }
                                className='form-checkbox'
                              />
                              <span className='text-sm'>Mark as checked</span>
                            </label>
                            {loading ? (
                              <div>loading...</div>
                            ) : (
                              confirming.email == item.email &&
                              confirming.orderId == item.orderId && (
                                <div className='mt-2'>
                                  <button
                                    onClick={() =>
                                      handleConfirm(
                                        confirming.email,
                                        confirming.orderId
                                      )
                                    }
                                    className='bg-green-500 text-white px-4 py-2 rounded mr-2'
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className='bg-red-500 text-white px-4 py-2 rounded'
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )
                            )}
                          </div>

                          <div className='mt-5'>
                            <button
                              className='py-2 px-4 border border-black rounded-xl'
                              onClick={() => {
                                HandleReport(item);
                              }}
                              disabled={loading}
                            >
                              {loading ? "Loading.." : "Generate Report"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className='w-full text-center'>
                  No child details available.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='w-screen h-screen flex justify-center text-black items-center'>
          <form
            onSubmit={adminLogin}
            className='bg-white px-12 py-5 rounded shadow-lg'
          >
            <h2 className='text-2xl mb-4 text-center'>Admin Login</h2>
            <div className='mb-4'>
              <label className='block text-gray-700'>Username</label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded mt-1'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded mt-1'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white p-2 rounded mt-4'
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
