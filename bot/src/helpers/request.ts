import request from 'request';

async function requestPromise(options) {
	return new Promise((resolve, reject) => {
		request(options, (err, res, data) => {
	        if (err) { reject(err); }
	        resolve(data);
	    })
	});
}

export default requestPromise;