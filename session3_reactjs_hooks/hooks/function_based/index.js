const { useState, useEffect } = React;

function AccountInfo() {
    const [balance, setBalance] = useState(100000);

    // useEffect(() => {} , []) // Syntax     useEffect(func, arr) => arr: array is optional
    // Whenever the values inside the array changes the func runs again

    // use case 1 : ComponentDidMount

    // useEffect(() => {
    //     console.log("component mounted : useEffect called")
    // } , [])

    // use case 2 : ComponentDidUpdate
    const updateBalance = () => {
        setBalance(balance+ 1000);
    }
    // useEffect(() => {
    //     console.log("component mounted and updating : useEffect called")

    // } , [balance])

        // use case 3 : ComponentWillUnmount
    useEffect(() => {
        console.log("component mounted and updating : useEffect called")
        return () => {
            console.log("Component unmounted") // ComponentWillUnmount same as clean up when component is removed from DOM
        }
    } , [balance])


    console.log(balance)
    return <>
        <h3> Account Info</h3>
        <h3>Balance : {balance}</h3>
        <button onClick={updateBalance}> update balance</button>
    </>
}



const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AccountInfo />)
