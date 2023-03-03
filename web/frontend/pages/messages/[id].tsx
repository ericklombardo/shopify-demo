import { Card, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { Loading, TitleBar } from "@shopify/app-bridge-react";
import { MessageForm } from "../../components";
import { Message } from "../../../@types/message";
import { useParams } from "react-router-dom";
import { useAppQuery } from "../../hooks";

export default function EditMessage() {
  const breadcrumbs = [{ content: "Messages", url: "/" }];

  const { id } = useParams();

  const {
    data: message,
    isLoading,
    isRefetching,
  } = useAppQuery<Message>({
    url: `/api/messages/${id}`,
    reactQueryOptions: {
      refetchOnReconnect: false,
    },
  });

  if (isLoading || isRefetching) {
    return (
      <Page>
        <TitleBar
          title="Edit message"
          breadcrumbs={breadcrumbs}
          primaryAction={null}
        />
        <Loading />
        <Layout>
          <Layout.Section>
            <Card sectioned title="Title">
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page>
      <TitleBar
        title="Edit message"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <MessageForm message={message} />
    </Page>
  );
}
