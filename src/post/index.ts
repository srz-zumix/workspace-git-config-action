/**
 * The entrypoint for the action.
 */
import * as io from '@actions/io'
import * as exec from '@actions/exec'
import * as workspace from '../workspace.js'

async function run(): Promise<void> {
  const commandPath: string = await io.which('git', true)

  const includeIfPaths: string[] = workspace.getIncludeIfPaths()
  for (const configName of includeIfPaths) {
    const commandArgs: string[] = [
      // unset command
      'config',
      '--global',
      '--unset-all',
      configName
    ]
    await exec.exec(`"${commandPath}"`, commandArgs)
  }
}

void run()
