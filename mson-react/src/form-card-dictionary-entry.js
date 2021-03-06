import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Component from './component';
import attach from './attach';
import FormCardButtons from './form-card-buttons';

const styles = theme => ({
  paper: {
    margin: '5px', //theme.spacing.unit,
    padding: '0px' //theme.spacing.unit * 2
  },
  content: {
    flex: 1,
    cursor: 'pointer'
  }
});

// Use PureComponent so that we avoid unnecessary re-rendering
class FormCard extends React.PureComponent {
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.component);
    }
  };

  handleEdit = (event, id) => {
    if (this.props.onEdit) {
      this.props.onEdit(event, this.props.component);
    }
  };

  handleDelete = event => {
    // this.handleMoreClose();
    if (this.props.onDelete) {
      this.props.onDelete(this.props.component);
    }
  };

  /** Added by JG */
  // go to the single contact edit form
  // This will have to be moved at some point
  // Right now, it is just a proof of concept
  handleSinglePageEdit(e) {
    console.log('singlePageEdit button clicked');

    /**
     *  This redirect works, but should the user push the back button, all they get is a
     *  blank screen. Something to do with react-router most likely.
     *  The redirect really needs to be done according to MSONs defined
     *  way of doing things
     */
    window.location.href =
      'http://localhost:3000/mson-react/contact/edit?id=' + this.props.value.id;
  }

  render() {
    const {
      classes,
      component,
      forbidUpdate,
      forbidDelete,
      editable,
      disabled,
      value
    } = this.props;

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap">
            <Grid
              item
              className={classes.content}
              onClick={event => this.handleClick(event)}
            >
              <Component component={component} formTag={false} mode="read" />
              {/* <div>
                Good afternoon. This is a message from our soon-to-be customized
                FormCard component
              </div> */}
            </Grid>
            <FormCardButtons
              forbidUpdate={forbidUpdate}
              forbidDelete={forbidDelete}
              editable={editable}
              disabled={disabled}
              archivedAt={value.archivedAt}
              onEdit={event => this.handleEdit(event)}
              onDelete={event => this.handleDelete(event)}
              onSinglePageEdit={event => this.handleSinglePageEdit(event)}
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

FormCard = withStyles(styles)(FormCard);
export default attach(['value'])(FormCard);
