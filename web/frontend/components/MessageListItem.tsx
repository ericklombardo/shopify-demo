import { Message } from "../../@types/message";
import { useNavigate } from "@shopify/app-bridge-react";
import { IndexTable, Text } from "@shopify/polaris";
import { HtmlViewer } from "./HtmlViewer";
import dayjs from "dayjs";

interface MessageListItemProps extends Message {
  index: number;
  selected: boolean;
}

export const MessageListItem = (props: MessageListItemProps): JSX.Element => {
  const { index, selected, id, description, createdAt } = props;
  const navigate = useNavigate();

  return (
    <IndexTable.Row
      id={String(id)}
      position={index}
      selected={selected}
      onClick={() => navigate(`/messages/${id}`)}
    >
      <IndexTable.Cell>
        <HtmlViewer html={description} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodySm" fontWeight="medium" alignment="end">
          {dayjs(createdAt).format("MMMM D, YYYY")}
        </Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
};
