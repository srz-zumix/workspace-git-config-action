
export function getIncludeIfPaths() {
    const workspacePath: string = process.env.GITHUB_WORKSPACE as string
    const includeIfPaths: string[] = [
        `${workspacePath}/`,
        `${workspacePath}/**`,
    ]
    return includeIfPaths    
}
