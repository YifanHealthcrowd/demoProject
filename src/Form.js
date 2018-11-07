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
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    activeStep: 0,
    roles: [true], // hack
    onSubmitValues: null,
    errorSteps: [],
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

  addrole = () => {
    const roles = _.clone(this.state.roles)
    roles.push(true)
    this.setState({ roles })
  }

  submit = (values, pristineValues) => {
    // eslint-disable-next-line no-console
    console.log('submit values:', values, 'pristine values:', pristineValues)
    this.setState({ onSubmitValues: values })
  }

  updateErrorSteps = (field, errorSteps) => {
    this.setState({ errorSteps })
  }

  render() {
    const steps = getSteps()
    const { classes } = this.props
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
                  value=""
                  required
                  fullWidth
                />
                <Divider style={dividerStyle} />
                <Button variant="raised" onClick={this.clickNext}>
                  Next
                </Button>
              </Fragment>
            }

            {activeStep === 1 &&
              <Fragment>
                {this.state.roles.map((role, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={role + i}>
                    <TextField
                      select
                      label="role"
                      helperText="Choose your role"
                      name={`roles[${i}]`}
                      value=""
                      required
                      margin="normal"
                      fullWidth
                    >
                      <MenuItem value="CTO">CTO</MenuItem>
                      <MenuItem value="full stack developer">Full stack Developer</MenuItem>
                      <MenuItem value="front end developer">Front End Developer</MenuItem>
                      <MenuItem value="back end developer">Back End Developer</MenuItem>
                      <MenuItem value="data engineer">Data Engineer</MenuItem>
                    </TextField>
                    <Divider style={dividerStyle} />
                  </Fragment>
                ))}
                <Button variant="raised" onClick={this.addrole}>Add role</Button>
                <Button variant="raised" onClick={this.clickBack}>Back</Button>
                <Button variant="raised" type="submit">Submit</Button>
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
