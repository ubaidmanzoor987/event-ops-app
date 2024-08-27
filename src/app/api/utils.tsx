import { faker } from '@faker-js/faker';

export interface IMockEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

const imagePaths = [
  '/assets/png/image1.png',
  '/assets/png/image2.png',
  '/assets/png/image3.png',
];

export const generateMockEvents = (numTransactions: number): IMockEvent[] => {
  const events: IMockEvent[] = [];
  const descriptions = ['The Viper Room', 'The Wiltern', 'The Troubadour!'];

  for (let i = 0; i < numTransactions; i++) {
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const date = new Date().toLocaleDateString('en-US');
    const image = imagePaths[Math.floor(Math.random() * imagePaths.length)];

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

export function formatFileSize(bytes: number): string {
  const units = ['bytes', 'KB', 'MB', 'GB'];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
}
