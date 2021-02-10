import remove from './remove';

export default ({path, data, headers}: Args) => {
	return remove({path, data, headers, type: 'json'});
};
