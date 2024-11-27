"use client"; // Add this at the top of the file

import React, { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    goals: {
      salary: false,
      workload: false,
      costOfLiving: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false); // Track if the form is submitting

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        goals: { ...prev.goals, [name]: checked },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!form.name || !form.department || !form.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Ensure at least one goal is selected
    if (!form.goals.salary && !form.goals.workload && !form.goals.costOfLiving) {
      alert('Please select at least one goal');
      return;
    }

    setIsLoading(true); // Start loading

    const formData = {
      name: form.name,
      department: form.department,
      email: form.email,
      goals: form.goals,
    };

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsLoading(false); // Stop loading when done
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-blue-500 text-white py-8 text-center">
          <h1 className="text-4xl font-bold">Support Fair Compensation for CIU Research Assistants!</h1>
          <p className="text-lg mt-4">Join us in advocating for better salaries and living conditions.</p>
        </header>

        {/* Goals Section */}
        <section className="py-12 px-4">
          <h2 className="text-3xl text-black font-bold text-center mb-6">Our Goals for Fair Compensation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Goal Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
              <h3 className="text-xl text-black font-bold mb-2">Fair Salary Adjustment</h3>
              <p className="text-gray-600">Increase our salary to meet the minimum living standards in Northern Cyprus.</p>
            </div>

            {/* Goal Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
              <h3 className="text-xl text-black font-bold mb-2">Workload Recognition and Equality</h3>
              <p className="text-gray-600">Salary Adjustment to recognize the full-time contributions of the Assistants.</p>
            </div>

            {/* Goal Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
              <h3 className="text-xl text-black font-bold mb-2">Rising Cost of Living</h3>
              <p className="text-gray-600">Salary Adjustment to counter inflation and rising costs.</p>
            </div>

            {/* Download Petition Card */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl text-black font-bold mb-2">Download the Petition</h3>
                <p className="text-gray-600">
                  Get a copy of the petition to share with others or for your reference. Click below to download the PDF.
                </p>
              </div>
              <div className="mt-auto pt-4">
                <a
                    href="/Petition%20Letter.pdf" // Ensure the PDF file is in your public folder
                    download="Petition Letter.pdf"
                    className="inline-block bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-12 px-4">
          <h2 className="text-2xl text-black font-bold text-center mb-6">Add Your Voice to the Movement</h2>
          <p className="text-red-500 text-center mb-4">
            Please select at least one goal to submit the form.
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div>
              <label className="block text-sm text-black font-bold mb-2">Full Name</label>
              <input
                  required
                  type="text"
                  name="name"
                  placeholder="Name And Surname"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 border text-black border-[black] rounded-lg placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-bold mb-2">Department</label>
              <input
                  required
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full p-3 text-black border border-[black] rounded-lg placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-bold mb-2">CIU Email Address</label>
              <input
                  required
                  placeholder="CIU Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border text-black border-[black] rounded-lg placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
              />
            </div>

            {/* Goals Section */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input

                    type="checkbox"
                    name="salary"
                    checked={form.goals.salary}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label className="text-black">Support Fair Salary Adjustment</label>
              </div>
              <div className="flex items-center">
                <input

                    type="checkbox"
                    name="workload"
                    checked={form.goals.workload}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label className="text-black">Support Workload Recognition</label>
              </div>
              <div className="flex items-center">
                <input
                    type="checkbox"
                    name="costOfLiving"
                    checked={form.goals.costOfLiving}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label className="text-black">Support Cost-of-Living Allowance</label>
              </div>
            </div>

            {/* Loading Spinner */}
            {isLoading && (
                <div className="flex justify-center mt-4">
                  <div className="spinner-border text-blue-500" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                disabled={isLoading} // Disable button while loading
            >
              Submit My Support
            </button>
          </form>
        </section>
      </div>
  );
}
