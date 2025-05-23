/**
 * workspace includeIf listup
 */
import * as core from '@actions/core'
import * as path from 'path'

function getWorkspacePaths(): string[] {
  const workspacePath: string = core.getInput('workspace', { required: false })
  if (!workspacePath) {
    const githubWorkspacePath: string = process.env.GITHUB_WORKSPACE as string
    return [githubWorkspacePath]
  }
  return workspacePath
    .split(/\r?\n/)
    .map((workspace) => path.resolve(workspace))
}

export function getIncludeIfPaths(): string[] {
  const workspacePaths: string[] = getWorkspacePaths()
  return workspacePaths.map(
    (workspace) => `includeIf.gitdir:${workspace}/**.path`
  )
}
