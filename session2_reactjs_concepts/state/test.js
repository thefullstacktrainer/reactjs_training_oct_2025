let user = {
    name : "Adi"
}
function getData(){
    let setNameFunc = (newName) => {
        user.name = newName;
    }
    return [name, setNameFunc]
}

const [firstname, setname] = getData();