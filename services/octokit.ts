import { Octokit } from 'npm:octokit@2.0.11'

export const octokit = new Octokit({
  auth: Deno.env.get('GITHUB_OCTOKIT_TOKEN'),
})

export const getGithubProfile = async () => {
  try {
    const response = await octokit.rest.users.getAuthenticated()
    const { data } = response
    return data
  } catch {
    return null
  }
}
