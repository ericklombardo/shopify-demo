import React from "react";
import {
  Card,
  Page,
  EmptyState,
  SkeletonBodyText,
  Layout,
} from "@shopify/polaris";
import { TitleBar, Loading, useNavigate } from "@shopify/app-bridge-react";
import { Message, MessageList } from "../components";
import dayjs from "dayjs";

const LoadingElement = (): JSX.Element => (
  <Card sectioned>
    <Loading />
    <SkeletonBodyText />
  </Card>
);

const EmptyStateElement = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Card sectioned>
      <EmptyState
        heading="Add new message"
        action={{
          content: "Add new message",
          onAction: () => navigate("/messages/new"),
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          Allow add new <strong>thank you messages</strong> for displaying in
          the order confirmation page.
        </p>
      </EmptyState>
    </Card>
  );
};

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  /*
    These are mock values. Setting these values lets you preview the loading markup and the empty state.
  */
  const isLoading = false;
  const isRefetching = false;
  const messages: Message[] = [
    {
      id: 1,
      description: "<p><strong>Thank you for your order 1</strong></p>",
      createdAt: dayjs().add(-1, "day").toDate(),
    },
    {
      id: 2,
      description: "<p>Thank you for your order 2</p>",
      createdAt: dayjs().add(-2, "day").toDate(),
    },
    {
      id: 3,
      description: "<p>Thank you for your order 3</p>",
      createdAt: dayjs().add(-3, "day").toDate(),
    },
    {
      id: 4,
      description: "<p>Thank you for your order 4</p>",
      createdAt: new Date(),
    },
    {
      id: 5,
      description: "Thank you for your order 5",
      createdAt: dayjs().add(1, "day").toDate(),
    },
  ];

  return (
    <Page>
      <TitleBar
        title="Thank you messages"
        primaryAction={{
          content: "Add new message",
          onAction: () => navigate("/messages/new"),
        }}
      />
      <Layout>
        <Layout.Section>
          {isLoading && <LoadingElement />}
          {messages.length && (
            <MessageList messages={messages} loading={isRefetching} />
          )}
          {!isLoading && !messages.length && <EmptyStateElement />}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
