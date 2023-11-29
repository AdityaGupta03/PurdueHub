const request = require('supertest');
const { app } = require('../server');
const faqQueries = require('../database/queries/faqQueries'); // Update the path accordingly

describe('Testing getFaqs API:', () => {

  let consoleLogSpy, consoleErrSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it('should return 500 if getTop5Query fails', async () => {
    jest.spyOn(faqQueries, 'getTop5Query').mockReturnValue(null);

    const res = await request(app).get('/api/get_faqs');

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error.");
  });

  it('should return 200 and the top 5 FAQs', async () => {
    jest.spyOn(faqQueries, 'getTop5Query').mockReturnValue([
      { id: 1, question: 'Question 1', answer: 'Answer 1' },
      { id: 2, question: 'Question 2', answer: 'Answer 2' },
      { id: 3, question: 'Question 3', answer: 'Answer 3' },
      { id: 4, question: 'Question 4', answer: 'Answer 4' },
      { id: 5, question: 'Question 5', answer: 'Answer 5' },
    ]);

    const res = await request(app).get('/api/get_faqs');

    expect(res.statusCode).toEqual(200);
    expect(res.body.faq_arr).toHaveLength(5);
    expect(res.body.faq_arr[0].question).toEqual('Question 1');
  });

});