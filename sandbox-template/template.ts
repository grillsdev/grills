import { Template, waitForURL } from 'e2b'

export const template = Template()
  .fromBunImage('1.3')
  .aptInstall('curl')
  .aptInstall('git')
  .setWorkdir('/home/user/nextjs-app')
  .runCmd(
    'git clone https://github.com/grillsdev/nextjs-e2b-template .',
  )
  .runCmd('bun install')
  .runCmd(
    'mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app',
  )
  .setWorkdir('/home/user')
  .setStartCmd('bun --bun run dev --turbo', waitForURL('http://localhost:3000'))