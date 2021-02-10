import post from './post';

export default ({path, data, headers}: Args) => {
	return post({path, data, headers, type: 'json'});
};
