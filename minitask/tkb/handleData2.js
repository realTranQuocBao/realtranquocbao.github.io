/**
 * merge all section of course
 */

window.onload = () => {
  const timetableData = [];

  let jsonData;
  try {
    const localStorageValue = localStorage.getItem("QuocBaoIT_SGU");
    jsonData = localStorageValue
      ? JSON.parse(localStorageValue)
      : JSON.parse(dataExample);
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    jsonData = [];
  }

  console.log(jsonData);

  drawTimetable(jsonData);

  // draw table data
  jsonData.forEach((course, courseIndex) => {
    addCourse();
    const rowId = courseIndex + 1;
    const courseElm = document.querySelector(`#row-${rowId}`);

    courseElm.querySelector(`textarea[name="courseCode-${rowId}"]`).value =
      course.courseCode;
    courseElm.querySelector(`textarea[name="courseName-${rowId}"]`).value =
      course.courseName;
    courseElm.querySelector(`textarea[name="courseGroup-${rowId}"]`).value =
      course.courseGroup;
    courseElm.querySelector(`textarea[name="teacher-${rowId}"]`).value =
      course.teacher;

    const sections = course.sections;

    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      const secondId = sectionIndex + 1;

      if (secondId != 1) addSection(courseElm.querySelector("i"));

      document.querySelector(`select[name="day-${rowId}-${secondId}"]`).value =
        section.day;
      document.querySelector(`input[name="start-${rowId}-${secondId}"]`).value =
        section.startSection;
      document.querySelector(`input[name="num-${rowId}-${secondId}"]`).value =
        section.numSections;
      document.querySelector(`input[name="room-${rowId}-${secondId}"]`).value =
        section.roomCode;
    }
  });
};

// jsonData.forEach((item) => {
//   const existingCourse = timetableData.find(
//     (course) =>
//       course.courseCode === item.courseCode &&
//       course.courseGroup === item.courseGroup
//   );

//   if (existingCourse) {
//     existingCourse.sections.push({
//       day: parseInt(item.day),
//       startSection: item.startSection,
//       numSections: item.numSections,
//       roomCode: item.room,
//     });
//   } else {
//     timetableData.push({
//       courseName: item.courseName,
//       courseCode: item.courseCode,
//       courseGroup: item.courseGroup,
//       teacher: item.teacher,
//       sections: [
//         {
//           day: parseInt(item.day),
//           startSection: item.startSection,
//           numSections: item.numSections,
//           roomCode: item.room,
//         },
//       ],
//     });
//   }
// });

const getNewDataFromForm = () => {
  const rowsColection = document
    .querySelector("#courseTable")
    .querySelector("tbody").rows;
  const courses = [];
  for (let rowIndex = 0; rowIndex < rowsColection.length; rowIndex++) {
    const row = rowsColection[rowIndex];
    const tdCount = row.querySelectorAll("td").length;

    if (tdCount == 10) {
      const courseCode = row.querySelector(
        'textarea[name^="courseCode"]'
      ).value;
      const courseName = row.querySelector(
        'textarea[name^="courseName"]'
      ).value;
      const courseGroup = row.querySelector(
        'textarea[name^="courseGroup"]'
      ).value;
      const teacher = row.querySelector('textarea[name^="teacher"]').value;

      const sections = [];

      const sectionDay = row.querySelector('select[name^="day"]').value;
      const sectionStartSection = row.querySelector(
        'input[name^="start"]'
      ).value;
      const sectionNumSections = row.querySelector('input[name^="num"]').value;
      const sectionRoomCode = row.querySelector('input[name^="room"]').value;

      const section = {
        day: parseInt(sectionDay),
        startSection: parseInt(sectionStartSection),
        numSections: parseInt(sectionNumSections),
        roomCode: sectionRoomCode,
      };

      sections.push(section);

      for (
        let rowIndex2 = 1;
        rowsColection[rowIndex + rowIndex2] != undefined &&
        rowsColection[rowIndex + rowIndex2].querySelectorAll("td").length == 5;
        rowIndex2++
      ) {
        const nextRow = rowsColection[rowIndex + rowIndex2];
        const sectionDay = nextRow.querySelector('select[name^="day"]').value;
        const sectionStartSection = nextRow.querySelector(
          'input[name^="start"]'
        ).value;
        const sectionNumSections =
          nextRow.querySelector('input[name^="num"]').value;
        const sectionRoomCode = nextRow.querySelector(
          'input[name^="room"]'
        ).value;

        const section = {
          day: parseInt(sectionDay),
          startSection: parseInt(sectionStartSection),
          numSections: parseInt(sectionNumSections),
          roomCode: sectionRoomCode,
        };

        sections.push(section);
      }

      const course = {
        courseCode: courseCode,
        courseName: courseName,
        courseGroup: courseGroup,
        teacher: teacher,
        sections: sections,
      };

      courses.push(course);
    }
  }

  localStorage.setItem("QuocBaoIT_SGU", JSON.stringify(courses));
  console.log(courses);
  drawTimetable(courses);
};

// const clearAndRedraw = (selectedTeacher) => {
//   while (timetableContainer.firstChild) {
//     timetableContainer.firstChild.remove();
//   }
// };
// while (timetableContainer.firstChild) {
//   timetableContainer.firstChild.remove();
// }
