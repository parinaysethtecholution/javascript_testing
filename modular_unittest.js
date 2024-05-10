
// modular.test.js

import { returnChats, returnTaskChats, returnCity, returnWeatherDetails } from './modular';

describe('returnChats function', () => {
  it('should return an array of chat objects', () => {
    const chatData = {
      chat1: {
        id: 1,
        question: 'What is the capital of France?',
        response: 'The capital of France is Paris.',
        timeStamp: '2023-04-15T10:30:00Z'
      },
      chat2: {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'The largest ocean in the world is the Pacific Ocean.',
        timeStamp: '2023-04-16T14:45:00Z'
      }
    };

    const result = returnChats(chatData);
    expect(result).toEqual([
      {
        id: 1,
        question: 'What is the capital of France?',
        response: 'The capital of France is Paris.',
        timeStamp: '2023-04-15T10:30:00Z'
      },
      {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'The largest ocean in the world is the Pacific Ocean.',
        timeStamp: '2023-04-16T14:45:00Z'
      }
    ]);
  });
});

describe('returnTaskChats function', () => {
  it('should return an array of task chat objects', () => {
    const taskChatData = {
      chat1: {
        id: 1,
        question: 'What is the capital of France?',
        response: 'The capital of France is Paris.',
        taskCreated: '2023-04-15T10:30:00Z'
      },
      chat2: {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'The largest ocean in the world is the Pacific Ocean.',
        taskCreated: '2023-04-16T14:45:00Z'
      }
    };

    const result = returnTaskChats(taskChatData);
    expect(result).toEqual([
      {
        id: 1,
        question: 'What is the capital of France?',
        response: 'The capital of France is Paris.',
        taskCreated: '2023-04-15T10:30:00Z'
      },
      {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'The largest ocean in the world is the Pacific Ocean.',
        taskCreated: '2023-04-16T14:45:00Z'
      }
    ]);
  });
});

describe('returnCity function', () => {
  it('should return the city name from a string', () => {
    const str1 = 'The weather in "New York" is sunny.';
    const str2 = 'The temperature in London is 20 degrees.';
    const str3 = 'It is raining in Paris.';

    expect(returnCity(str1)).toBe('New York');
    expect(returnCity(str2)).toBe('London');
    expect(returnCity(str3)).toBe('Paris');
  });

  it('should return null if no city name is found', () => {
    const str = 'The weather is nice today.';
    expect(returnCity(str)).toBeNull();
  });
});

describe('returnWeatherDetails function', () => {
  it('should return an array of weather details', () => {
    const weatherData = {
      temperature: 25,
      humidity: 60,
      windSpeed: 10,
      precipitation: 0
    };

    const result = returnWeatherDetails(weatherData);
    expect(result).toEqual([
      { key: 'temperature', value: 25 },
      { key: 'humidity', value: 60 },
      { key: 'windSpeed', value: 10 },
      { key: 'precipitation', value: 0 }
    ]);
  });

  it('should exclude properties with falsy values', () => {
    const weatherData = {
      temperature: 25,
      humidity: 0,
      windSpeed: 10,
      precipitation: null
    };

    const result = returnWeatherDetails(weatherData);
    expect(result).toEqual([
      { key: 'temperature', value: 25 },
      { key: 'windSpeed', value: 10 }
    ]);
  });
});
