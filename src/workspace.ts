/**
 * workspace includeIf listup
 */
import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

function getWorkspacePaths(): string[] {
  const workspacePath: string = core.getInput('workspace', { required: false })
  if (!workspacePath) {
    const githubWorkspacePath: string = process.env.GITHUB_WORKSPACE as string
    return [fs.realpathSync(githubWorkspacePath)]
  }
  return workspacePath
    .split(/\r?\n/)
    .map((workspace) => fs.realpathSync(path.resolve(workspace)))
}

export function getIncludeIfPaths(): string[] {
  const workspacePaths: string[] = getWorkspacePaths()
  return workspacePaths.map(
    (workspace) => `includeIf.gitdir:${workspace}/**.path`
  )
}
