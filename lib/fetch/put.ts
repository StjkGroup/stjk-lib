import {getQueryString, promise, reqGetBrace, reqPostBrace} from './request';

export default ({path, data, defaultQuery = true, headers, type}: Args) => {
	if(defaultQuery){
		return promise({
      url: path + (typeof data === 'object' ? getQueryString(data) : data || ''),
      options: reqGetBrace({method: 'PUT', headers}),
      type
    });
	}
	return promise({
    url: path,
    options: reqPostBrace({method: 'PUT', params: data, headers}),
    type
  });
};
