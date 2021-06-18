import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cards:{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  flex:{
    display: 'flex',
    justifyContent: 'space-between',

  }
}));

export default useStyles;