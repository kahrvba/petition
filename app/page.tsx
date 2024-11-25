"use client"; // Add this at the top of the file

import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Home() {
  const sigCanvas = useRef<SignatureCanvas>(null); // Signature Canvas reference
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    goals: {
      salary: false,
      workload: false,
      costOfLiving: false,
    },
    signature: "",
  });

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

  const clearSignature = () => {
    sigCanvas.current?.clear(); // Clear signature
  };

  const saveSignature = () => {
    const signatureData = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png"); // Get signature as a base64 image
    setForm((prev) => ({ ...prev, signature: signatureData || "" }));
    console.log("Saved signature:", signatureData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Here you can send the form data to your backend using fetch or axios
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Goal Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl text-black font-bold mb-2">Fair Salary Adjustment</h3>
            <p className="text-gray-600">Increase our salary to meet the minimum living standards in Northern Cyprus.</p>
            <div className="mt-4">
              <input
                required
                type="checkbox"
                name="salary"
                checked={form.goals.salary}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-black">Support this goal</label>
            </div>
          </div>
          {/* Goal Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl text-black font-bold mb-2">Workload Recognition and Equality</h3>
            <p className="text-gray-600">Salary Adjustment to recognize the full-time contributions of the Assistants.</p>
            <div className="mt-4">
              <input
                required
                type="checkbox"
                name="workload"
                checked={form.goals.workload}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-black">Support this goal</label>
            </div>
          </div>
          {/* Goal Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-xl text-black font-bold mb-2">Rising Cost of Living</h3>
            <p className="text-gray-600">Salary Adjustement to counter inflation and rising costs.</p>
            <div className="mt-4">
              <input
                required
                type="checkbox"
                name="costOfLiving"
                checked={form.goals.costOfLiving}
                onChange={handleChange}
                className="mr-2 mt-7"
              />
              <label className="text-black">Support this goal</label>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-12 px-4">
        <h2 className="text-2xl text-black font-bold text-center mb-6">Add Your Voice to the Movement</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <label className="block text-sm text-black font-bold mb-2">Full Name</label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border text-black border-[black] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-bold mb-2">Department</label>
            <input
              required
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full p-3 text-black border border-[black] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-bold mb-2">Email Address</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border text-black border-[black] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm text-black font-bold mb-2">Signature</label>
            <div className="relative w-full h-48 sm:h-60 lg:h-72">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  className: "border border-black rounded-lg w-full h-full",
                }}
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={clearSignature}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={saveSignature}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Signature
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
          >
            Submit My Support
          </button>
        </form>
      </section>
    </div>
  );
}
