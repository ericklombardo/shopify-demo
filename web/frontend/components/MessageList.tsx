import { IndexTable, LegacyCard } from "@shopify/polaris";
import { Message } from "./MessageForm";
import { MessageListItem } from "./MessageListItem";

export interface MessagesListProps {
  messages: Message[];
  loading: boolean;
}

export const MessageList = (props: MessagesListProps): JSX.Element => {
  const { messages, loading } = props;
  const resourceName = { singular: "message", plural: "messages" };

  const renderRows = messages.map(({ id, description, createdAt }) => (
    <MessageListItem
      id={id}
      description={description}
      createdAt={createdAt}
      key={id}
    />
  ));

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={messages.length}
        headings={[
          { title: "Description" },
          { title: "Date created" },
          { title: "Actions" },
        ]}
        selectable={false}
        loading={loading}
      >
        {renderRows}
      </IndexTable>
    </LegacyCard>
  );
};
