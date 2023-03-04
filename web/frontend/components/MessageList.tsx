import {
  IndexTable,
  LegacyCard,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { Message } from "../../@types/message";
import { MessageListItem } from "./MessageListItem";

export interface MessagesListProps {
  messages: Message[];
  loading: boolean;
}

export const MessageList = (props: MessagesListProps): JSX.Element => {
  const { messages, loading } = props;
  const resourceName = { singular: "message", plural: "messages" };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(messages, {
      resourceIDResolver: (message) => String(message.id),
    });
  const promotedBulkActions = [
    {
      content: `Delete selected ${
        selectedResources.length > 1 ? "messages" : "message"
      }`,
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];
  const renderRows = messages.map(({ id, description, createdAt }, index) => (
    <MessageListItem
      index={index}
      selected={selectedResources.includes(String(id))}
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
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        promotedBulkActions={promotedBulkActions}
        headings={[
          { title: "Description" },
          {
            id: "createdAt",
            title: (
              <Text
                as="span"
                variant="bodySm"
                fontWeight="medium"
                alignment="end"
              >
                Date created
              </Text>
            ),
          },
        ]}
        loading={loading}
      >
        {renderRows}
      </IndexTable>
    </LegacyCard>
  );
};
