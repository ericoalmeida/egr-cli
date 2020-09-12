import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'egr',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Bem-vindo à EGR-CLI')
  }
}

module.exports = command
