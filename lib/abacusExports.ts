// This file re-exports the abacus functionality in a way that works with Next.js

// Import the abacus module
import * as abacusModule from './abacus';

// Export the Abacus class and other necessary functions
export const Abacus = abacusModule.Abacus;
export const initializeDOMElements = abacusModule.initializeDOMElements;
export const writeNumberInAbacus = abacusModule.writeNumberInAbacus;
export const putNumberInRod = abacusModule.putNumberInRod;
export const resetAbacus = abacusModule.resetAbacus; 