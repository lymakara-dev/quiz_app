import Link from "next/link";
import React from "react";

function Home() {
  return (
    <main>
      <div className="container">
        <h1>Quiz App</h1>
        <Link href="/quiz">
          <button>Start Quiz</button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
