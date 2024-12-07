/**
 * @fileoverview Universal LLM handler that provides a unified interface for multiple LLM providers
 * This module handles the communication with different LLM providers through their respective APIs
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import MistralClient from '@mistralai/mistralai';
import { PROVIDER_CONFIGS, DEFAULT_PROVIDER, DEMO_RESPONSES, DEMO_MODE } from './constants.js';

/**
 * Get API key for the specified provider from environment variables
 * @param {string} provider - The LLM provider name
 * @returns {string} The API key
 * @throws {Error} If no API key is found for the provider
 */
function getApiKey(provider) {
    const config = PROVIDER_CONFIGS[provider];
    const apiKey = process.env[config.keyEnvVar] || '';
    if (!apiKey || apiKey.trim() === '') {
        throw new Error(`No API key found for ${provider}. Please check your .env file.`);
    }
    return apiKey;
}

async function handleMistralChat(messages, model = PROVIDER_CONFIGS.mistral.model) {
    const mistral = new MistralClient(getApiKey('mistral'));
    const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    const response = await mistral.chat({
        model: model,
        messages: formattedMessages
    });

    return response.choices[0].message.content;
}

/**
 * Universal function to call any supported LLM provider
 * @param {Object} params - The parameters for the LLM call
 * @param {Array<Object>} params.messages - List of message objects with 'role' and 'content'
 * @param {string} [params.provider='openai'] - The LLM provider to use
 * @param {string} [params.model] - Specific model to use
 * @param {string} [params.systemMessage] - System message for providers that support it
 * @param {number} [params.maxTokens] - Maximum tokens in the response
 * @param {Object} [params.additionalParams={}] - Any additional parameters specific to the provider
 * @returns {Promise<string>} The generated response
 * @throws {Error} If there's an error calling the LLM provider
 */
export async function oneFunctionToCallThemAll({
    messages,
    provider = DEFAULT_PROVIDER,
    model = null,
    systemMessage = null,
    maxTokens = null,
    additionalParams = {}
}) {
    if (DEMO_MODE) {
        // In demo mode, return mock responses
        const demoResponses = DEMO_RESPONSES[provider] || DEMO_RESPONSES.default;
        const responses = Array.isArray(demoResponses) ? demoResponses : [demoResponses];
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        // Simulate varying response times (300-1500ms)
        const delay = Math.floor(Math.random() * 1200) + 300;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return {
            content: response,
            provider: provider,
            model: `${provider}-demo`,
            demo: true
        };
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        throw new Error('Messages array is required and must not be empty');
    }

    const selectedModel = model || PROVIDER_CONFIGS[provider].model;

    try {
        let response;
        switch (provider) {
            case 'anthropic':
                const client = new Anthropic({ apiKey: getApiKey(provider) });
                
                // Convert messages to Anthropic format
                const messagesText = messages
                    .map(m => `${m.role}: ${m.content}`)
                    .join('\n\n');
                
                response = await client.messages.create({
                    model: selectedModel,
                    max_tokens: maxTokens || 8000,
                    system: systemMessage,
                    messages: [{ role: 'user', content: messagesText }],
                    ...additionalParams
                });
                response = response.content;
                break;

            case 'mistral':
                response = await handleMistralChat(messages, selectedModel);
                break;

            default:
                // Handle other providers using OpenAI client
                const openaiClient = new OpenAI({
                    apiKey: getApiKey(provider),
                    baseURL: PROVIDER_CONFIGS[provider].baseUrl
                });

                // Prepare parameters
                const params = {
                    model: selectedModel,
                    messages: systemMessage 
                        ? [{ role: 'system', content: systemMessage }, ...messages]
                        : messages,
                    ...(maxTokens && { max_tokens: maxTokens }),
                    ...additionalParams
                };
                
                const openaiResponse = await openaiClient.chat.completions.create(params);
                response = openaiResponse.choices[0].message.content;
        }

        return {
            content: response,
            provider: provider,
            model: selectedModel
        };
    } catch (error) {
        const errorMsg = `Error calling ${provider} LLM: ${error.message}`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
}

async function handleLLMRequest(provider, model, messages, isDemo = false) {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        throw new Error('Invalid messages array');
    }

    if (isDemo) {
        const demoResponses = DEMO_RESPONSES[provider] || DEMO_RESPONSES.default;
        const responses = Array.isArray(demoResponses) ? demoResponses : [demoResponses];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    try {
        const response = await oneFunctionToCallThemAll({
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            provider,
            model,
            demoMode: isDemo
        });

        if (!response) {
            throw new Error('No response received from the model');
        }

        // Handle different response formats
        if (typeof response === 'string') {
            return response;
        }
        
        if (response.content) {
            return response.content;
        }
        
        if (response.message && response.message.content) {
            return response.message.content;
        }

        throw new Error('Invalid response format from model');
    } catch (error) {
        console.error('LLM Request Error:', error);
        throw new Error(`Failed to get response: ${error.message}`);
    }
}

export { oneFunctionToCallThemAll, handleLLMRequest };
