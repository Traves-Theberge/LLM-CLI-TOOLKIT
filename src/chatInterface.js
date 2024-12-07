import readline from 'readline';
import chalk from 'chalk';
import gradient from 'gradient-string';
import boxen from 'boxen';
import { PROVIDERS, THEMES, DEFAULT_PROVIDER, DEMO_MODE } from './constants.js';
import { oneFunctionToCallThemAll, handleLLMRequest } from './llmHandler.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PROVIDER_COLORS = {
    openai: ['#74aa9c', '#2a9d8f'],
    anthropic: ['#a663cc', '#8b5cf6'],
    openrouter: ['#3b82f6', '#1d4ed8'],
    groq: ['#f59e0b', '#d97706'],
    grok: ['#10b981', '#059669'],
    mistral: ['#ec4899', '#db2777']
};

// Enhanced themes with gradients and powerline segments
const THEMES = {
    openai: {
        name: 'OpenAI',
        gradient: gradient(['#00A67E', '#00D4A4']),
        primary: chalk.hex('#00A67E'),
        secondary: chalk.hex('#00D4A4'),
        segments: {
            ai: '🤖',
            user: '👤',
            info: 'ℹ️',
            error: '❌',
            prompt: '',
            arrow: '',
            model: '',
            git: '',
            success: '',
            warn: '',
            clock: '',
            folder: '',
            python: '',
            node: '',
            powerline: {
                separator: '',
                separatorThin: ''
            }
        }
    },
    anthropic: {
        name: 'Anthropic',
        gradient: gradient(['#5436DA', '#9D86FF']),
        primary: chalk.hex('#5436DA'),
        secondary: chalk.hex('#9D86FF'),
        segments: {
            ai: '🤖',
            user: '👤',
            info: 'ℹ️',
            error: '❌',
            prompt: '',
            arrow: '',
            model: '',
            git: '',
            success: '',
            warn: '',
            clock: '',
            folder: '',
            python: '',
            node: '',
            powerline: {
                separator: '',
                separatorThin: ''
            }
        }
    },
    openrouter: {
        name: 'OpenRouter',
        gradient: gradient(['#FF6B6B', '#FFB4B4']),
        primary: chalk.hex('#FF6B6B'),
        secondary: chalk.hex('#FFB4B4'),
        segments: {
            ai: '🤖',
            user: '👤',
            info: 'ℹ️',
            error: '❌',
            prompt: '',
            arrow: '',
            model: '',
            git: '',
            success: '',
            warn: '',
            clock: '',
            folder: '',
            python: '',
            node: '',
            powerline: {
                separator: '',
                separatorThin: ''
            }
        }
    },
    groq: {
        name: 'Groq',
        gradient: gradient(['#00B4D8', '#90E0EF']),
        primary: chalk.hex('#00B4D8'),
        secondary: chalk.hex('#90E0EF'),
        segments: {
            ai: '🤖',
            user: '👤',
            info: 'ℹ️',
            error: '❌',
            prompt: '',
            arrow: '',
            model: '',
            git: '',
            success: '',
            warn: '',
            clock: '',
            folder: '',
            python: '',
            node: '',
            powerline: {
                separator: '',
                separatorThin: ''
            }
        }
    },
    grok: {
        name: 'Grok',
        gradient: gradient(['#FF4081', '#FF80AB']),
        primary: chalk.hex('#FF4081'),
        secondary: chalk.hex('#FF80AB'),
        segments: {
            ai: '🤖',
            user: '👤',
            info: 'ℹ️',
            error: '❌',
            prompt: '',
            arrow: '',
            model: '',
            git: '',
            success: '',
            warn: '',
            clock: '',
            folder: '',
            python: '',
            node: '',
            powerline: {
                separator: '',
                separatorThin: ''
            }
        }
    },
    mistral: {
        name: 'Mistral',
        gradient: gradient(['#6C63FF', '#B2B0FF']),
        primary: chalk.hex('#6C63FF'),
        secondary: chalk.hex('#B2B0FF'),
        segments: {
            ai: '🤖',
            user: '👤',
            info: 'ℹ️',
            error: '❌',
            prompt: '',
            arrow: '',
            model: '',
            git: '',
            success: '',
            warn: '',
            clock: '',
            folder: '',
            python: '',
            node: '',
            powerline: {
                separator: '',
                separatorThin: ''
            }
        }
    }
};

