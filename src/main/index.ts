/**
 * The entrypoint for the action.
 */
import * as core from '@actions/core'
import { promises as fs } from 'fs'
import * as crypto from 'crypto'
import * as path from 'path'
import * as io from '@actions/io'
import * as exec from '@actions/exec'
import * as workspace from '../workspace.js'

async function run(): Promise<void> {
  const content: string = core.getInput('configs', { required: false })

  const runnerTempPath: string = process.env.RUNNER_TEMP as string
  const uniqueId = crypto.randomUUID()
  const configFileName = `${uniqueId}.gitconfig`
  const configPath = path.join(runnerTempPath, configFileName)
  await fs.writeFile(configPath, content)

  core.setOutput('config_path', configPath)

  const commandPath: string = await io.which('git', true)

  const includeIfPaths: string[] = workspace.getIncludeIfPaths()
  for (const configName of includeIfPaths) {
    const commandArgs: string[] = [
      // set includeIf command
      'config',
      '--global',
      configName,
      configPath
    ]
    await exec.exec(`"${commandPath}"`, commandArgs)
  }
}

void run()
