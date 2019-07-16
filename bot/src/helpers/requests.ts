import crypto from 'crypto'
import request from 'request';

async function requestPromise(options) {
	return new Promise((resolve, reject) => {
		request(options, (err, res, data) => {
	        if (err) { reject(err); }
	        resolve(data);
	    })
	});
}

// Функция получения транзакций
export async function getTransactions(merchantAccount: string, dateBegin: number, dateEnd: number) {
	const hashStr = `${merchantAccount};${dateBegin};${dateEnd}`; // Строка для хеширования
	const merchantSignature = await crypto.createHash('md5').update(hashStr).digest('hex'); // MD5 хеш

	const data = await requestPromise({ // Получаем транзакции за последние сутки
		url: 'https://api.wayforpay.com/api',
		body: {
			transactionType: 'TRANSACTION_LIST',
			apiVersion: 1,
			merchantAccount,
			merchantSignature,
			dateBegin,
			dateEnd
		}, 
		json: true
	});
	console.dir(data);
	return data['transactionList'];
}

// Функция возврата денег
export async function refund(merchantAccount: string, orderReference: string, amount: number, comment: string = '') {
	const currency = 'UAH'; // Валюта возврата

	const hashStr = `${merchantAccount};${orderReference};${amount};${currency}`; // Строка для хеширования
	const merchantSignature = await crypto.createHash('md5').update(hashStr).digest('hex'); // MD5 хеш

	const data = await requestPromise({ // Получаем транзакции за последние сутки
		url: 'https://api.wayforpay.com/api',
		body: {
			transactionType: 'REFUND',
			apiVersion: 1,
			currency,
			merchantAccount,
			merchantSignature,
			orderReference,
			amount,
			comment
		}, 
		json: true
	});
	console.dir(data);
}
