import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Game() {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  return (
    <Layout>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Tap the circle!
      </h2>

      <div className="flex justify-center mb-4">
        <div
          onClick={() => setScore(score + 1)}
          className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center text-white text-lg cursor-pointer hover:bg-blue-500"
        >
          Tap
        </div>
      </div>

      <p className="text-center mb-4">
        Score: {score}
      </p>

      <button
        onClick={() => {
          localStorage.setItem("gameScore", score);
          navigate("/questions");
        }}
        className="w-full bg-blue-500 text-white py-3 rounded-xl"
      >
        Next
      </button>

    </Layout>
  );
}

export default Game;