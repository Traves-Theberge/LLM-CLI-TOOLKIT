import chatSession from './chatInterface.js';

// Set demo mode if --demo flag is present
process.env.DEMO_MODE = process.argv.includes('--demo');

try {
    await chatSession();
} catch (error) {
    console.error('\nUnexpected error:', error.message);
} finally {
    process.exit(0);
}
