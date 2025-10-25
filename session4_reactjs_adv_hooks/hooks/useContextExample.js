const { useState, useContext, createContext } = React;

const ThemeContext = createContext("light");

function ThemedBox() {
    const theme = useContext(ThemeContext);
    console.log(theme)
    const style = {
        width: "200px",
        height: "100px",
        margin: "20px",
        textAlign: "center",
        lineHeight: "100px",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        border: "1px solid #000"
    }

    return <div style={style}> Current Theme</div>
}
function Theme() {
    const [themeTemp, setThemeTemp] = useState("light");

    const toggleTheme = () => {
        setThemeTemp(prev => prev === "light" ? "dark" : "light")
    }

    return <ThemeContext.Provider value={themeTemp}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <br />
        <ThemedBox />
        <ThemedBox />
    </ThemeContext.Provider>



}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Theme />)

