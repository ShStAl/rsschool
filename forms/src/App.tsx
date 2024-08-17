function App() {
  function x({}: any) {
    return 1;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
        {x({})}
      </h1>
    </>
  );
}

export default App;
