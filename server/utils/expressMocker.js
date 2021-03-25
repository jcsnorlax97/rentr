// Ref: https://tekloon.dev/unit-test-joi-schema-validation --> source codes

// Mock Express Request so req.body can be called
const mockRequest = (args) => ({
  query: args.query,
});

// Mock Express Response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn((value) => value);
  return res;
};

// Mock Express Next
const mockNext = (next) => jest.fn(next());

module.exports = { mockRequest, mockResponse, mockNext };
