import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#434343',
    borderBottomRightRadius: 30,
    
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  icones:{
    display: 'grid',
    gap: '1.5rem',
    placeContent: 'center'
  }
}));


export default useStyles;