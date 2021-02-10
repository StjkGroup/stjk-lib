import {getQueryString, promise, reqGetBrace} from './request';

export default ({path, data, cache, headers, type}: Args) => {
	return promise({
    url: path + (typeof data === 'object' ? getQueryString(data) : data || ''),
    options: reqGetBrace({method: 'GET', cache, headers}),
    type
  });
};
