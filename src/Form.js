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
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';


import Form from './formComponent/BasicForm'
import _ from 'lodash'


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


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

const tableStyle = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


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

function getEditSteps() {
  return [
    'Edit Name',
    'Edit Role',
  ]
}


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const buttonStyles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


// @withStyles(styles)
export default class Steppers extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.state = {
      activeStep: 0,
      onSubmitValues: [],
      errorSteps: [],
      name: '',
      currentUserRole: '',
      tagIndex: 0,
      editName: '',
      editCurrentUserRole: ''
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
    console.log(`name is ${values.name} and the role is ${typeof (values.roles)}`)
    console.log('submit values:', values, 'pristine values:', pristineValues)
    console.log("this is the old state", this.state)
    this.setState({ activeStep: 0, currentUserRole: '', name: '', onSubmitValues: [...this.state.onSubmitValues, { name: this.state.name, role: this.state.currentUserRole }] }, () => { console.log("this is the new state in call back", this.state); this.render(); })
    console.log("this is the new state", this.state)

  }

  updateErrorSteps = (field, errorSteps) => {
    this.setState({ errorSteps })
  }


  handleNameChange = name => event => {
    console.log("name event ", event, typeof (event));
    this.setState({ [name]: event.target.value });
  };

  handleRoleChange = name => event => {
    console.log("role event ", event, typeof (event));
    this.setState({ currentUserRole: event.target.value });
  };

  handleChangeTab = (event, value) => {
    console.log("tab change", event, value)
    this.setState({ tagIndex: value });
  };

  handleChangeIndex = index => {
    this.setState({ tagIndex: index });
  };



  render() {
    const steps = getSteps()
    const editSteps = getEditSteps()
    const { activeStep, errorSteps } = this.state

    return (
      <Fragment>
        <AppBar position="static" color="default" >
          <Tabs
            value={this.state.tagIndex}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Add" />
            <Tab label="Edit" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={'x'}
          index={this.state.tagIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={'x'}>
            <Typography variant="h4" gutterBottom>
              Add Record
            </Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={0}
            >
              <Grid item xs={8} alignItems='center' >
                <Stepper activeStep={activeStep} alternativeLabel style={{width:"40%",padding:'auto', margin:'auto'}}>
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
                        style={{ width: '60%' }}
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
                        style={{ width: '60%' }}
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

            </Grid>
          </TabContainer>



          <TabContainer dir={'x'}>
            <Typography variant="h4" gutterBottom>
              Edit Record
            </Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={0}
            >
              <Grid item xs={8} alignItems='center' >
                <Stepper activeStep={activeStep} alternativeLabel style={{width:"40%",padding:'auto', margin:'auto'}}>
                  {editSteps.map((label, i) => (
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
                        style={{ width: '60%' }}
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
                        style={{ width: '60%' }}
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

            </Grid>
          </TabContainer>
        </SwipeableViews>
        <Divider style={dividerStyle} />
        <Typography variant="h4" gutterBottom>
          Existing Records
        </Typography>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={0}
        >
          {/* <Grid item xs={8} className={gridItem}>
                  <pre>
                    {this.state.onSubmitValues &&
                      JSON.stringify(this.state.onSubmitValues, null, 2)
                    }
                  </pre>
          </Grid> */}

          <Grid item xs={6} className={gridItem}>
            <Paper className={tableStyle.root}>
              <Table className={tableStyle.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Name</CustomTableCell>
                    <CustomTableCell >Role</CustomTableCell>
                    <CustomTableCell >Operations</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.onSubmitValues.map(record => {
                    return (
                      <TableRow className={tableStyle.row} key={record.name}>
                        <CustomTableCell component="th" scope="row">
                          {record.name}
                        </CustomTableCell>
                        <CustomTableCell component="th" scope="row">
                          {record.role}
                        </CustomTableCell>
                        <CustomTableCell >
                          <Button variant="contained" color="secondary" size="small" className={buttonStyles.button} >
                            Delete
                            <DeleteIcon className={buttonStyles.rightIcon} />
                          </Button>
                          <Button variant="contained" color="primary" size="small" className={buttonStyles.button} style={{ marginLeft: 40 }}>
                            Edit
                            <EditIcon className={buttonStyles.rightIcon}>send</EditIcon>
                          </Button>
                        </CustomTableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>

    )
  }
}
