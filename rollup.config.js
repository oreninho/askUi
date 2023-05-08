import resolve from '@rollup/plugin-node-resolve';
import nodeExternals from 'rollup-plugin-node-externals';

export default {
  // ... your existing config
  plugins: [
    // ... your other plugins
    nodeExternals(), // Add this line to ignore all modules from node_modules folder
    resolve({
      preferBuiltins: true, // Add this line to use built-in Node.js modules
    }),
  ],
};





