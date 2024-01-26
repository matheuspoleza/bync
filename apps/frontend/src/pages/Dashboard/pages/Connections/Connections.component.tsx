import { Box, EmptyPage } from '@bync/ui';

export const ConnectionsPage = () => {
  return (
    <Box direction="column" align="center" justify="center" height="100%">
      <EmptyPage
        title="No events exist"
        description="Events are external actions such as a button click, email sent, order placed etc."
        illustration="NoContent"
        learnMoreLink="https://learn.voiceflow.com/en/articles/5443226-events"
        button={{
          label: 'Create Event',
        }}
      />
    </Box>
  );
};
