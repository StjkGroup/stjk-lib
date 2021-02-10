import put from './put';

export default ({path, data, defaultQuery = true, headers}: Args) => {
	return put({path, data, defaultQuery, headers, type: 'json'});
};
