import * as core from '@actions/core';
import { GitHub } from '@actions/github/lib/utils';

export const logger = {
  log: core.info,
  debug: core.debug,
  info: core.info,
  warn: core.warning,
  error: core.error,
};

interface GetGitHubCommitMessageParams {
  octokit: InstanceType<typeof GitHub>,
  owner: string,
  repo: string,
  ref: string
}

export async function getGitHubCommitMessage(
  params: GetGitHubCommitMessageParams,
): Promise<string | undefined> {
  const { octokit, owner, repo, ref } = params;

  logger.debug(`Fetching commit message`);
  let commitMessage;

  try {
    const res = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref,
    });

    commitMessage = res?.data?.commit?.message;
  } catch (err) {
    logger.debug(`Error fetching commit message: ${err.message}`);
    logger.warn(err);
  }

  return commitMessage;
}
