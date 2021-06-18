import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
  
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import PaginaLogada from "./pages/PaginaLogada";
import AddProduto from "./pages/PaginaLogada/AddProduto";
import Perfil from "./pages/PaginaLogada/Perfil";
import EditarPerfil from "./pages/PaginaLogada/EditarPerfil";
import EditarProduto from "./pages/PaginaLogada/EditarProduto";

import { AuthProvider } from "./context/AuthContext";
import useAuthContext from "./hook/useAuthContext";


function RotasProtegidas(props) {
    const { token } = useAuthContext();
  
    return (
      <Route
        render={() => (token ? props.children : <Redirect to="/" />)}
      />
    );
  }

function Rotas() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/cadastro" component={Cadastro} />

                    <RotasProtegidas>
                        <Route path="/produtos" exact component={PaginaLogada} />
                        <Route path="/produtos/novo" component={AddProduto} />
                        <Route path="/perfil" exact component={Perfil} />
                        <Route path="/perfil/editar" component={EditarPerfil} />
                        <Route path="/produto/:id/editar" component={EditarProduto} />
                    </RotasProtegidas>
                </Switch>
            </Router>
        </AuthProvider>
          
    )
}

export default Rotas;