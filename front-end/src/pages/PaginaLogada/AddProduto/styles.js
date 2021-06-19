import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content:{
    padding: '2rem',
  },
  toolbar:{
    display: 'grid',
    gap: '1.5rem',
  },
  form:{
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  ladoalado: {
    display: 'flex',
    gap: '1rem',
  },
  inputs:{
    display: 'grid',
    gap: '1rem',
  },
}));

export default useStyles;