import {Redirect, Route, Switch} from 'react-router-dom'
import BookItemDetails from './components/BookItemDetails'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import BookShelfs from './components/BookShelfs'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm}/>
    <ProtectedRoute exact path="/" component={Home}/>
    <ProtectedRoute exact path="/books/:id" component={BookItemDetails}/>
    <ProtectedRoute exact path="/shelf" component={BookShelfs}/>
    <ProtectedRoute exact path="/not-found" component={NotFound}/>
    <Redirect to="/not-found"/>
  </Switch>
)

export default App
