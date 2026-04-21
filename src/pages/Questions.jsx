import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Questions() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

  function handleSubmit() {
    localStorage.setItem("answer", answer);
    navigate("/result");
  }

  return (
    <Layout>

      <h2 className="text-lg font-semibold mb-4">
        Does your child maintain eye contact?
      </h2>

      <div className="flex gap-4 mb-6">
        
        <button
          onClick={() => setAnswer("yes")}
          className={`flex-1 py-3 rounded-xl border ${
            answer === "yes" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Yes
        </button>

        <button
          onClick={() => setAnswer("no")}
          className={`flex-1 py-3 rounded-xl border ${
            answer === "no" ? "bg-blue-500 text-white" : ""
          }`}
        >
          No
        </button>

      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded-xl"
      >
        Continue
      </button>

    </Layout>
  );
}

export default Questions;