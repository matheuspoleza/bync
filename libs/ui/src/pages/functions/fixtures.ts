const description =
  'Map the ‘Credit_core’ variable to whatever variable you want to contain the users credit score. You can then use this variable in your output steps to notify the user what their current credit score is.';

const variableFixture1 = {
  children: [
    {
      type: 'variable',
      children: [{ text: '' }],
      variableID: 'id3',
      variableVariant: 'variable',
      iconName: 'EditS',
    },
  ],
};

const variableFixture2 = {
  children: [
    {
      type: 'variable',
      children: [{ text: '' }],
      variableID: 'id5',
      variableVariant: 'variable',
      iconName: 'EditS',
    },
  ],
};

const variableFixture3 = {
  type: 'variable',
  children: [{ text: '' }],
  variableID: 'id2',
  variableVariant: 'variable',
  iconName: 'EditS',
};

export const filledInputVariableMapping = [
  {
    mapFrom: [variableFixture1],
    mapTo: [variableFixture2],
    description,
  },
  {
    mapFrom: [
      {
        children: [
          {
            text: 'This is a long text node that should overflow',
          },
        ],
      },
    ],
    mapTo: [
      {
        children: [
          {
            text: '',
          },
          variableFixture3,
          {
            text: '',
          },
        ],
      },
    ],
    description,
  },
];

export const filledInputVariableMappingWithErrors = [
  filledInputVariableMapping[0],
  {
    ...filledInputVariableMapping[1],
    error: true,
  },
];

export const unfilledInputVariableMapping = [
  {
    mapFrom: [{ children: [{ text: '' }] }],
    mapTo: [
      {
        children: [variableFixture3],
      },
    ],
    description,
  },
];

export const outputVariableMappingFilled = [
  {
    mapFrom: [
      {
        children: [
          {
            type: 'variable',
            children: [{ text: '' }],
            variableID: 'id6',
            variableVariant: 'variable',
            iconName: 'EditS',
          },
        ],
      },
    ],
    mapTo: [
      {
        children: [
          {
            type: 'variable',
            children: [{ text: '' }],
            variableID: 'id1',
            variableVariant: 'variable',
            iconName: 'EditS',
          },
        ],
      },
    ],
    description,
  },
  {
    mapFrom: [
      {
        children: [
          {
            type: 'variable',
            children: [{ text: '' }],
            variableID: 'id4',
            variableVariant: 'variable',
            iconName: 'EditS',
          },
        ],
      },
    ],
    mapTo: [variableFixture2],
    description,
  },
];

export const outputVariableMappingunFilled = [
  {
    mapFrom: [{ children: [{ text: '' }] }],
    mapTo: [
      {
        children: [variableFixture3],
      },
    ],
    description,
  },
];

export const outputVariableMappingFilledWithVariables = [
  {
    mapFrom: [
      {
        children: [
          {
            text: 'Your id is',
          },
          {
            type: 'variable',
            children: [{ text: '' }],
            variableID: 'id3',
            variableVariant: 'variable',
            iconName: 'EditS',
          },
        ],
      },
    ],
    mapTo: [
      {
        children: [variableFixture3],
      },
    ],
    description,
  },
];

export const stressTest = new Array(40).fill(null).map(() => {
  return {
    mapFrom: [variableFixture1],
    mapTo: [
      {
        children: [variableFixture3],
      },
    ],
    description,
  };
});
