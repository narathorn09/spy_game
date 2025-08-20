import { startGame } from './playerUtils';

type Player = { name: string; isSpy: boolean; role: string };

const createPlayers = (count: number): Player[] =>
  Array.from({ length: count }, (_, i) => ({ name: `Player${i}`, isSpy: false, role: '' }));

let store: Record<string, string>;

beforeEach(() => {
  store = {};
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: (key: string) => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    },
    configurable: true
  });
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('startGame', () => {
  test('sets the correct number of spies', () => {
    const players = createPlayers(5);
    startGame(players, 2);
    const storedPlayers = JSON.parse(localStorage.getItem('players')!);
    const spyCount = storedPlayers.filter((p: Player) => p.isSpy).length;
    expect(spyCount).toBe(2);
  });

  test('assigns unique and random roles to non-spies', () => {
    const players = createPlayers(6);

    const firstSeq = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    let index = 0;
    const randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => firstSeq[index++ % firstSeq.length]);

    startGame(players, 2);
    const firstRun = JSON.parse(localStorage.getItem('players')!);
    const firstRoles = firstRun.filter((p: Player) => !p.isSpy).map((p: Player) => p.role);
    expect(new Set(firstRoles).size).toBe(firstRoles.length);

    localStorage.clear();
    index = 0;
    randomSpy.mockImplementation(() => firstSeq.reverse()[index++ % firstSeq.length]);

    startGame(players, 2);
    const secondRun = JSON.parse(localStorage.getItem('players')!);
    const secondRoles = secondRun.filter((p: Player) => !p.isSpy).map((p: Player) => p.role);
    expect(new Set(secondRoles).size).toBe(secondRoles.length);
    expect(secondRoles).not.toEqual(firstRoles);
  });

  test('saves game data to localStorage', () => {
    const players = createPlayers(4);
    startGame(players, 1);
    expect(localStorage.getItem('location')).not.toBeNull();
    expect(localStorage.getItem('players')).not.toBeNull();
    expect(localStorage.getItem('selectedLocation')).not.toBeNull();
  });
});
