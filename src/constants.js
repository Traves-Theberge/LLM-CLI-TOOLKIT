/**
 * @fileoverview Constants and configuration for the LLM chat interface
 * This module contains all the configuration settings and constants used
 * throughout the application, including API keys, model defaults, and base URLs.
 */

import dotenv from 'dotenv';
dotenv.config();

// API configuration
export const API_KEYS = {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    openrouter: process.env.OPENROUTER_API_KEY,
    groq: process.env.GROQ_API_KEY,
    grok: process.env.GROK_API_KEY,
    mistral: process.env.MISTRAL_API_KEY
};

// Providers
export const PROVIDERS = {
    openai: {
        name: 'OpenAI',
        models: {
            'gpt-4-1106-preview': {
                description: 'Most capable GPT-4 model, better at following instructions',
                context: 128000,
                default: true
            },
            'gpt-4': {
                description: 'More reliable, creative, and capable of detailed instructions',
                context: 8192
            },
            'gpt-3.5-turbo': {
                description: 'Fastest and most cost-effective for most tasks',
                context: 16385
            }
        }
    },
    anthropic: {
        name: 'Anthropic',
        models: {
            'claude-2.1': {
                description: 'Most capable Claude model, best for complex tasks',
                context: 200000,
                default: true
            },
            'claude-instant-1.2': {
                description: 'Faster and more cost-effective for simple tasks',
                context: 100000
            }
        }
    },
    openrouter: {
        name: 'OpenRouter',
        models: {
            'google/gemini-pro': {
                description: 'Google\'s most capable model for text generation',
                context: 32000,
                default: true
            },
            'meta-llama/llama-2-70b-chat': {
                description: 'Open source model with strong capabilities',
                context: 4096
            }
        }
    },
    groq: {
        name: 'Groq',
        models: {
            'mixtral-8x7b-32768': {
                description: 'Fast inference Mixtral model with extended context',
                context: 32768,
                default: true
            },
            'llama2-70b-4096': {
                description: 'Fast inference Llama 2 model',
                context: 4096
            }
        }
    },
    grok: {
        name: 'Grok',
        models: {
            'grok-1': {
                description: 'Latest Grok model with real-time knowledge',
                context: 8192,
                default: true
            }
        }
    },
    mistral: {
        name: 'Mistral',
        models: {
            'mistral-large-latest': {
                description: 'Most capable Mistral model',
                context: 32768,
                default: true
            },
            'mistral-medium-latest': {
                description: 'Balanced performance and efficiency',
                context: 32768
            },
            'mistral-small-latest': {
                description: 'Fast and cost-effective',
                context: 32768
            }
        }
    }
};

// Default provider
export const DEFAULT_PROVIDER = 'openai';

// Provider configurations
export const PROVIDER_CONFIGS = {
    openai: {
        requiresKey: true,
        keyEnvVar: 'OPENAI_API_KEY',
        baseUrl: 'https://api.openai.com/v1'
    },
    anthropic: {
        requiresKey: true,
        keyEnvVar: 'ANTHROPIC_API_KEY',
        baseUrl: 'https://api.anthropic.com/v1'
    },
    openrouter: {
        requiresKey: true,
        keyEnvVar: 'OPENROUTER_API_KEY',
        baseUrl: 'https://openrouter.ai/api/v1'
    },
    groq: {
        requiresKey: true,
        keyEnvVar: 'GROQ_API_KEY',
        baseUrl: 'https://api.groq.com/v1'
    },
    grok: {
        requiresKey: true,
        keyEnvVar: 'GROK_API_KEY',
        baseUrl: 'https://api.grok.x.ai/v1'
    },
    mistral: {
        requiresKey: true,
        keyEnvVar: 'MISTRAL_API_KEY',
        baseUrl: 'https://api.mistral.ai/v1'
    }
};

// Demo mode configuration
export const DEMO_MODE = process.argv.includes('--demo');

// Demo mode responses
export const DEMO_RESPONSES = {
    default: [
        "This is a demo response. In actual usage, this would be a response from the AI model.",
        "Demo mode is active. The actual response would come from the selected AI provider.",
        "This is a simulated response for demonstration purposes.",
    ],
    openai: [
        "Hello! This is a simulated GPT response.",
        "In actual usage, this would be processed by OpenAI's API.",
    ],
    anthropic: [
        "Hello! I'm simulating a Claude response.",
        "This is a demo of how Claude would respond.",
    ],
    openrouter: [
        "Simulated response from OpenRouter.",
        "This demonstrates OpenRouter's functionality.",
    ],
    groq: [
        "This is a simulated Groq response.",
        "In actual usage, Groq's API would process this.",
    ],
    grok: [
        "Simulated Grok response here.",
        "This shows how Grok would respond.",
    ],
    mistral: [
        "This is a simulated Mistral response.",
        "Demonstrating Mistral's capabilities in demo mode.",
    ]
};
