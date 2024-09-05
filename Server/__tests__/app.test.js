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
    test('sum two positive numbers 1,3', () => {
        expect(app.sum(1,3)).toBe(4);
    });
});

describe('makeString', () =>{
    test('making string 15', () => {
        expect(app.makeString(15)).toBe('15');
    });
    test('making string -1', () => {
        expect(app.makeString(-1)).toBe('-1');
    });
});


describe('POST /baba', () => {
    test("check status code 200 & id", async () =>{
        const data = { id: '37'};
        const res = await request(app).post('/baba').send(data);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        expect(res.body.id).toBe('37');
    });
});

describe('PUT /baba/put', () => {
    test("Valid input: status 200 & id", async () =>{
        const data = { name: 'Yaniv', msg: "Welcome from me"};
        const res = await request(app).put('/baba').send(data);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.text).toBe('Hello Yaniv!, Welcome from me');
    });
    test("Invalid input: status 400, error msg missing fields", async () => {
        const data = {}; //empty data
        const res = await request(app).put('/baba/put').send(data);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Missing required field');
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

