import Layout from "../components/Layout";

function Result() {
  const score = localStorage.getItem("gameScore");
  const answer = localStorage.getItem("answer");

  let result = "Low Risk";

  if (score < 5 || answer === "no") {
    result = "Moderate Risk";
  }

  return (
    <Layout>

      <h2 className="text-xl font-bold text-center mb-4">
        Result
      </h2>

      <p className="text-center mb-2">
        Score: {score}
      </p>

      <p className="text-center mb-4">
        Response: {answer}
      </p>

      <div className="text-center text-lg font-semibold text-red-500">
        {result}
      </div>

    </Layout>
  );
}

export default Result;