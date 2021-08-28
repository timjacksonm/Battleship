import Gameboard from './Gameboard';
const player1 = Gameboard();
player1.placeShip('Submarine1', ['1']);
player1.placeShip('Destroyer1', ['21', '22']);
player1.placeShip('Aircraft Carrier', ['61', '62', '63', '64', '65']);

test('Removes from availableToPlace & checks Hull position is logged', () => {
  expect(player1.Ships[2].hull).toContain('62' && '63');
  expect(player1.availableToPlace).toStrictEqual([
    { name: 'Submarine2', length: 1 },
    { name: 'Destroyer2', length: 2 },
    { name: 'Cruiser', length: 3 },
    { name: 'Battleship', length: 4 },
  ]);
});
test('Checkloss function returns boolean value', () => {
  const data = player1.checkLoss();
  expect(data).toStrictEqual(false);
});
test('Verifies that an attack has been recorded on the ship', () => {
  player1.receiveAttack({ target: { id: '62' } });
  expect(player1.Ships[2].hits).toContain('62');
});
