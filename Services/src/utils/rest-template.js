/***********************************************************************************************************************
Purpose of this template is to allow rest api call via nodejs and express js.
 **********************************************************************************************************************/
'use strict';
const http = require('http');

/**
 *
 * @param options
 * {
        host: 'localhost',
        port: '3000',
        path: '/contentHistory/createContentHistory',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }
 * @param body
 * JSON object that will be append to the request body.
 * @returns {Promise}
 */
module.exports = function(options, body) {
    return new Promise((resolve, reject) => {
        const request = http.request(options, response => {
            response.setEncoding('utf8');

            let responseString = '';

            response.on('data', data => {
                responseString += data;
            });

            response.on('end', () => {
                try {
                    resolve({
                        statusCode: response.statusCode,
                        headers: response.headers,
                        data: JSON.parse(responseString)
                    });
                } catch(error) {
                    reject(error);
                }
            });
        });

        request.on('error', error => {
            reject(error);
        });

        if (body && options.method !== 'GET') {
            request.write(JSON.stringify(body));
        }

        request.end();
    });
};