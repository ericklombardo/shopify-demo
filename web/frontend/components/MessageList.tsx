import {
  IndexTable,
  LegacyCard,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { Message } from "../../@types/message";
import { MessageListItem } from "./MessageListItem";
import { DeleteMessagesModal } from "./DeleteMessagesModal";
import { useCallback, useState } from "react";

export interface MessagesListProps {
  messages: Message[];
  loading: boolean;
  onRefresh?(): void;
}

export const MessageList = (props: MessagesListProps): JSX.Element => {
  const { messages, loading, onRefresh } = props;
  const resourceName = { singular: "message", plural: "messages" };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(messages, {
    resourceIDResolver: (message) => String(message.id),
  });
  const promotedBulkActions = [
    {
      content: `Delete selected ${
        selectedResources.length > 1 ? "messages" : "message"
      }`,
      onAction: () => setIsDeleteModalOpen(true),
    },
  ];
  const renderRows = messages.map(
    ({ id, description, createdAt, active }, index) => (
      <MessageListItem
        index={index}
        active={active}
        selected={selectedResources.includes(String(id))}
        id={id}
        description={description}
        createdAt={createdAt}
        key={id}
      />
    )
  );

  const handleOnCloseModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleOnDeleted = useCallback(
    (success: boolean) => {
      if (success) {
        clearSelection();
        onRefresh?.();
      }
    },
    [onRefresh]
  );

  return (
    <>
      <DeleteMessagesModal
        open={isDeleteModalOpen}
        selectedMessages={selectedResources}
        onClose={handleOnCloseModal}
        onDeleted={handleOnDeleted}
      />
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
    </>
  );
};
