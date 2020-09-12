const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'egr') + ` ${cmd}`)

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('0.0.1')
})

test('generate new page', async () => {
  const output = await cli('generate:page UserProfile')

  expect(output).toContain('Generated src/pages/UserProfile')
  const userProfile = filesystem.read('src/pages/UserProfile/index.tsx')

  expect(userProfile).toContain(`const UserProfile: React.FC = () => {`)
  expect(userProfile).toContain(`return <Container /> `)
  expect(userProfile).toContain(`export { UserProfile }`)

  filesystem.remove('src/pages')
})

test('generate new component', async () => {
  const output = await cli('generate:component Cart')

  expect(output).toContain('Generated src/components/Cart')
  const cart = filesystem.read('src/components/Cart/index.tsx')

  expect(cart).toContain(`const Cart: React.FC = () => {`)
  expect(cart).toContain(`return <Container /> `)
  expect(cart).toContain(`export { Cart }`)

  filesystem.remove('src/components')
})
