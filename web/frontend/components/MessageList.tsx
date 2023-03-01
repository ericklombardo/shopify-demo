import { useNavigate } from "@shopify/app-bridge-react";
import {
  IndexTable,
  LegacyCard,
  Button,
  ButtonGroup,
  Text,
} from "@shopify/polaris";
import { Message } from "./MessageForm";
import dayjs from "dayjs";
import { HtmlViewer } from "./HtmlViewer";

export interface MessagesListProps {
  messages: Message[];
  loading: boolean;
}

export const MessageList = (props: MessagesListProps): JSX.Element => {
  const { messages, loading } = props;

  const navigate = useNavigate();
  const resourceName = {
    singular: "Message",
    plural: "Messages",
  };

  const rowMarkup = messages.map(({ id, description, createdAt }, index) => (
    <IndexTable.Row id={String(id)} key={id} position={index}>
      <IndexTable.Cell>
        <HtmlViewer html={description} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        {dayjs(createdAt).format("MMMM D, YYYY")}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <ButtonGroup>
          <Button
            size="slim"
            destructive
            onClick={() => console.log("deleted")}
          >
            Delete
          </Button>
          <Button size="slim" onClick={() => navigate(`/messages/${id}`)}>
            Edit
          </Button>
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
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
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
};
