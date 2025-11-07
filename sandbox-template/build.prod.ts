import { name as templateAlias } from './package.json'
import { template } from './template'
import 'dotenv/config'
import { defaultBuildLogger, Template } from 'e2b'

Template.build(template, {
  alias: templateAlias,
  cpuCount: 8,
  memoryMB: 8192,
  onBuildLogs: defaultBuildLogger(),
  apiKey: ""
})