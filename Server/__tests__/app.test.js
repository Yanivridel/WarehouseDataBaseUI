const request = require('supertest');
const app = require('./../server.js'); // Adjust this path to point to your Express app

describe('GET /data', () => {
    it('should respond with JSON data', async () => {
        const response = await request(app).get('/data');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        
        // expect(response.body.token).toBeDefined();

    });

    it('should respond with status code 200', async () => {
        const response = await request(app).get('/data');
        expect(response.statusCode).toBe(200);
    });
    
});


describe('add', () => {
    test('return success', () => {
        expect(app.add()).toBe('success');
    });
});

describe('sum', () => {
    test('sum two positive numbers', () => {
        expect(app.sum(1,3)).toBe(4);
    });
});

describe('makeString', () =>{
    test('making string', () => {
        expect(app.makeString(15)).toBe('15');
    });
});

describe('makeString', () =>{
    test('making string', () => {
        expect(app.makeString(-1)).toBe('-1');
    });
});



// // describe('POST /data', () => {
// //     it('should respond with a successful message', async () => {
// //         const mockData = { key: 'value' };
// //         const response = await request(app)
// //             .post('/data')
// //             .send(mockData);
// //         expect(response.statusCode).toBe(200);
// //         expect(response.body.message).toBe('Data successfully sent via Axios, and Selenium task completed');
//     });
// });

