import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { MessageForm } from "../../components";
export default function AddMessage(): JSX.Element {
  const breadcrumbs = [{ content: "Messages", url: "/" }];

  return (
    <Page>
      <TitleBar
        title="Add new message"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <MessageForm />
    </Page>
  );
}
