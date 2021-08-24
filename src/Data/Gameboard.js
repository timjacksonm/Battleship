import Ship from './Ships';

const Gameboard = () => {
  return {
    availableToPlace: [
      { name: 'Submarine1', length: 1 },
      { name: 'Submarine2', length: 1 },
      { name: 'Destroyer1', length: 2 },
      { name: 'Destroyer2', length: 2 },
      { name: 'Cruiser', length: 3 },
      { name: 'Battleship', length: 4 },
      { name: 'Aircraft Carrier', length: 5 },
    ],
    Ships: [],
    placeShip: function (type, hull) {
      const names = this.availableToPlace.map((item) => item.name);
      if (names.includes(type)) {
        this.Ships.push(Ship(type, hull));
        const result = names.indexOf(type);
        this.availableToPlace.splice(result, 1);
      } else {
        console.log('This ship is no longer available to be placed.');
      }
    },
    receiveAttack: function (event) {
      const hit = this.Ships.find((ship) => {
        if (ship.hull.includes(event.target.id)) {
          ship.hit(event.target.id);
          return true;
        }
        return false;
      });
      hit
        ? (event.target.classList += ' hit')
        : (event.target.classList += ' miss');
      event.target.disabled = true;
    },
    checkLoss: function () {
      const result = this.Ships.map((ship) => ship.isSunk()).filter(
        (boolean) => boolean === true
      );
      if (result.length === 7) {
        return true;
      } else return false;
    },
  };
};
export default Gameboard;
