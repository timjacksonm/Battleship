const highlightSelected = (e, player, currentShip, setSelected) => {
  const allCells = [...e.target.parentElement.children];
  const { min, max } = {
    min: Number(e.target.id),
    max: Number(e.target.id) + currentShip.length - 1,
  };

  const collision = player.Ships.map((ship) =>
    ship.hull.some(
      (position) => Number(position) >= min && Number(position) <= max
    )
  ).filter((value) => value === true);

  if (
    (min >= 1 && min <= 10 && max >= 1 && max <= 10 && !collision[0]) ||
    (min >= 11 && min <= 20 && max >= 11 && max <= 20 && !collision[0]) ||
    (min >= 21 && min <= 30 && max >= 21 && max <= 30 && !collision[0]) ||
    (min >= 31 && min <= 40 && max >= 31 && max <= 40 && !collision[0]) ||
    (min >= 41 && min <= 50 && max >= 41 && max <= 50 && !collision[0]) ||
    (min >= 51 && min <= 60 && max >= 51 && max <= 60 && !collision[0]) ||
    (min >= 61 && min <= 70 && max >= 61 && max <= 70 && !collision[0]) ||
    (min >= 71 && min <= 80 && max >= 71 && max <= 80 && !collision[0]) ||
    (min >= 81 && min <= 90 && max >= 81 && max <= 90 && !collision[0]) ||
    (min >= 91 && min <= 100 && max >= 91 && max <= 100 && !collision[0])
  ) {
    const filteredCells = allCells.filter(
      (element) => element.id <= max && element.id >= min
    );
    setSelected(filteredCells);
    filteredCells.forEach((element) => (element.className += ' highlighted'));
  } else setSelected(null);
};

const removeSelected = (selected) => {
  if (selected) {
    selected.forEach((element) => (element.className = 'grid-item'));
  }
};

const saveSelected = (
  e,
  selected,
  player,
  currentShip,
  setCurrentShip,
  setStartGame
) => {
  if (selected) {
    const placement = selected.map((cell) => Number(cell.id));
    player.placeShip(currentShip.name, placement);
    selected.forEach((element) => {
      element.className = 'grid-item selected';
      element.disabled = true;
    });
  }
  if (player.Ships.length === 7) {
    setCurrentShip(null);
    setStartGame(true);
    const allCells = [...e.target.parentElement.children];
    allCells.forEach((cell) => (cell.disabled = true));
    return;
  }
  setCurrentShip(player.availableToPlace[0]);
};

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

const getRandomTarget = (object) => {
  let randomNumber = random(1, 100);
  while (
    object.current.children[randomNumber - 1].classList.contains('miss') ||
    object.current.children[randomNumber - 1].classList.contains('hit')
  ) {
    randomNumber = random(1, 100);
  }
  return randomNumber;
};

const getRandomPlacements = () => {
  const rows = {
    horizontal: [
      { A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { B: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { C: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { D: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
      { E: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50] },
      { F: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60] },
      { G: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70] },
      { H: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80] },
      { I: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90] },
      { J: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100] },
    ],
    vertical: {},
  };
  let {
    submarine1,
    submarine2,
    destroyer1,
    destroyer2,
    cruiser,
    battelship,
    aircraftcarrier,
  } = {
    submarine1: { length: 1, position: [] },
    submarine2: { length: 1, position: [] },
    destroyer1: { length: 2, position: [] },
    destroyer2: { length: 2, position: [] },
    cruiser: { length: 3, position: [] },
    battelship: { length: 4, position: [] },
    aircraftcarrier: { length: 5, position: [] },
  };
  const selectors = [
    submarine1,
    submarine2,
    destroyer1,
    destroyer2,
    cruiser,
    battelship,
    aircraftcarrier,
  ];
  const availableCells = [];
  for (let i = 0; i < 100; i++) {
    availableCells.push(i + 1);
  }
  for (let i = 0; i < selectors.length; i++) {
    let min = random(1, 100);
    let max = min + selectors[i].length;

    if (
      availableCells.includes(min) &&
      rows.horizontal.some(
        (row) =>
          row[Object.keys(row)].includes(min) &&
          row[Object.keys(row)].includes(max)
      )
    ) {
      const index = availableCells.indexOf(min);
      selectors[i].position = availableCells.splice(index, selectors[i].length);
    } else i--;
  }
  return {
    submarine1,
    submarine2,
    destroyer1,
    destroyer2,
    cruiser,
    battelship,
    aircraftcarrier,
  };
};

export {
  highlightSelected,
  removeSelected,
  saveSelected,
  getRandomTarget,
  getRandomPlacements,
};
