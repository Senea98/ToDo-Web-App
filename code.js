
class Income {
    constructor(date, subject, description, sum){
        this.date = date;
        this.subject = subject;
        this.description = description;
        this.sum = sum;
    }
}

class Outgoings extends Income{
    sum = -1 * this.sum;
}

function add(inc){

    if(inc instanceof Outgoings)tab='outgoings';
    else tab='income';
    
    storage = localStorage.getItem(tab);
    var array = new Array();
    if(storage !== null){
        array = JSON.parse(storage);
    }
    array.push(inc);
    localStorage.setItem(tab, JSON.stringify(array));
    load();
}

function funct(element){
    element.innerHTML = "something";
}

function display(tab, array){
    var table = '';
    for(inc of array)table += '<tr><td>' + inc.date + '</td><td>' + inc.subject +'</td><td>' +inc.sum + '</td></tr>';
    document.getElementById(tab).innerHTML=table;
}

function load(){
    var storage = localStorage.getItem('income');
    var array = new Array();
    var sold = 0;
    if(storage !== null){
        array = JSON.parse(storage);
        display('income', array);
        for(obj of array)sold+=parseFloat(obj.sum);
    }

    storage = localStorage.getItem('outgoings');
    array = new Array();
    if(storage !== null){
        array = JSON.parse(storage);
        display('outgoings', array);
        for(obj of array)sold+=parseFloat(obj.sum);
        
    }
    console.log("soldul este " + sold);
    document.getElementById('sold').innerHTML = "Soldul este "+sold;
}

function add_income(){
    var income = document.getElementById('in').value;
    var subject = document.getElementById('subject').value;
    var date = document.getElementById('date').value;
    var sum = document.getElementById('sum').value;
    let obj;
    if(income ==='income')obj = new Income(date, subject, '', sum);
    else obj = new Outgoings(date, subject, '', sum);
    add(obj);
}