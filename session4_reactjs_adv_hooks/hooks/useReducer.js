const { useReducer, useState } = React;

function counterReducer(state, action) {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case "increment": return { ...state, count: state.count + 1 };
        case "decrement": return { ...state, count: state.count - 1 };
        case "reset": return { ...state, count: 0 };
        case "default": return state;
    }
}

function App() {

    const [name, SetName] = useState("Harish");
    const [state, dispatch] = useReducer(counterReducer, { count: 0, test: "Hello" });

    return (
        <div style={{ padding: "20px" }}>
            <h2>useReducer demo</h2>
            <p>Count {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
            <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        </div>

    )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />)
