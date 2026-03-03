import { fetchGraphQL } from './fetchGraphQL';
import '@testing-library/jest-dom';

global.fetch = jest.fn();

describe('fetchGraphQL', () => {
  const mockQuery = 'query { test }';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data on a successful request', async () => {
    const mockData = { data: { user: { id: '1', name: 'Hello my G' } } };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchGraphQL(mockQuery);

    expect(result).toEqual(mockData.data);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ query: mockQuery, variables: undefined }),
      }),
    );
  });

  it('should throw a "Network error" when res.ok is false', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchGraphQL(mockQuery)).rejects.toThrow('Network error');
  });

  it('should throw a GraphQL error message if the API returns errors', async () => {
    const mockErrorResponse = {
      errors: [{ message: 'Unauthorized access' }],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockErrorResponse,
    });

    await expect(fetchGraphQL(mockQuery)).rejects.toThrow('Unauthorized access');
  });
});
