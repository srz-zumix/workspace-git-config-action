/**
 * workspace includeIf listup
 */

export function getIncludeIfPaths(): string[] {
  const workspacePath: string = process.env.GITHUB_WORKSPACE as string
  const includeIfPaths: string[] = [
    `${workspacePath}/**`
  ]
  return includeIfPaths.map(path => `includeIf."gitdir:${path}".path`)
}
