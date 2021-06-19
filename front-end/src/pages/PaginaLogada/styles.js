import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content:{
    padding: '1.5rem',
  },
  toolbar:{
    display: 'grid',
    gap: '1.5rem',
  },
  card: {
    maxWidth: 233,
    borderRadius: 10,
  },
  media: {
    height: 240,
    paddingTop: '56.25%', // 16:9
  },
  cards:{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem', 
    marginBottom: '1rem',
  },
  flex:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  button:{
    marginTop: '1rem',
  },
  deletar:{
    backgroundColor: '#FF505F',
    borderRadius: '50%',
    position: 'absolute',
  }
}));

export default useStyles;