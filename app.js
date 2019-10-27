const form = document.querySelector("form");
const inputs = document.querySelectorAll(".input__field");
const submit = document.querySelector("#submit");
const studentDOM = document.querySelector("#table1");
const teacherDOM = document.querySelector("#table2");

const name = inputs[0],
    surName = inputs[1],
    pesel = inputs[2],
    age = inputs[3],
    field = inputs[4],
    position = inputs[5],
    student = inputs[6],
    teacher = inputs[7];

class Person {
    constructor(name, surName, pesel) {
        this.name = name;
        this.surName = surName;
        this._pesel = pesel;
    }

    get pesel() {
        return this._pesel.toString().replace(this._pesel.slice(1, -2), "# ## ## ###");
    }
}

class Student extends Person {
    constructor(name, surName, pesel, age, field) {
        super(name, surName, pesel);
        this.age = age;
        this.field = field;
    }
}

class Teacher extends Person {
    constructor(name, surName, pesel, position) {
        super(name, surName, pesel);
        this.position = position;
    }
}

const studentList = [
    new Student("Mateusz", "Rostkowski", "95071513451", 23, "ZiIP"),
    new Student("Jan", "Nowa", "85071513451", 33, "EiA"),
    new Student("Adam", "Kowalski", "95071513136", 23, "MiBM"),
    new Student("Mariusz", "Frytka", "92071513151", 26, "Inf"),
    new Student("Janusz", "Jabłko", "97425134514", 21, "ZiIP")
];

const teacherList = [
    new Teacher("Anna", "Flask", "95101412425", "Sekretarka"),
    new Teacher("Magda", "Pudło", "92101414585", "Wykładowca"),
    new Teacher("Paulina", "Piach", "85101412345", "Wykładowca"),
    new Teacher("Anna", "Antolak", "75101451425", "Sekretarka")
];

class CreatePerson {
    static watchRadio() {
        switch(student.checked) {
            case true:
                age.disabled = false;
                field.disabled = false;
                position.innerText = '';
                position.disabled = true;
                break;
            default:
                age.innerText = '';
                age.disabled = true;
                field.innerText = '';
                field.disabled = true;
                position.disabled = false;
        }
    }

    static addToList() {
        if(pesel.value.length > 0) {
            switch(student.checked) {
                case true:
                    studentList.push(new Student(name.value, surName.value, pesel.value, age.value, field.value));
                    Render.renderStudents();
                    break;
                default:
                    teacherList.push(new Teacher(name.value, surName.value, pesel.value, position.value));
                    Render.renderTeachers();
            }
        } else {
            alert('pesel musi składać się z 11 cyfr');
        }        
    }

    static removePerson(i, list) {
        list.splice(i, 1);
        Render.renderStudents();
        Render.renderTeachers();
    }
}

class Render {
    static renderStudents() {
        studentDOM.innerHTML = `
            <div class="row">
                <div class="item">
                    Imię
                </div>
                <div class="item">
                    Nazwisko
                </div>
                <div class="item">
                    Wiek
                </div>
                <div class="item">
                    Numer Pesel
                </div>
                <div class="item">
                    Kierunek Studiów
                </div>
                <div class="item">
                    Usuń pozycję
                </div>
            </div>
        `

        studentList.map((element, index) => {
            studentDOM.innerHTML += `
                <div class="row">
                    <div class="item">
                        ${element.name}
                    </div>
                    <div class="item">
                        ${element.surName}
                    </div>
                    <div class="item">
                        ${element.age}
                    </div>
                    <div class="item">
                        ${element.pesel}
                    </div>
                    <div class="item">
                        ${element.field}
                    </div>
                    <div class="item">
                        <button onclick="CreatePerson.removePerson(${index}, studentList)">
                            Usuń
                        </button>
                    </div>
                </div>
            `
        })
    }
    
    static renderTeachers() {

        teacherDOM.innerHTML = `
            <div class="row">
                <div class="item">
                    Imię
                </div>
                <div class="item">
                    Nazwisko
                </div>
                <div class="item">
                    PESEL
                </div>
                <div class="item">
                    Stanowisko
                </div>
                <div class="item">
                    Usuń pozycję
                </div>
            </div>
        `

        teacherList.map((element, index) => {
            teacherDOM.innerHTML += `
                <div class="row">
                    <div class="item">
                        ${element.name}
                    </div>
                    <div class="item">
                        ${element.surName}
                    </div>
                    <div class="item">
                        ${element.pesel}
                    </div>
                    <div class="item">
                        ${element.position}
                    </div>
                    <div class="item">
                        <button onclick="CreatePerson.removePerson(${index}, teacherList)">
                            Usuń
                        </button>
                    </div>
                </div>
            `
        })
    }
}

CreatePerson.watchRadio();
Render.renderStudents();
Render.renderTeachers();

[student, teacher].map((element) => {
    element.addEventListener('click', CreatePerson.watchRadio)
})

submit.addEventListener("click", CreatePerson.addToList);