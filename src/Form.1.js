import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import Form from './formComponent/BasicForm'
import _ from 'lodash'

const styles = () => ({
  form: {
    borderTop: '1px dotted #ccc',
  },
  gridItem: {
    margin: '100px',
    '& pre': {
      color: '#999',
      fontSize: '15px',
    },
  },
})

const dividerStyle = { margin: '20px 0' }

const gridItem = {
  margin: '100px',
  '& pre': {
    color: '#999',
    fontSize: '15px',
  },
}

function getSteps() {
  return [
    'Insert Name',
    'Insert Role',
  ]
}

// @withStyles(styles)
export default class Steppers extends Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.state = {
      activeStep: 0,
      roles: [true], // hack
      onSubmitValues: [],
      errorSteps: [],
      name:'',
      currentUserRole:''
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }


  clickNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    })
  }

  clickBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  }


  submit = (values, pristineValues) => {
    // eslint-disable-next-line no-console
    console.log(`name is ${values.name} and the role is ${typeof(values.roles)}`)
    console.log('submit values:', values, 'pristine values:', pristineValues)
    console.log("this is the old state",this.state)
    this.setState({ activeStep:0 , currentUserRole: '', name:'', onSubmitValues:[...this.state.onSubmitValues,{name:this.state.name}]},()=>{console.log("this is the new state in call back",this.state)})
    console.log("this is the new state",this.state)
    this.render();
  }

  updateErrorSteps = (field, errorSteps) => {
    this.setState({ errorSteps })
  }


  handleNameChange = event => {
    console.log("name event ",event, typeof(event));
    this.setState({ name: event});
  };

  handleRoleChange = event => {
    console.log("role event ", event, typeof(event));
    this.setState({ currentUserRole: event});
  };

  render() {
    const steps = getSteps()
    const { activeStep, errorSteps } = this.state

    return (
      <Grid
        container
        direction="row"
        wrap="nowrap"
        
      >
        <Grid item xs className={gridItem}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, i) => (
              <Step key={label}>
                <StepLabel error={errorSteps.includes(i)}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Form
            activeStep={activeStep}
            onSubmit={this.submit}
            // onFieldValidation={this.updateErrorSteps}
          >
            {activeStep === 0 &&
              <Fragment>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  //value='testname'
                  required
                  fullWidth
                  onChange={this.handleNameChange}
                />
                <Divider style={dividerStyle} />
                <Button variant="outlined" color="primary" onClick={this.clickNext} >
                  Next
                </Button>
              </Fragment>
            }

            {activeStep === 1 &&
              <Fragment>
                    <TextField
                      select
                      label="role"
                      helperText="Choose your role"
                      name="role"
                      value={this.state.currentUserRole}
                      //value='testrole'
                      required
                      margin="normal"
                      onChange={this.handleChange}

                    >
                      <MenuItem value="CTO" onChange={this.handleChange}>CTO</MenuItem>
                      <MenuItem value="full stack developer" onChange={this.handleChange}>Full stack Developer</MenuItem>
                      <MenuItem value="front end developer" onChange={this.handleChange}>Front End Developer</MenuItem>
                      <MenuItem value="back end developer" onChange={this.handleChange}>Back End Developer</MenuItem>
                      <MenuItem value="data engineer" onChange={this.handleChange}>Data Engineer</MenuItem>
                    </TextField>
                    <Divider style={dividerStyle} />
                
                <Button variant="outlined" color="primary" onClick={this.clickBack}>Back</Button>
                <Button variant="outlined" color="primary" type="submit">Submit</Button>
              </Fragment>
            }
          </Form>
        </Grid>
        <Grid item xs className={gridItem}>
          <pre>
            {this.state.onSubmitValues &&
              JSON.stringify(this.state.onSubmitValues, null, 2)
            }
          </pre>
        </Grid>
      </Grid>
    )
  }
}
