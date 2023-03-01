import { useState, useCallback } from "react";
import {
  Banner,
  Card,
  Form,
  FormLayout,
  InlineError,
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
import { HtmlEditor } from "./HtmlEditor";

const NO_DISCOUNT_OPTION = { label: "No discount", value: "" };

const DISCOUNT_CODES = {};

export const MessageForm = (props: any): JSX.Element => {
  const { message: initialMessage } = props;

  const [message, setMessage] = useState(initialMessage);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();

  const onSubmit: SubmitHandler<
    FormMapping<{ description: Field<any> }, "value">
  > = (body: any) => {
    console.log("submit", body);
    return Promise.resolve({ status: "success" });
  };

  const isDeleting = false;
  const deleteMessage = () => console.log("delete");

  const onChangeMessage = (content: string) => {
    setMessage({ ...message, description: content });
    setIsDirty(true);
  };

  const { reset, submitting, submit } = useForm({
    fields: {
      description: useField({
        value: message?.description || "",
        validates: [notEmptyString("Please enter the message description")],
      }),
    },
    onSubmit,
  });

  return (
    <Stack vertical>
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
              visible={isDirty}
              fullWidth
            />
            <FormLayout>
              <Card sectioned title="Description">
                <HtmlEditor
                  maxCharCount={50}
                  onChange={onChangeMessage}
                  errorMessage="Please enter the message description"
                  required
                  defaultValue={initialMessage?.description ?? ""}
                />
              </Card>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Stack>
  );
};
