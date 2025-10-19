const { useState, useEffect } = React;

function AccountInfo() {
    const [balance, setBalance] = useState(100000);
    const isSalaried = true;

    const accountName = isSalaried ? "Current" : "Savings";
    const [accountType, setAccountType] = useState(accountName);
    // Not allowed using hooks in conditions
    // if(isSalaried){
    //     const [accountType, setAccountType] = useState("Current");
    // } else {
    //     const [accountType, setAccountType] = useState("Savings");
    // }
    // console.log(balance)

    const updateBalance = (newValue) => {
        setBalance(balance + newValue)
    }
    return <>
        <h3> Account Info</h3>
        <h3>Balance : {balance}</h3>
        <button onClick={() => updateBalance(10000)}> update balance</button>
    </>
}



const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AccountInfo />)
