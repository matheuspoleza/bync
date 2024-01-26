const texts = [
  'What is the current balance in my checking account?',
  'Please provide me with the balance of my savings account',
  'Where can I find the balance of my checking account?',
  'Can you tell me the current balance of my credit card?',
  'I want to know the balance in my savings account',
  'How much money do I have in my account?',
  'What is the balance of my current account?',
];

const createItems = (count: number) =>
  Array.from({ length: count + 1 }).map((_, index) => ({ title: texts[index % texts.length] }));

export const shortList = createItems(6);

export const longList = createItems(500);
