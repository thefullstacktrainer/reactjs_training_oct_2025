function render(children){
    const root = document.getElementById('root');
    root.appendChild(children);
}

function h1(children){
    const h1 = document.createElement('h1');
    h1.appendChild(children);
    return h1;
}

function text(value){
    return document.createTextNode(value);
}
const children = text('Hello World');
const children1 = h1(children);
render(children1);


// document.getElementById('root').appendChild(document.createElement('h1')
//     .appendChild(document.createTextNode('Hello World')));