function drawPowerlinePrompt(theme, segments) {
    return segments.map((segment, index) => {
        const { text, background, foreground } = segment;
        const nextSegment = segments[index + 1];
        const separator = theme.segments.powerline.separator;
        
        let result = chalk.bgHex(background).hex(foreground)(` ${text} `);
        if (nextSegment) {
            result += chalk.bgHex(nextSegment.background).hex(background)(separator);
        } else {
            result += chalk.hex(background)(separator);
        }
        return result;
    }).join('');
}

function drawBox(content, options = {}) {
    return boxen(content, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
        ...options
    });
}

function drawModelSelection(theme, model, isDefault = false) {
    const modelIcon = theme.segments.model;
    const modelText = isDefault ? 
        theme.secondary(`${model}`) + theme.secondary(' (default)') :
        theme.secondary(model);
    
    return boxen(`${modelIcon} ${modelText}`, {
        padding: 0,
        margin: 0,
        borderStyle: 'single',
        borderColor: theme.name.toLowerCase(),
        dimBorder: true
    });
}

async function getUserInput(prompt = '') {
    return new Promise((resolve) => {
        const inputPrompt = prompt || chalk.cyan('\n> ');
        rl.question(inputPrompt, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function selectProvider() {
    console.log('\n🌟 Multi-Provider Chat Interface\n');
    console.log('Select your AI provider:\n');

    const providers = Object.entries(PROVIDERS).map(([key, provider], index) => ({
        key,
        name: provider.name,
        index: index + 1
    }));

    providers.forEach(({ index, name }) => {
        console.log(chalk.cyan(`${index}. `) + `🤖 ${name}`);
    });

    console.log('\nEnter provider name or number: \n');
    const choice = await getUserInput('> ');

    if (!choice) {
        return DEFAULT_PROVIDER;
    }

    // Try to match by number
    const numChoice = parseInt(choice);
    if (!isNaN(numChoice)) {
        const provider = providers.find(p => p.index === numChoice);
        if (provider) {
            return provider.key;
        }
    }

    // Try to match by name (case-insensitive)
    const nameChoice = choice.toLowerCase();
    const provider = providers.find(p => 
        p.key.toLowerCase() === nameChoice || 
        p.name.toLowerCase() === nameChoice
    );
    
    if (provider) {
        return provider.key;
    }

    console.log(chalk.yellow('\nℹ️ Invalid selection. Using default provider.'));
    return DEFAULT_PROVIDER;
}

async function displayModelSelection(provider) {
    const theme = THEMES[provider];
    const providerInfo = PROVIDERS[provider];
    const models = Object.entries(providerInfo.models).map(([id, info]) => ({
        id,
        ...info
    }));
    const defaultModel = models.find(m => m.default)?.id || models[0].id;
    
    const header = theme.gradient(`\n${theme.segments.ai} ${providerInfo.name} Models`);
    console.log(header);
    console.log(chalk.gray('Select a model or press Enter for default:\n'));
    
    models.forEach((model, index) => {
        const isDefault = model.default || (index === 0 && !models.some(m => m.default));
        console.log(
            chalk.cyan(`${index + 1}. `) +
            theme.gradient(`${model.id}`) +
            (isDefault ? chalk.gray(' (default)') : '') +
            '\n' + chalk.gray(`   ${model.description}`) +
            (model.context ? chalk.gray(` - ${model.context.toLocaleString()} tokens`) : '') +
            '\n'
        );
    });
    
    const choice = await getUserInput();
    
    if (!choice) {
        return defaultModel;
    }

    const index = parseInt(choice) - 1;
    if (index >= 0 && index < models.length) {
        return models[index].id;
    }
    
    console.log(chalk.yellow(`\n${theme.segments.info} Invalid selection. Using default model.`));
    return defaultModel;
}

async function chatSession() {
    console.log(chalk.cyan('\n🌟 Welcome to OFCA - One Function to Call them All'));
    console.log(chalk.yellow('⚡ JavaScript Edition') + chalk.gray(' v1.0.0\n'));
    
    const BOX_WIDTH = 62;  // Set consistent width for all boxes
    
    if (DEMO_MODE) {
        const demoBox = boxen(
            chalk.yellow(`${THEMES.openai.segments.info} Demo Mode Active`) + '\n' +
            chalk.gray('Responses are simulated for demonstration'),
            { 
                borderStyle: 'round',
                borderColor: 'yellow',
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 2,
                    right: 2
                },
                textAlignment: 'center',
                width: BOX_WIDTH,
                dimBorder: true
            }
        );
        console.log(demoBox);
    }

    const commandsBox = boxen(
        chalk.cyan('Available Commands:\n\n') +
        [
            ['--switch', 'Switch to a different AI provider'],
            ['--model', 'Select a different model for current provider'],
            ['--exit', 'End chat session']
        ].map(([cmd, desc]) => 
            `${chalk.yellow(cmd.padEnd(10))} ${chalk.gray(desc)}`
        ).join('\n'),
        { 
            borderStyle: 'round',
            borderColor: 'cyan',
            padding: {
                top: 1,
                bottom: 1,
                left: 2,
                right: 2
            },
            width: BOX_WIDTH
        }
    );
    console.log(commandsBox);

    let currentProvider = await selectProvider();
    let currentModel = await displayModelSelection(currentProvider);
    let messages = [];
    let theme = THEMES[currentProvider];

    const handleCommand = async (command) => {
        if (!command) return false;
        
        switch (command.toLowerCase()) {
            case '--switch':
                currentProvider = await selectProvider();
                currentModel = await displayModelSelection(currentProvider);
                theme = THEMES[currentProvider];
                return true;
            case '--model':
                currentModel = await displayModelSelection(currentProvider);
                return true;
            case '--exit':
                console.log(chalk.cyan('\nThanks for using OFCA! Goodbye! 👋\n'));
                rl.close();
                process.exit(0);
            default:
                return false;
        }
    };

    while (true) {
        const timestamp = new Date().toLocaleTimeString();
        const promptSegments = [
            { text: timestamp, background: '#2E3440', foreground: '#D8DEE9' },
            { text: '🤖 You', background: '#3B4252', foreground: '#88C0D0' },
            { text: currentModel, background: '#434C5E', foreground: '#8FBCBB' }
        ];
        
        const prompt = drawPowerlinePrompt(theme, promptSegments) + ' ';
        const userInput = await getUserInput(prompt);

        if (!userInput || !userInput.trim()) {
            continue;
        }

        if (await handleCommand(userInput)) {
            continue;
        }

        // Initialize messages array if undefined
        if (!messages) {
            messages = [];
        }

        messages.push({ role: 'user', content: userInput });

        try {
            const assistantSegments = [
                { text: timestamp, background: '#2E3440', foreground: '#D8DEE9' },
                { text: '🤖 Assistant', background: '#3B4252', foreground: '#A3BE8C' },
                { text: currentModel, background: '#434C5E', foreground: '#8FBCBB' }
            ];
            console.log(drawPowerlinePrompt(theme, assistantSegments));

            const response = await handleLLMRequest(currentProvider, currentModel, messages, DEMO_MODE);
            if (response) {
                console.log(response + '\n');
                messages.push({ role: 'assistant', content: response });
            } else {
                throw new Error('No response received from the model');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const errorBox = boxen(
                chalk.red(`❌ Error: ${error.message}`),
                { 
                    borderStyle: 'round',
                    borderColor: 'red',
                    padding: 1,
                    width: BOX_WIDTH + 10
                }
            );
            console.log(errorBox);
            // Don't add failed responses to message history
            messages.pop();
        }
    }
}

export default chatSession;
