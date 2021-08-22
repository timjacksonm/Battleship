import Ship from './Ships';

test('identify object receives type and posistion', () => {
  const data = Ship('Battleship', ['1', '2', '3', '4']);
  const { type, hull } = data;
  expect(type).toBe('Battleship');
  expect(hull).toEqual(['1', '2', '3', '4']);
  expect({ type, hull }).toStrictEqual({
    hull: ['1', '2', '3', '4'],
    type: 'Battleship',
  });
});

test('verifies if ship saves hit data', () => {
  const data = Ship('Battleship', ['1', '2', '3', '4']);
  data.hit('2');
  data.hit('3');
  expect(data.hits).toEqual(['2', '3']);
});

test('verifies if ship is sunk', () => {
  const data = Ship('Battleship', ['1', '2', '3', '4']);
  data.hit('1');
  data.hit('2');
  data.hit('3');
  data.hit('4');
  expect(data.isSunk()).toEqual(true);
});
