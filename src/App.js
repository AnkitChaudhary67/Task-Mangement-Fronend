import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Header from './components/Headers/Header';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import Register from './pages/Register/Register'
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import AddUser from './pages/AddUser/AddUser';
import UserList from './pages/User/userList';
import Category from './pages/Category/category';
import AddCategory from './pages/Category/addCategory';
import EditCategory from './pages/Category/editCategory';
import Tasks from './pages/Tasks/task';
import AddTask from './pages/Tasks/addTask';
import UpdateTask from './pages/Tasks/editTask';

function App() {
  return (
   <>
  <Header/>
   <Routes>
    <Route path='/' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/userList' element={<UserList/>} />
    <Route path='/addUser' element={<AddUser/>} />
    <Route path='/edit' element={<Edit/>} />
    <Route path='/category' element={<Category/>} />
    <Route path='/addCategory' element={<AddCategory/>} />
    <Route path='/editCategory/:id' element={<EditCategory/>} />
    <Route path='/tasks' element={<Tasks/>} />
    <Route path='/addTask' element={<AddTask/>} />
    <Route path='/editTask/:id' element={<UpdateTask/>} />
   </Routes>
   </>
  );
}

export default App;
