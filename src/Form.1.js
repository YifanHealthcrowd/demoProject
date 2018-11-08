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
    this.setState({ activeStep:0 , currentUserRole: '', name:'', onSubmitValues:[...this.state.onSubmitValues,{name:this.state.name, role: this.state.currentUserRole}]},()=>{console.log("this is the new state in call back",this.state);this.render();})
    console.log("this is the new state",this.state)
    
  }

  updateErrorSteps = (field, errorSteps) => {
    this.setState({ errorSteps })
  }


  handleNameChange = name => event => {
    console.log("name event ",event, typeof(event));
    this.setState({ [name]: event.target.value});
  };

  handleRoleChange = name => event => {
    console.log("role event ", event, typeof(event));
    this.setState({ currentUserRole: event.target.value});
  };

  render() {
    const steps = getSteps()
    const { activeStep, errorSteps } = this.state

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={0}
        //wrap="nowrap"
        
      >
        <Grid item xs={8} alignItems='center' > 
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
                  value={this.state.name}
                  required
                  fullWidth
                  onChange={this.handleNameChange('name')}
                  style={{width:'60%'}}
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
                      value={this.state.currentUserRole}
                      //value='testrole'
                      required
                      margin="normal"
                      onChange={this.handleRoleChange('role')}
                      fullWidth
                      style={{width:'60%'}}
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
        <Grid item xs={8} className={gridItem}>
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
