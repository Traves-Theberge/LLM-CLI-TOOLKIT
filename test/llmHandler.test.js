import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { LLMHandler } from '../src/llmHandler.js';

describe('LLMHandler', () => {
  let llmHandler;

  beforeEach(() => {
    llmHandler = new LLMHandler();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Provider Selection', () => {
    it('should select OpenAI provider', () => {
      llmHandler.setProvider('openai');
      expect(llmHandler.currentProvider).toBe('openai');
    });

    it('should select Anthropic provider', () => {
      llmHandler.setProvider('anthropic');
      expect(llmHandler.currentProvider).toBe('anthropic');
    });
  });

  describe('Model Selection', () => {
    it('should set valid model for OpenAI', () => {
      llmHandler.setProvider('openai');
      llmHandler.setModel('gpt-4');
      expect(llmHandler.currentModel).toBe('gpt-4');
    });

    it('should reject invalid model', () => {
      llmHandler.setProvider('openai');
      expect(() => llmHandler.setModel('invalid-model')).toThrow();
    });
  });

  describe('Message Handling', () => {
    it('should format messages correctly', () => {
      const messages = llmHandler.formatMessages('Hello');
      expect(Array.isArray(messages)).toBe(true);
      expect(messages[0]).toHaveProperty('content', 'Hello');
    });

    it('should maintain conversation history', () => {
      llmHandler.addToHistory({ role: 'user', content: 'Hello' });
      expect(llmHandler.history).toHaveLength(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      // Mock API error
      jest.spyOn(llmHandler, 'sendRequest').mockRejectedValue(new Error('API Error'));
      
      await expect(llmHandler.sendMessage('Hello')).rejects.toThrow('API Error');
    });

    it('should handle rate limits', async () => {
      // Mock rate limit error
      jest.spyOn(llmHandler, 'sendRequest').mockRejectedValue(new Error('Rate limit exceeded'));
      
      await expect(llmHandler.sendMessage('Hello')).rejects.toThrow('Rate limit exceeded');
    });
  });

  describe('Demo Mode', () => {
    it('should return mock responses in demo mode', async () => {
      llmHandler.setDemoMode(true);
      const response = await llmHandler.sendMessage('Hello');
      expect(response).toBeDefined();
    });

    it('should simulate provider-specific responses', async () => {
      llmHandler.setDemoMode(true);
      llmHandler.setProvider('anthropic');
      const response = await llmHandler.sendMessage('Hello');
      expect(response).toContain('Claude');
    });
  });
});
