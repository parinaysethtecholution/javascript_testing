
// modular.test.js

import { returnChats, returnTaskChats, returnCity, returnWeatherDetails } from './modular';

describe('returnChats function', () => {
  it('should return an array of chat objects with the correct properties', () => {
    const chatData = {
      chat1: {
        id: 1,
        question: 'What is the capital of France?',
        response: 'Paris',
        timeStamp: '2023-04-15T10:30:00'
      },
      chat2: {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'Pacific Ocean',
        timeStamp: '2023-04-16T14:45:00'
      }
    };

    const result = returnChats(chatData);
    expect(result).toEqual([
      {
        id: 1,
        question: 'What is the capital of France?',
        response: 'Paris',
        timeStamp: '2023-04-15T10:30:00'
      },
      {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'Pacific Ocean',
        timeStamp: '2023-04-16T14:45:00'
      }
    ]);
  });
});

describe('returnTaskChats function', () => {
  it('should return an array of task chat objects with the correct properties', () => {
    const taskChatData = {
      chat1: {
        id: 1,
        question: 'What is the deadline for the project?',
        response: 'The deadline is June 30th',
        taskCreated: '2023-04-15T10:30:00'
      },
      chat2: {
        id: 2,
        question: 'Can you clarify the requirements for the task?',
        response: 'The requirements are as follows...',
        taskCreated: '2023-04-16T14:45:00'
      }
    };

    const result = returnTaskChats(taskChatData);
    expect(result).toEqual([
      {
        id: 1,
        question: 'What is the deadline for the project?',
        response: 'The deadline is June 30th',
        taskCreated: '2023-04-15T10:30:00'
      },
      {
        id: 2,
        question: 'Can you clarify the requirements for the task?',
        response: 'The requirements are as follows...',
        taskCreated: '2023-04-16T14:45:00'
      }
    ]);
  });
});

describe('returnCity function', () => {
  it('should return the city name from a string', () => {
    const cityString = '"New York"';
    const result = returnCity(cityString);
    expect(result).toBe('New York');
  });

  it('should return null if the city name is not found in the string', () => {
    const noCity = 'This is a string without a city name';
    const result = returnCity(noCity);
    expect(result).toBeNull();
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
