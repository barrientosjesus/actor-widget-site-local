import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../HomePage/HomePage';

export default function App() {

  return (
    <main className="h-full w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
