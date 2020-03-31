import { Course } from './course.js';
import { Student } from './Student.js';
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let studentTbody: HTMLElement = document.getElementById('informacion')!;

renderStudentInTable(dataStudent);

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;

const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputCreditosMBox: HTMLInputElement = <HTMLInputElement> document.getElementById("creditosM-box")!;
const inputCreditosSBox: HTMLInputElement = <HTMLInputElement> document.getElementById("creditosS-box")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;



btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCreditos.onclick = () => applyFilterByCreditos();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `Total Créditos: ${getTotalCredits(dataCourses)}`


function renderStudentInTable(student: Student[]): void {
  console.log('Desplegando informacion studiante');
  student.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Código</td>
                           <td>${student.codigo}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Cédula</td>
                           <td>${student.cedula}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Edad</td>
                           <td>${student.edad} Años</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Dirección</td>
                           <td>${student.direccion}</td>`;
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Teléfono</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
  });
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCreditos() { 
  let input1 = inputCreditosMBox.value;
  let input2 = inputCreditosSBox.value;
  if(input1 !== null && input2 !== null)
  {
    let numero1 =  +input1;
    let numero2 =  +input2;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCreditos(numero1, numero2, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  
}

function searchCourseByCreditos(numeroM: number, numeroS: number, courses: Course[]) {

  var cursos = courses.slice();
  for(let index = 0; index < courses.length ; index++){
    let course = courses[index];
    let eliminado: Course;
    if(course.credits < numeroM || course.credits >numeroS)
    {
      eliminado = cursos.shift()!;
    }
    else{
      eliminado = cursos.shift()!;
      cursos.push(eliminado);
    }
  }
  return cursos ;
}




function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}