import { Handlers, PageProps } from '$fresh/server.ts';
import { getGithubProfile } from '../services/octokit.ts';
import Page from '../components/Page.tsx';

export const handler: Handlers = {
  async GET(request, context) {
    const profileData = await getGithubProfile();
    return context.render({ profileData });
  },
};

export default function GitHub(
  props: PageProps,
) {
  return (
    <Page>
      <pre>
        {JSON.stringify(props.data.profileData, null, 2)}
      </pre>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Page>
  );
}
