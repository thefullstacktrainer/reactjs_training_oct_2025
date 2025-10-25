const { useState, useRef, useEffect } = React;

function App() {
    const [count, setCount] = useState(0);

    // for holding data
    const prevCountRef = useRef();

    useEffect(() => {
        console.log(prevCountRef.current)
        console.log(count)
        prevCountRef.current = count;
    }, [count]);

    // DOM manipulation
    const inputRef = useRef();

    const focusInput = () => {
        console.log(inputRef.current)
        inputRef.current.focus();
    }
    return (
        <div style={{ padding: "20px" }}>
            <h2> useRef Demo</h2>
            <p>Current count : {count}</p>
            <p>
                Previous count : {prevCountRef.current ?? "N/A"}
            </p>
            <button onClick={() => setCount(count + 1)}>Increment</button>

            <hr />

            <input ref={inputRef} placeholder="Click button to focus" />
            <button onClick={() => focusInput()}>Focus Input</button>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />)
