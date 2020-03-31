import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var studentTbody = document.getElementById('informacion');
renderStudentInTable(dataStudent);
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreditos = document.getElementById("button-filterByCreditos");
var inputSearchBox = document.getElementById("search-box");
var inputCreditosMBox = document.getElementById("creditosM-box");
var inputCreditosSBox = document.getElementById("creditosS-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditos.onclick = function () { return applyFilterByCreditos(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "Total Cr\u00E9ditos: " + getTotalCredits(dataCourses);
function renderStudentInTable(student) {
    console.log('Desplegando informacion studiante');
    student.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00F3digo</td>\n                           <td>" + student.codigo + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00E9dula</td>\n                           <td>" + student.cedula + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Edad</td>\n                           <td>" + student.edad + " A\u00F1os</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Direcci\u00F3n</td>\n                           <td>" + student.direccion + "</td>";
        studentTbody.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Tel\u00E9fono</td>\n                           <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCreditos() {
    var input1 = inputCreditosMBox.value;
    var input2 = inputCreditosSBox.value;
    if (input1 !== null && input2 !== null) {
        var numero1 = +input1;
        var numero2 = +input2;
        clearCoursesInTable();
        var coursesFiltered = searchCourseByCreditos(numero1, numero2, dataCourses);
        renderCoursesInTable(coursesFiltered);
    }
}
function searchCourseByCreditos(numeroM, numeroS, courses) {
    var cursos = courses.slice();
    for (var index = 0; index < courses.length; index++) {
        var course = courses[index];
        var eliminado = void 0;
        if (course.credits < numeroM || course.credits > numeroS) {
            eliminado = cursos.shift();
        }
        else {
            eliminado = cursos.shift();
            cursos.push(eliminado);
        }
    }
    return cursos;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
