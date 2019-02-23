import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleCancel = () => {
    this.handleClose();
    let { onCancel } = this.props;
    onCancel && onCancel();
  };
  handleSure = () => {
    this.handleClose();
    let { onSure } = this.props;
    onSure && onSure();
  };
  show = () => {
    this.setState({ open: true });
  };

  render() {
    const { title, content, sureText, cancelText } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color='primary'>
              {cancelText ? cancelText : 'Cancel'}
            </Button>
            <Button onClick={this.handleSure} color='secondary'>
              {sureText ? sureText : 'Sure'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
