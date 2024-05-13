
// modular.test.js

import { returnChats, returnTaskChats, returnCity, returnWeatherDetails } from './modular';

describe('returnChats function', () => {
  it('should return an array of chat objects with the correct properties', () => {
    const chatData = {
      chat1: {
        id: 1,
        question: 'What is the capital of France?',
        response: 'The capital of France is Paris.',
        timeStamp: '2023-04-15T12:34:56Z'
      },
      chat2: {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'The largest ocean in the world is the Pacific Ocean.',
        timeStamp: '2023-04-16T09:12:34Z'
      }
    };

    const result = returnChats(chatData);
    expect(result).toEqual([
      {
        id: 1,
        question: 'What is the capital of France?',
        response: 'The capital of France is Paris.',
        timeStamp: '2023-04-15T12:34:56Z'
      },
      {
        id: 2,
        question: 'What is the largest ocean in the world?',
        response: 'The largest ocean in the world is the Pacific Ocean.',
        timeStamp: '2023-04-16T09:12:34Z'
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
        response: 'The deadline for the project is June 30th.',
        taskCreated: '2023-04-15T12:34:56Z'
      },
      chat2: {
        id: 2,
        question: 'Can you provide an update on the progress?',
        response: 'The project is on track and progressing well.',
        taskCreated: '2023-04-16T09:12:34Z'
      }
    };

    const result = returnTaskChats(taskChatData);
    expect(result).toEqual([
      {
        id: 1,
        question: 'What is the deadline for the project?',
        response: 'The deadline for the project is June 30th.',
        taskCreated: '2023-04-15T12:34:56Z'
      },
      {
        id: 2,
        question: 'Can you provide an update on the progress?',
        response: 'The project is on track and progressing well.',
        taskCreated: '2023-04-16T09:12:34Z'
      }
    ]);
  });
});

describe('returnCity function', () => {
  it('should return the city name from a string', () => {
    const str1 = 'The weather in "New York" is sunny.';
    const str2 = 'The temperature in London is 20 degrees.';
    const str3 = 'It's a beautiful day in the city.';

    expect(returnCity(str1)).toBe('New York');
    expect(returnCity(str2)).toBe('London');
    expect(returnCity(str3)).toBeNull();
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
});
