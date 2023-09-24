import { Link } from "react-router-dom";

export function Home() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold mb-4">DecExpress</h1>
        <Link to="/list-class">
          <button className="bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-800 hover:to-blue-500 text-white py-3 px-6 rounded-md">
            Acessar sistema
          </button>
        </Link>
      </div>
  
    );
  }