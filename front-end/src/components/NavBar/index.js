import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import useAuthContext from '../../hook/useAuthContext';

export default function NavBar(){
    const classes = useStyles();
    const history = useHistory();
    const { setToken } = useAuthContext();
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
         
                <div className={classes.icones}>
                <IconButton  onClick={() => history.push("/produtos") }>
                    <StorefrontIcon fontSize="large" />
                </IconButton>
            
                <IconButton onClick={() =>  history.push("/perfil")}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            
                <IconButton onClick={() => setToken(null)}>
                    <CancelIcon fontSize="large"  />
                </IconButton>
                </div>
                
                
            </Drawer>
        </div>
    );
}