import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

process.env.API_BASE_URL = 'http://localhost:3000';
