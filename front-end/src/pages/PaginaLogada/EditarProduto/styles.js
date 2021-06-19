import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content:{
    padding: '2rem',
  },
  toolbar:{
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  ladoalado: {
    display: 'flex',
    gap: '0.75rem',
  },
  inputs:{
    display: 'grid',
    gap: '1rem',
  },
  media: {
    marginLeft: '7rem',
    height: '20rem',
    borderRadius: 30,
  },
}));

export default useStyles;