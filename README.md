# react-mcqview

> A customizable multiple choice question react component that is based on the superflows design language.

[![NPM](https://img.shields.io/npm/v/react-mcqview.svg)](https://www.npmjs.com/package/react-mcqview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img src="https://user-images.githubusercontent.com/108924653/183233791-39af139c-6c31-499b-9894-5bf29228b254.png" width="300">


## Install

```bash
npm install --save react-mcqview
```
Install the dependencies.

## Dependencies

```bash
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-bootstrap-icons
npm install --save react-ui-components-superflows
```


# Functionality

This package allows you to easily create customizable multiple choice question forms in React. You can either choose a single question component, which is called **McqView**, or a complete form **McqForm**. This package also allows conditional rendering, wherein certain questions are displayed based on the answer of previous questions.


<a href="https://youtu.be/OvaKSdIJvV4"><img src="https://user-images.githubusercontent.com/108924653/183233791-39af139c-6c31-499b-9894-5bf29228b254.png" width="300"/></a>

# Components

## McqView - a multiple choice question component

### Props

- question: text of the question
- answers: array of answers, every answer needs to have text, id
- multiSelect: allow selecting multiple answers
- selectedValue: array of answer ids, used to prepopulate answers
- setValue: function to be called when value is set
- onChange: function to be called when value is changed

### Demo

[![Demo](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-sc1r3h?file=App.tsx)


### Usage

```jsx

import React from 'react';
import { useState, useRef } from 'react';
import { McqView } from 'react-mcqview';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Stores the stringified representation
  const [value, setValue] = useState('');

  function onChange(value) {
    console.log('value changed', value);
  }

  return (
    <McqView
      question="Do you love fried noodles?"
      answers={[
        { answer: 'Yes', id: 1 },
        { answer: 'No', id: 2 },
        { answer: "Can't Say", id: 3 },
      ]}
      multiSelect={true}
      selectedValue={[1, 2]}
      setValue={setValue}
      onChange={onChange}
    />
  );
};

export default App;


```

## McqForm - a multiple choice question form component

### Props

- formData: data of questions in json array format
- onComplete: callback after the form is completely filled
- showSubmit: show submit button
- onSubmit: callback after submit button clicked (applicable on when showSubmit is set as true)

### Formdata

A sample formdata is show below in the usage section. Form data is an array of question data. Each question data contains the following
- id of the question (you will have to specify that)
- text of the questions
- possible list of answers to the question, each answer needs to have its own id
- a flag to allow selecting multiple answers for that question
- display condition, if the question depends on some answer(s) of any of the previous questions


### Demo

[![Demo](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-zngqnz?file=App.tsx)


### Usage

```jsx

import React from 'react'
import { useState, useRef } from "react";
import { Col, Row, Container } from 'react-bootstrap';
import { McqForm } from 'react-mcqview'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  // Stores the stringified representation
  const [value, setValue] = useState('');

  function onSubmit(values) {
    console.log('form submitted changed', values);
  }

  const data = [
    {
      id: 1,
      question: "Do you love fried noodles?",
      answers: [
        {answer: "Yes", id: 1},
        {answer: "No", id: 2},
        {answer: "Can't Say", id: 3}
      ],
      multiSelect: true
    },
    {
      id: 2,
      condition: {
        question: 1, answer: [2]
      },
      question: "Okay, then do you love fried rice?",
      answers: [
        {answer: "Yes", id: 1},
        {answer: "No", id: 2},
        {answer: "Can't Say", id: 3}
      ],
      multiSelect: true
    },
    {
      id: 3,
      condition: {
        question: 2, answer: [2]
      },
      question: "What about chicken soup?",
      answers: [
        {answer: "I love it!", id: 1},
        {answer: "Next, please", id: 2},
      ],
      multiSelect: true
    }
  
  ]

  return  ( 
  
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6}>
          <McqForm 
            formData={data}
            onComplete={(result) => {console.log('result', result);}}
            showSubmit={true}
            onSubmit={(result) => {console.log('onsubmit result', result);}} />
        </Col>
      </Row>
    </Container>

  )
  
}

export default App

```


# Tests

PASS src/index.test.js (15.952s)
- ✓ McqView: Render of McqView without preselected values (39ms)
- ✓ McqView: Render of McqView with preselected values (7ms)
- ✓ McqView: Select answer (multiselect) (1019ms)
- ✓ McqView: Select answer (singleselect) (2017ms)
- ✓ McqView: Unselect answer 1 (multiselect) (2017ms)
- ✓ McqView: Unselect answer 2 (multiselect) (2013ms)
- ✓ McqView: Unselect answers 1 (singleselect) (2018ms)
- ✓ McqView: Unselect answers 1 (singleselect) (2019ms)
- ✓ McqForm: Basic Render (11ms)
- ✓ McqForm: Complete without conditionals (1021ms)
- ✓ McqForm: Render conditionals (2037ms)

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    93.86 |    86.49 |       92 |     93.2 |                   |
 src            |        0 |        0 |        0 |        0 |                   |
  index.js      |        0 |        0 |        0 |        0 |                   |
 src/components |    93.86 |    86.49 |       92 |     93.2 |                   |
  McqForm.js    |    91.55 |    86.36 |     87.5 |    90.77 |... 46,147,148,206 |
  McqView.js    |    97.67 |    86.67 |      100 |    97.37 |                82 |
----------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        16.743s
Ran all test suites.

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
