function addCourse() {
  const numCourses =
    document.querySelector("#courseTable").querySelectorAll(`[id^="row-"]`)
      .length + 1;

  const tableBody = document.querySelector("#courseTable tbody");

  const newRow = document.createElement("tr");
  newRow.id = `row-${numCourses}`;
  newRow.setAttribute("data-group", `course-${numCourses}`);

  newRow.innerHTML = `
    <td rowspan="1">
    <i class="fa-sharp fa-solid fa-circle-plus iconbutton" style="color:#0c910c" onclick="addSection(this)"></i>
    </td>
    <td rowspan="1"><textarea rows="1" name="courseName-${numCourses}"></textarea></td>
    <td rowspan="1"><textarea rows="1" name="courseCode-${numCourses}"></textarea></td>
    <td rowspan="1"><textarea rows="1" name="courseGroup-${numCourses}"></textarea></td>
    <td rowspan="1"><textarea rows="1" name="teacher-${numCourses}"></textarea></td>
    <td>
      <select name="day-${numCourses}-1">
        <option value="1">Hai</option>
        <option value="2">Ba</option>
        <option value="3">Tư</option>
        <option value="4">Năm</option>
        <option value="5">Sáu</option>
        <option value="6">Bảy</option>
      </select>
    </td>
    <td><input type="number" min="1" max="10" name="start-${numCourses}-1" /></td>
    <td><input type="number" min="1" max="10" name="num-${numCourses}-1" /></td>
    <td><input type="text" name="room-${numCourses}-1" /></td>
    <td><i class="fa-solid fa-trash iconbutton" style="color:#f00" onclick="deleteSection(this)"></i></td>
  `;

  tableBody.appendChild(newRow);
}

function addSection(e) {
  const rowId = e.parentNode.parentNode.id.substring(4);
  const rowElement = document.querySelector(`#row-${rowId}`);
  const rowAray = document.querySelectorAll(`[data-group^="course-${rowId}"]`);
  const rowElementLast = rowAray[rowAray.length - 1];
  const numSections = document.querySelectorAll(
    `[data-group^="course-${rowId}"]`
  ).length;

  // Update rowspan value
  const rowspan = numSections + 1;
  rowElement.querySelectorAll(`[rowspan="${numSections}"]`).forEach((cell) => {
    cell.setAttribute("rowspan", rowspan);
  });
  rowElement.querySelectorAll(`[rows="${numSections}"]`).forEach((cell) => {
    cell.setAttribute("rows", rowspan);
  });

  // Create new section row
  const sectionRow = document.createElement("tr");
  sectionRow.setAttribute("data-group", `course-${rowId}`);
  sectionRow.innerHTML = `
  <td>
    <select name="day-${rowId}-${rowspan}">
      <option value="1">Hai</option>
      <option value="2">Ba</option>
      <option value="3">Tư</option>
      <option value="4">Năm</option>
      <option value="5">Sáu</option>
      <option value="6">Bảy</option>
    </select>
  </td>
  <td><input name="start-${rowId}-${rowspan}" type="number" min="1" max="10" /></td>
  <td><input name="num-${rowId}-${rowspan}" type="number" min="1" max="10"  /></td>
  <td><input type="text" name="room-${rowId}-${rowspan}" /></td>
  <td><i class="fa-solid fa-trash iconbutton" style="color:#f00" onclick="deleteSection(this)"></i></td>
  `;

  // Insert the section row after the last section row
  rowElementLast.parentNode.insertBefore(
    sectionRow,
    rowElementLast.nextSibling
  );
}

const deleteSection = (e) => {
  const row = e.parentNode.parentNode;
  const rowId = row.getAttribute("data-group").substring(7);
  const tableBody = row.parentNode;
  const rowElement = document.querySelector(`#row-${rowId}`);
  const numSections = document.querySelectorAll(
    `[data-group^="course-${rowId}"]`
  ).length;

  if (row === rowElement) {
    //delete all
    // Count the number of sections with the same data-group value
    const sectionsArr = document.querySelectorAll(
      `[data-group="${row.getAttribute("data-group")}"]`
    );

    // delete
    sectionsArr.forEach((item) => {
      tableBody.removeChild(item);
    });
  } else {
    //delete 1

    // Update rowspan value
    const rowspan = numSections - 1;
    rowElement
      .querySelectorAll(`[rowspan="${numSections}"]`)
      .forEach((cell) => {
        cell.setAttribute("rowspan", rowspan);
      });
    rowElement.querySelectorAll(`[rows="${numSections}"]`).forEach((cell) => {
      cell.setAttribute("rows", rowspan);
    });

    // delete element
    tableBody.removeChild(row);
  }
};
