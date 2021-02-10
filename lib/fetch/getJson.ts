import get from './get';

export default ({path, data, cache, headers}: Args) => {
	return get({path, data, cache, headers, type: 'json'});
};
