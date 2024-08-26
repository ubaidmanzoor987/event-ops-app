import { faker } from '@faker-js/faker';

import image1 from '@/assets/png/image1.png';
import image2 from '@/assets/png/image2.png';
import image3 from '@/assets/png/image3.png';

const images = [image1, image2, image3];

import { IEvent } from './types';

export const generateMockEvents = (numTransactions: number): IEvent[] => {
  const events: IEvent[] = [];
  const descriptions = ['The Viper Room', 'The Wiltern', 'The Traoubadour!'];
  for (let i = 0; i < numTransactions; i++) {
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const date = new Date().toLocaleDateString('en-US');
    const image = images[Math.floor(Math.random() * images.length)];

    events.push({
      date: date,
      description: description,
      title: faker.person.firstName(),
      id: faker.string.uuid(),
      image,
    });
  }

  return events;
};
