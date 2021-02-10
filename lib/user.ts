/**
 * Created by feichongzheng on 17/9/28.
 */
import cookies from './cookie';

const baseOption = {
  path: '/'
};

const setUser = (value:object, rememberTime?:number) => {
  const opt = rememberTime ? {...baseOption,
    maxAge: rememberTime,
    expires: new Date(new Date().getTime() + rememberTime * 1000)
  } : baseOption;
  cookies.set('current-user', value, opt);
};

const removeUser = () => {
  const opt = {...baseOption,
    maxAge: -1,
    expires: new Date(new Date().getTime() + -1 * 1000)
  };
  cookies.remove('current-user', opt);
};

const getUser = () => {
  return cookies.get('current-user');
}

export { getUser, setUser, removeUser };
