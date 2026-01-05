import { jest } from '@jest/globals';

export const mockRequest = (data ={}) => {
    return {
        body: data.body || {},
        params: data.params || {},
        query: data.query || {},
        headers: data.query || {},
    };
};

export const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};