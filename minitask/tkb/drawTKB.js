const getRandomColor = (index) => {
  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
    "#FF4500", // Orange Red
    "#32CD32", // Lime Green
    "#008080", // Teal
    "#FF1493", // Deep Pink
    "#00CED1", // Dark Turquoise
    "#7B68EE", // Medium Slate Blue
    "#D2691E", // Chocolate
    "#FF8C00", // Dark Orange
    "#00BFFF", // Deep Sky Blue
    "#ADFF2F", // Green Yellow
    "#8B008B", // Dark Magenta
    "#556B2F", // Dark Olive Green
    "#2E8B57", // Sea Green
    "#6A5ACD", // Slate Blue
    "#B22222", // Fire Brick
    "#9932CC", // Dark Orchid
    "#DC143C", // Crimson
    "#1E90FF", // Dodger Blue
    "#228B22", // Forest Green
    "#4682B4", // Steel Blue
    "#8A2BE2", // Blue Violet
    "#FF69B4", // Hot Pink
    "#90EE90", // Light Green
    "#FF6347", // Tomato
    "#40E0D0", // Turquoise
    "#8B0000", // Dark Red
    "#FA8072", // Salmon
    "#5F9EA0", // Cadet Blue
    "#FFD700", // Gold
    "#808000", // Olive
    "#008B8B", // Dark Cyan
    "#9370DB", // Medium Purple
    // Add more colors as needed
  ];

  // Use modulus operator to ensure the index stays within the colors array length
  // const colorIndex = index % colors.length;
  const colorIndex = Math.floor(Math.random() * 41);
  return colors[colorIndex];
};

const drawTimetable = (dataDrawTimetable) => {
  const columnTitles = [
    "QuocBaoIT",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const rowTitles = Array.from(
    { length: 10 },
    (_, index) => `Tiết ${index + 1}`
  );

  const timetableElement = document.getElementById("timetable");

  while (timetableElement.firstChild) {
    timetableElement.firstChild.remove();
  }

  for (let row = 2; row <= rowTitles.length + 1; row++) {
    const line = document.createElement("div");
    line.className = "horizontal-line";
    line.style.gridColumn = `1 / span ${columnTitles.length}`;
    line.style.gridRow = row;
    line.style.height = "50px"; // Set the desired height for each row
    timetableElement.appendChild(line);
  }

  for (let col = 1; col <= columnTitles.length; col++) {
    const line = document.createElement("div");
    line.className = "vertical-line";
    line.style.gridColumn = col;
    line.style.gridRow = `1/ span ${rowTitles.length + 1}`;
    timetableElement.appendChild(line);
  }

  columnTitles.forEach((title, index) => {
    const cell = document.createElement("div");
    cell.className = `cell ${index === 0 ? "quocbaoit" : "column-title"}`;
    cell.textContent = title;
    cell.style.gridColumn = index + 1;
    cell.style.gridRow = 1;
    timetableElement.appendChild(cell);
  });

  rowTitles.forEach((title, index) => {
    const cell = document.createElement("div");
    cell.className = "cell row-title";
    cell.textContent = title;
    cell.style.gridColumn = 1;
    cell.style.gridRow = index + 2;
    timetableElement.appendChild(cell);
  });

  dataDrawTimetable.forEach((data, index) => {
    const { courseName, courseCode, courseGroup, teacher, sections } = data;
    const color = getRandomColor(index);

    sections.forEach((section) => {
      const { day, startSection, numSections, roomCode } = section;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.gridColumn = day + 1;
      cell.style.gridRow = `${startSection + 1} / span ${numSections}`;
      cell.style.backgroundColor = color;

      const contentWrapper = document.createElement("div");
      contentWrapper.className = "content-wrapper";

      const courseNameElement = document.createElement("p");
      courseNameElement.className = "course-name";
      courseNameElement.style.fontWeight = "bold";
      courseNameElement.textContent = courseName;

      const classCodeElement = document.createElement("p");
      classCodeElement.className = "class-code";
      classCodeElement.innerHTML = `${courseCode}-${courseGroup}`;

      const roomCodeElement = document.createElement("p");
      roomCodeElement.className = "room-code";
      roomCodeElement.innerHTML = `GV: <span class="bold-text">${teacher}</span> || Phòng: <span class="bold-text">${roomCode}</span>`;

      contentWrapper.appendChild(courseNameElement);

      contentWrapper.appendChild(classCodeElement);
      contentWrapper.appendChild(roomCodeElement);
      cell.appendChild(contentWrapper);
      timetableElement.appendChild(cell);
    });
  });
};

const dataExample =
  '[{"courseCode":"863408","courseName":"Tổ chức HĐ dạy học & GD ở trường trung học","courseGroup":"04","teacher":"H.M.Khương","sections":[{"day":1,"startSection":1,"numSections":3,"roomCode":"C.A302"},{"day":2,"startSection":1,"numSections":2,"roomCode":"C.A302"},{"day":5,"startSection":6,"numSections":4,"roomCode":"C.A508"}]},{"courseCode":"867008","courseName":"Toán cao cấp C2","courseGroup":"06","teacher":"N.Sum","sections":[{"day":4,"startSection":6,"numSections":3,"roomCode":"C.E305"},{"day":3,"startSection":6,"numSections":3,"roomCode":"C.E305"}]}]';
