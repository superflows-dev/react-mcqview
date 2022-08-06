import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { Col, Row, Container } from 'react-bootstrap';
import { QuestionSquare } from 'react-bootstrap-icons';
import { ButtonNext, VSpace } from 'react-ui-components-superflows';
import McqView from './McqView';

export const McqForm = (props) => {

    const [isComplete, setIsComplete] = useState(false);
    const [formData, setFormData] = useState(props.formData == null ? "[]" : props.formData.length === 0 ? "[]" : JSON.stringify(props.formData));

    function getFormData() {
        return JSON.parse(formData);
    }

    function setFormDataWrap(formData) {
        setFormData(JSON.stringify(formData));
    }

    useEffect(() => {
        scanForCompletion();
    }, [formData])

    useEffect(() => {
        if(isComplete) {
            const result = generateResult();
            if(props.onComplete != null) props.onComplete(result);
        }
    }, [isComplete])

    function generateResult() {

        let result = [];

        for(var i = 0; i < getFormData().length; i++) {

            if(getFormData()[i].condition == null) {

                result.push(getFormData()[i]);
                
            } else {
                if(getAnswer(getFormData()[i].condition.question).includes(getFormData()[i].condition.answer)) {
                    result.push(getFormData()[i]);
                }
            }

        }

        return result;

    }

    function scanForCompletion() {

        let isComplete = true;

        for(var i = 0; i < getFormData().length; i++) {

            if(getFormData()[i].condition == null) {

                if(getFormData()[i].selectedValue == null) {
                    //console.log('scanforcompletion null condition isComplete false');
                    isComplete = false;
                    break;
                }

                if(JSON.parse(getFormData()[i].selectedValue).length === 0) {
                    isComplete = false;
                    break;
                }
                
            } else {
                if(getAnswer(getFormData()[i].condition.question).includes(getFormData()[i].condition.answer)) {
                    if(getFormData()[i].selectedValue == null) {
                        isComplete = false;
                        break;
                    }
                    //console.log(getFormData()[i].selectedValue)
                    if(JSON.parse(getFormData()[i].selectedValue).length === 0) {
                        isComplete = false;
                        break;
                    }
                }
            }

        }

        setIsComplete(isComplete);
        //console.log('scan for completion', isComplete);
    }

    function updateSelectedValue(questionId, selectedValue) {

        let dataUpdated = [];

        for(var i = 0; i < getFormData().length; i++) {
            if(getFormData()[i].id === questionId) {
                let tempData = getFormData()[i];
                tempData.selectedValue = selectedValue;
                dataUpdated.push(tempData);
            } else {
                dataUpdated.push(getFormData()[i]);
            }
        }

        let dataSanitized = [];

        for(var i = 0; i < dataUpdated.length; i++) {

            if(dataUpdated[i].condition == null) {
                dataSanitized.push(dataUpdated[i]);
            } else {
                if(getAnswer(dataUpdated[i].condition.question).includes(dataUpdated[i].condition.answer)) {
                    dataSanitized.push(dataUpdated[i]);
                } else {
                    let tempData = dataUpdated[i];
                    tempData.selectedValue = '[]';
                    dataSanitized.push(tempData);
                }
            }

        }

        setFormDataWrap(dataSanitized);

    }

    function getAnswer(questionId) {

        let ret = [];

        for(var i = 0; i < getFormData().length; i++) {
            if(getFormData()[i].id === questionId) {
                //console.log('returning', getFormData()[i]);
                ret = getFormData()[i].selectedValue != null ? getFormData()[i].selectedValue : [];
            }
        }

        //console.log('returning answer', ret);

        return ret;
    }

    function onSubmit() {
        if(props.onSubmit != null) {
            const result = generateResult();
            props.onSubmit(result);
        }
    }

    return (

        <div 
        style={{
            position: 'relative'
        }}>

            {
                getFormData().map((item, i) => {

                    //console.log(item);

                    return (
                        
                        <div key={i}>

                            {item.condition == null && <div>
                                    <McqView 
                                        question={item.question}
                                        answers={item.answers}
                                        multiSelect={item.multiSelect}
                                        selectedValue={[]}
                                        setValue={(value) => {updateSelectedValue(item.id, value)}}
                                        onChange={() => {}} /> 

                                    <VSpace />
                                </div>
                            }

                            {item.condition != null && getAnswer(item.condition.question).includes(item.condition.answer) &&  <div>
                            
                                    <McqView 
                                        question={item.question}
                                        answers={item.answers}
                                        multiSelect={item.multiSelect}
                                        selectedValue={[]}
                                        setValue={(value) => {updateSelectedValue(item.id, value)}}
                                        onChange={() => {}} /> 
                                    
                                    <VSpace />

                                </div>    
                            }

                        </div>
                    );
                })
            }

            {props.showSubmit && isComplete && <div>

                <ButtonNext 
                    caption="Submit" 
                    disabled={false} 
                    onClick={() => {onSubmit()}}
                    icon="ArrowRight"
                    />
            </div>}

        </div>

    )
}

export default McqForm;
