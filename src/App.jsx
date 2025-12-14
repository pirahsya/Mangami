import { useAppContext } from "./context/AppContext";

export default function App() {
  const { theme, setTheme } = useAppContext();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6">
      <h1 className="text-2xl font-bold">Mangami</h1>

      <div className="flex gap-2 mt-4">
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("system")}>System</button>
      </div>

      <p className="mt-4">Current theme: {theme}</p>
    </div>
  );
}
