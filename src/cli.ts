const { build } = require('gluegun')

async function run(argv) {
  const cli = build()
    .brand('egr')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'egr-*', hidden: true })
    .help() 
    .version() 
    .create()

    const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
