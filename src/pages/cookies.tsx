/**
 * Create by fay on 4/22/20 2:48 上午
 */
import React from "react";
import {getUser, setUser, removeUser} from '@/../lib/user';

const App = () => {

  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const user = getUser();
    if(user){
      setName(user.name);
      setTimeout(() => {
        removeUser();
        console.log(getUser());
      }, 10*1000);
    }else{
      setName('');
      setUser({name: 'fay'});
    }
  }, []);

  return (
    <h3 style={{textAlign: 'center', marginTop: '100px'}}>用户名：${name}</h3>
  )
}

export default App;
