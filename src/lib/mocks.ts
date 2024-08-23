import { faker } from '@faker-js/faker';
import { IEvent } from './types';

export const generateMockEvents = (numTransactions: number): IEvent[] => {
  const events: IEvent[] = [];
  const descriptions = ['The Viper Room', 'The Wiltern', 'The Traoubadour!'];
  for (let i = 0; i < numTransactions; i++) {
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const date = new Date().toLocaleDateString('en-US'); // Today's date in 'MM-DD-YYYY' format

    events.push({
      date: date,
      description: description,
      title: faker.person.fullName(),
      id: faker.string.uuid(),
    });
  }

  return events;
};
