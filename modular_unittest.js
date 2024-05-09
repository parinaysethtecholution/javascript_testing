
// modular.test.js

import { returnChats, returnTaskChats, returnCity, returnWeatherDetails } from './modular';

describe('returnChats function', () => {
  it('should return an array of chat objects with the correct properties', () => {
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

    const expectedResult = [
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
    ];

    expect(returnChats(chatData)).toEqual(expectedResult);
  });
});

describe('returnTaskChats function', () => {
  it('should return an array of task chat objects with the correct properties', () => {
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

    const expectedResult = [
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
    ];

    expect(returnTaskChats(taskChatData)).toEqual(expectedResult);
  });
});

describe('returnCity function', () => {
  it('should return the city name from a string', () => {
    const cityString = '"Paris"';
    expect(returnCity(cityString)).toBe('Paris');
  });

  it('should return null if the city name is not found in the string', () => {
    const noCity = 'The weather is nice today.';
    expect(returnCity(noCity)).toBeNull();
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

    const expectedResult = [
      { key: 'temperature', value: 25 },
      { key: 'humidity', value: 60 },
      { key: 'windSpeed', value: 10 },
      { key: 'precipitation', value: 0 }
    ];

    expect(returnWeatherDetails(weatherData)).toEqual(expectedResult);
  });

  it('should exclude properties with a value of 0', () => {
    const weatherData = {
      temperature: 25,
      humidity: 60,
      windSpeed: 10,
      precipitation: 0
    };

    const expectedResult = [
      { key: 'temperature', value: 25 },
      { key: 'humidity', value: 60 },
      { key: 'windSpeed', value: 10 }
    ];

    expect(returnWeatherDetails(weatherData)).toEqual(expectedResult);
  });
});
