// We must register Babel and React Server DOM in separate file because all subsequent requires must be transpiled
// into the patched module system, and this can only be achieved by having the registration in a separate file
// before any other module is imported.

const reactServerregister = require("react-server-dom-webpack/node-register");
reactServerregister();

const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
  plugins: ["@babel/transform-modules-commonjs"], // Transpile ESM to CJS for Node.js
});

require("./server")();
