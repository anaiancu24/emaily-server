import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom';

const FIELDS = [
    { label: 'Survey Title', name:'title'},
    { label: 'Subject Line', name:'subject'},
    { label: 'Email Body', name:'body'},
    { label: 'Recipients List', name:'emails'},

]

class SurveyForm extends Component {

    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return <Field component={SurveyField} type="text" label={label} name={name} />
        })
    }

    render() {
        return (
            <div style={{ width: '50%', margin: '0 auto' }}>
                <h3>Create a new Survey</h3>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Done
                        <i className="material-icons right">done</i>
                        </button>
                </form>
            </div>
        )
    }
}


function validate(values) {
    const errors = {}

    _.each(FIELDS, ({ name }) => {
        if(!values[name]) {
            errors[name] = "You must provide a value"
        }
    })

    return errors;

}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);