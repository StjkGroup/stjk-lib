import {promise, reqPostBrace} from './request';

export default ({path, data, headers, type}: Args) => {
	return promise({
    url: path,
    options: reqPostBrace({method: 'POST', params: data, headers}),
    type
  });
};
