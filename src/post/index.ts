/**
 * The entrypoint for the action.
 */
import * as io from '@actions/io'
import * as exec from '@actions/exec'
import * as workspace from '../workspace'

async function run(): Promise<void> {
  const commandPath: string = await io.which('git', true)

  const includeIfPaths: string[] = workspace.getIncludeIfPaths()
  for (const path of includeIfPaths) {
    const commandArgs: string[] = [
      'config',
      '--global',
      '--unset-all',
      `includeIf."${path}".path`
    ]
    await exec.exec(`"${commandPath}"`, commandArgs)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
void run()
