import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>

      <h1 className="text-2xl font-bold text-center mb-4">
        NeuroNest
      </h1>

      <p className="text-gray-600 text-center mb-6">
        Understand your child’s development through play.
      </p>

      <button
        onClick={() => navigate("/game")}
        className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600"
      >
        Start Assessment
      </button>

    </Layout>
  );
}

export default Home;