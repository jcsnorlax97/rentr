const {
  mockRequest,
  mockResponse,
  mockNext,
} = require('../utils/expressMocker');
const validateReqQueryString = require('./validateReqQueryString');
const listingReqQueryStringSchema = require('../dto/listingReqQueryString');

test('should replace req.query with the JOI validation results if the validation on req.query is passing', () => {
  // GIVEN
  const req = mockRequest({
    query: {
      min_price: '100',
      max_price: 9999,
      is_laundry_available: true,
    },
  });
  const res = mockResponse();
  const next = mockNext(() => {});

  // WHEN
  validateReqQueryString(listingReqQueryStringSchema)(req, res, next);

  // THEN
  expect(req.query).toEqual(
    expect.objectContaining({
      min_price: 100,
      max_price: 9999,
      is_laundry_available: true,
      min_num_bathroom: null,
      max_num_bathroom: null,
      min_num_bedroom: null,
      max_num_bedroom: null,
      is_pet_allowed: null,
      is_parking_available: null,
    })
  );
  expect(next).toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
});

test('should send a 400 error status if the validation on req.query is failing due to invalid data type', () => {
  // GIVEN
  const req = mockRequest({
    query: {
      min_price: 'abc',
      max_price: 9999,
    },
  });
  const res = mockResponse();
  const next = mockNext(() => {
    res.status(400).json({ error: '"min_price" must be a number' });
  });

  // WHEN
  validateReqQueryString(listingReqQueryStringSchema)(req, res, next);

  // THEN
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledTimes(1);
});
