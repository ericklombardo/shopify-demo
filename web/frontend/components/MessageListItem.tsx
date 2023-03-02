import { Message } from "./MessageForm";
import { useNavigate } from "@shopify/app-bridge-react";
import { Button, ButtonGroup, IndexTable } from "@shopify/polaris";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";
import { HtmlViewer } from "./HtmlViewer";
import dayjs from "dayjs";

export const MessageListItem = (props: Message): JSX.Element => {
  const { id, description, createdAt } = props;
  const navigate = useNavigate();

  return (
    <IndexTable.Row id={String(id)} position={id}>
      <IndexTable.Cell>
        <HtmlViewer html={description} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        {dayjs(createdAt).format("MMMM D, YYYY")}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <ButtonGroup>
          <Button
            icon={DeleteMinor}
            outline
            size="slim"
            destructive
            onClick={() => console.log("deleted")}
          >
            Delete
          </Button>
          <Button
            outline
            size="slim"
            icon={EditMinor}
            onClick={() => navigate(`/messages/${id}`)}
          >
            Edit
          </Button>
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
};
