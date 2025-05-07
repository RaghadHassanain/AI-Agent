import { getAPIKey } from '../utils/apiKey';

const API_URL = 'https://api.openai.com/v1';

const openAIService = {
  async chat(messages) {
    const apiKey = getAPIKey();
    if (!apiKey) {
      throw new Error('API key not found. Please set your OpenAI API key in settings.');
    }

    try {
      const response = await fetch(`${API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  },

  async transcribeAudio(audioFile) {
    const apiKey = getAPIKey();
    if (!apiKey) {
      throw new Error('API key not found. Please set your OpenAI API key in settings.');
    }

    try {
      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', 'whisper-1');

      const response = await fetch(`${API_URL}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to transcribe audio');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('OpenAI Transcription Error:', error);
      throw error;
    }
  }
};

export default openAIService; 