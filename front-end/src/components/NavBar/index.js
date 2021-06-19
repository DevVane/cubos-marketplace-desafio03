import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
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
            
                <List className={classes.icones}>
                    
                    <Button color="primary"   onClick={() => history.push("/produtos") }>
                        <IconButton  >
                            <StorefrontIcon/>
                        </IconButton>
                    </Button>
                    <Button color="primary" onClick={() => { history.push("/perfil")}}>
                        <IconButton size="medium">
                            <AccountCircleIcon/>
                        </IconButton>
                    </Button>
                    <Button color="primary"   onClick={() => setToken(null)}>
                        <IconButton >
                            <CancelIcon />
                        </IconButton>
                    </Button>
                    
                </List>
                
            </Drawer>
        </div>
    );
}