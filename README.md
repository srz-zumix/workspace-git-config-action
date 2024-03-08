# workspace-git-config-action

Provides a gitconfig that is valid only under the specified path

## Usage

See [action.yml](./action.yml)

## Example

* GITHUB_WORKSPACE
  * target1
    * repo1
    * repo2
  * target2
    * repo1
    * repo2

```yaml
- name: Workspace
  id: test-action
  uses: srz-zumix/workspace-git-config-action@main
  with:
    workspace: |
      target1/repo1
      target2
    configs: |
      [user]
        name = hoge
```

target1/repo1 and target2/repo1,target2/repo2 user.name is hoge
