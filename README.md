# react-mcqview

> A customizable multiple choice question react component that is based on the superflows design language.

[![NPM](https://img.shields.io/npm/v/react-mcqview.svg)](https://www.npmjs.com/package/react-mcqview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img src="https://user-images.githubusercontent.com/108924653/181246806-95a0f71e-5b82-48c7-a213-20759df49fbb.png" width="300">

## Demo

[![Demo](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-sc1r3h?file=App.tsx)


## Note

This package is under active development. Expect frequent updates.

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
```

## Usage

```jsx

import React from 'react'
import { useState, useRef } from "react";
import { McqView } from 'react-mcqview'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  // Stores the stringified representation
  const [value, setValue] = useState('');

  function onChange(value) {
    console.log('value changed', value);
  }

  return (

    /*

      question: question text
      answers: array of answers, each element in the array contains answer text and id (value)
      multiselect: allow selecting multiple answers (default false)
      selectedValue: preselect answers
      setValue: callback function when value is set, setvalue returns a stringified representation of the selections
      onChange: callback function when value is changed, returns an array representations of the selections

    */

    <McqView 
      question="Do you love fried noodles?"
      answers={[
        {answer: "Yes", id: 1},
        {answer: "No", id: 2},
        {answer: "Can't Say", id: 3}
      ]}
      multiSelect={true}
      selectedValue={[1, 2]}
      setValue={setValue}
      onChange={onChange} />
  )
}

export default App


```

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
