import { Message } from "../../@types/message";
import { useNavigate } from "@shopify/app-bridge-react";
import { IndexTable, Text, UnstyledLink } from "@shopify/polaris";
import dayjs from "dayjs";
import { stripHtmlFromText, truncate } from "../utils";

interface MessageListItemProps extends Omit<Message, "shop"> {
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
        <UnstyledLink url={`/messages/${id}`}>
          {truncate(stripHtmlFromText(description), 50)}
        </UnstyledLink>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodySm" fontWeight="medium" alignment="end">
          {dayjs(createdAt).format("MMMM D, YYYY")}
        </Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
};
