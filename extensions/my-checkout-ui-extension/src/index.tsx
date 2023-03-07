import React from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useBuyerJourneyCompleted,
  useTranslate,
  View,
} from "@shopify/checkout-ui-extensions-react";

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {extensionPoint } = useExtensionApi();
  const translate = useTranslate();
  // Returns true if the customer has completed the checkout
  const buyerJourneyCompleted = useBuyerJourneyCompleted();

  if (buyerJourneyCompleted) {
    return (
      <View>testing</View>
    );
  }

  return null;
}
