import { Card, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { Loading, TitleBar } from "@shopify/app-bridge-react";
import { MessageForm } from "../../components";

export default function EditMessage() {
  const breadcrumbs = [{ content: "Messages", url: "/" }];

  const isLoading = false;
  const isRefetching = false;
  const message = {
    createdAt: "2022-06-13",
    description: "My first message",
  };

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
