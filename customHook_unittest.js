
describe('useFetchMovieTrailer custom hook', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const mockMovieId = 'testMovieId';
  const mockTrailer = { key: 'testTrailerKey', type: 'Trailer' };
  const mockJsonData = { results: [mockTrailer, { type: 'Poster' }] };

  beforeEach(() => {
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(mockTrailer);
    jest.spyOn(require('../Constants/apiConstants'), 'movieVideoUrl').mockReturnValue('testUrl');
    jest.spyOn(require('../store/moviesSlice'), 'setMovieTrailer').mockReturnValue({ type: 'SET_MOVIE_TRAILER', payload: mockTrailer });
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => Promise.resolve(mockJsonData) });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and dispatch the movie trailer if it is not already available', () => {
    const { default: useFetchMovieTrailer } = require('./customHook');
    useFetchMovieTrailer(mockMovieId);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_MOVIE_TRAILER', payload: mockTrailer });
  });

  it('should not fetch the movie trailer if it is already available', () => {
    const { default: useFetchMovieTrailer } = require('./customHook');
    useFetchMovieTrailer(mockMovieId);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
