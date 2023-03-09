import React from "react";
import {
  Card,
  Page,
  EmptyState,
  SkeletonBodyText,
  Layout,
} from "@shopify/polaris";
import { TitleBar, Loading, useNavigate } from "@shopify/app-bridge-react";
import { MessageList } from "../components";
import { Message } from "../../@types/message";
import { useAppQuery } from "../hooks";

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

  const {
    data: messages = [],
    isLoading,
    isRefetching,
    refetch,
  } = useAppQuery<Message[]>({
    url: "/api/messages",
  });

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
          {messages.length > 0 && (
            <MessageList
              messages={messages}
              loading={isRefetching}
              onRefresh={refetch}
            />
          )}
          {!isLoading && !messages.length && <EmptyStateElement />}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
