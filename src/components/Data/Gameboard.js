import Ship from './Ships';

const Gameboard = () => {
  return {
    availableToPlace: [
      'Submarine1',
      'Submarine2',
      'Destroyer1',
      'Destroyer2',
      'Cruiser',
      'Battleship',
      'Aircraft Carrier',
    ],
    Ships: [],
    placeShip: function (type, hull) {
      if (this.availableToPlace.includes(type)) {
        this.Ships.push(Ship(type, hull));
        const result = this.availableToPlace.indexOf(type);
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
