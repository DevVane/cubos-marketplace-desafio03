import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '1rem',
  },
  inputs:{
    display: 'flex',
    flexDirection: 'column',
  }
}));

export default useStyles;