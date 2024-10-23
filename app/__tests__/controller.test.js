/**
 * @jest-environment jsdom
 */
import { describe, jest } from '@jest/globals';
import { searchTracks, favoritos } from "../controllers/controller";
import myCache from '../mocks/myCache';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'fake data' }),
  })
);


describe('searchTracks', () => {
  test('Debe devolver error si no está el parámetro "name"', async () => {
    const req = {
      query: {},
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await searchTracks(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El parámetro de búsqueda es requerido' });
  })

  test('Debe devolver los datos desde cache si existen', async () => {

    jest.mock('../mocks/myCache', () => ({
      get: jest.fn(),
      set: jest.fn(),
    }));

    const req = {
      query: { name: 'coldplay' },
    };
    const res = {
      json: jest.fn()
    };

    myCache.get.mockReturnValueOnce([{ cancion_id: 1, nombre_tema: 'Fix You' }]);

    await searchTracks(req, res);

    expect(res.json).toHaveBeenCalledWith({
      data: [{ cancion_id: 1, nombre_tema: 'Fix You' }],
      source: 'cache'
    });
  });
})

// describe('favoritos', () => {

// })