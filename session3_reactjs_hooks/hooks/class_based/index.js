class AccountInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { balance: 100000 }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){

        console.log("Test called" +this.state.balance)
    }

    componentDidMount() {
        this.handleClick()
        console.log("componentDidMount called")
    }
    componentDidUpdate() {
        console.log("componentDidUpdate called")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount called")
    }

    render() {
        return <div>
            <h3>Account Balance : Rupees {this.state.balance}</h3>
            <button onClick={this.handleClick}> Click</button>
        </div>
    }
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<AccountInformation />)

