import { useState, useCallback } from "react";
import {
  Banner,
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  ChoiceList,
  Select,
  Thumbnail,
  Icon,
  Stack,
  TextStyle,
  Layout,
  EmptyState,
} from "@shopify/polaris";
import {
  ContextualSaveBar,
  ResourcePicker,
  useAppBridge,
  useNavigate,
} from "@shopify/app-bridge-react";
import { ImageMajor, AlertMinor } from "@shopify/polaris-icons";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";
import {
  SubmitHandler,
  FormMapping,
  Field,
} from "@shopify/react-form/build/ts";

const NO_DISCOUNT_OPTION = { label: "No discount", value: "" };

const DISCOUNT_CODES = {};

export const MessageForm = (props: any): JSX.Element => {
  const { message: initialMessage } = props;

  const [message, setMessage] = useState(initialMessage);

  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();
  const deletedProduct = message?.description === "Deleted product";

  const onSubmit: SubmitHandler<
    FormMapping<{ description: Field<any> }, "value">
  > = (body: any) => {
    console.log("submit", body);
    return Promise.resolve({ status: "success" });
  };

  const isDeleting = false;
  const deleteMessage = () => console.log("delete");

  const {
    fields: { description },
    dirty,
    reset,
    submitting,
    submit,
    makeClean,
  } = useForm({
    fields: {
      description: useField({
        value: message?.title || "",
        validates: [notEmptyString("Please enter the message description")],
      }),
    },
    onSubmit,
  });

  return (
    <Stack vertical>
      {deletedProduct && (
        <Banner
          title="The product for this QR code no longer exists."
          status="critical"
        >
          <p>
            Scans will be directed to a 404 page, or you can choose another
            product for this QR code.
          </p>
        </Banner>
      )}
      <Layout>
        <Layout.Section>
          <Form onSubmit={submit}>
            <ContextualSaveBar
              saveAction={{
                onAction: submit,
                loading: submitting,
                disabled: submitting,
              }}
              discardAction={{
                onAction: reset,
                loading: submitting,
                disabled: submitting,
              }}
              visible={dirty}
              fullWidth
            />
            <FormLayout>
              <Card sectioned title="Description">
                <TextField
                  {...description}
                  autoComplete="off"
                  label="Description"
                  labelHidden
                  helpText="This is the description of the message that will be displayed in the order confirmation page."
                />
              </Card>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Stack>
  );
};
