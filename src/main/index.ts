/**
 * The entrypoint for the action.
 */
import * as core from '@actions/core'
import { promises as fs } from 'fs'
import * as path from 'path'
import * as io from '@actions/io'
import * as exec from '@actions/exec'
import { v4 as uuidv4 } from 'uuid'
import * as workspace from '../workspace'

async function run(): Promise<void> {
    const content: string = core.getInput('configs', { required: false })

    const runnerTempPath: string = process.env.RUNNER_TEMP as string
    const uniqueId = uuidv4()
    const configFileName = `${uniqueId}.gitconfig}`
    const configPath = path.join(runnerTempPath, configFileName)
    await fs.writeFile(configPath, content)

    core.setOutput('config_path', configPath)

    const commandPath: string = await io.which('git', true)

    const includeIfPaths: string[] = workspace.getIncludeIfPaths()
    for(const path of includeIfPaths) {
        const commandArgs: string[] = [
            'config',
            '--global',
            `includeIf."${path}".path`,
            configPath
        ]
        await exec.exec(`"${commandPath}"`, commandArgs)            
    }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
void run()
