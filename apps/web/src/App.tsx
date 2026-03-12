import { RollOffSchedulingPage } from "./components/RollOffSchedulingPage";

const App = () => {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 pt-10">
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">
          Roll-off Scheduling
        </h1>
      </header>
      <RollOffSchedulingPage />
    </main>
  );
};

export default App;