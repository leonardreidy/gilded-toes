module.exports = {
  extension: [
    ".ts"
  ],
  exclude: [
    "src/**/*.d.ts",
    "src/test/**",
    "src/*.js"
  ],
  require: [
    "ts-node/register"
  ],
  reporter: [
    "html",
    "text"
  ]
}
