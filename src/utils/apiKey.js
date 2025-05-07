// src/utils/apiKey.js

const API_KEY_STORAGE_KEY = 'openai_api_key';

export const getAPIKey = () => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const setAPIKey = (apiKey) => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

export const removeAPIKey = () => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}; 