import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { Col, Row, Container } from 'react-bootstrap';
import { QuestionSquare } from 'react-bootstrap-icons';

export const McqView = (props) => {

  const [enableDelete, setEnableDelete] = useState(false);
  const [value, setValue] = useState(props.selectedValue == null ? "[]" : props.selectedValue.length === 0 ? "[]" : JSON.stringify(props.selectedValue));

  useEffect(() => {
    if(props.setValue != null) props.setValue(value);
    if(props.onChange != null) props.onChange(value);
  }, [value])

  function processMultiList(index) {
    //console.log('multilist', index);
    var jsonVal = JSON.parse(value)
    //console.log('jsonVal', jsonVal);
    //console.log('props answers', props.answers[index].id);

    if(jsonVal.includes(props.answers[index].id)) {

      if(!enableDelete) {
        setEnableDelete(true);
        setTimeout(() => {setEnableDelete(false)}, 5000);
      } else {
        var tempArr = [];
        for(var i = 0; i < jsonVal.length; i++) {
          if(jsonVal[i] === props.answers[index].id) {
            // do nothing
          } else {
            tempArr.push(jsonVal[i])
          }
        }
        setValue(JSON.stringify(tempArr));
        setEnableDelete(false)
      }

      
    } else {
      jsonVal.push(props.answers[index].id)
      setValue(JSON.stringify(jsonVal));
    }
  }

  function processSingleList(index) {

    var jsonVal = JSON.parse(value);
    //console.log('process single', jsonVal.includes(props.answers[index].id), enableDelete);
    if(jsonVal.includes(props.answers[index].id)) {

      if(!enableDelete) {
        setEnableDelete(true);
        setTimeout(() => {setEnableDelete(false)}, 5000);
      } else {
        var newVal = [];
        setValue(JSON.stringify(newVal));
        setEnableDelete(false)
      }

    } else {
      var newVal = [];
      newVal.push(props.answers[index].id)
      setValue(JSON.stringify(newVal));
    }

    
  }

  function onClick(index) {

    //console.log("clicked", index, props.multiSelect);

    if(props.multiSelect != null) {
      if(props.multiSelect) {
        processMultiList(index);
      } else {
        processSingleList(index);
      }
    } else {
      processSingleList(index);
    }


  }

  return (

    <Container className="w-100 border rounded-3 bg-white border-secondary" >
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={12} xxl={12} className={`d-flex flex-wrap align-items-center p-2`} >
          <QuestionSquare className='me-3 ms-2'/>
          <div className='pe-3 flex-grow-1'>
              {
                  props.question
              }
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={12} xxl={12} className={`d-flex flex-wrap align-items-center px-2 text-muted`} >
          <QuestionSquare className='me-3 ms-2' style={{visibility: 'hidden'}}/>
          <div className='d-flex flex-grow-1 text-small justify-content-end'>
            <small>
              {
                props.multiSelect ? "Choose one or more" : "Choose one"
              }
            </small>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={12} xxl={12} className={`d-flex flex-wrap align-items-center p-2 text-secondary`} >
          <div className='w-100 d-flex flex-grow-1 border-0 justify-content-end align-items-center flex-wrap' >
            {
              props.answers.map((item, i) => {
                //console.log(item);
                return (
                  <div 
                    key={i}
                    onClick={() => {onClick(i)}}
                    className="px-2 py-1 border rounded ms-2" 
                    style={{
                        fontSize: '90%',
                        cursor: 'pointer',
                        backgroundColor: JSON.parse(value).includes(item.id)  ? 'gray' : 'transparent',
                        color: JSON.parse(value).includes(item.id) ? 'white' : 'gray',
                    }}>
                    {item.answer}
                  </div>
                );
              })
            }
          </div>
          {enableDelete && <div className='w-100 d-flex flex-grow-1 border-0 justify-content-end align-items-center flex-wrap' >
            <small style={{color: '#aaaaaa'}}>Click again to unselect</small>
          </div>}
        </Col>
      </Row>
    </Container>

  )
}

export default McqView;