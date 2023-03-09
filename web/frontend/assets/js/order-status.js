(() => {
  const installer = {
    appUrl: "https://thank-you.fly.dev",

    mainElement: document.getElementsByClassName("main")?.[0],

    mainHeaderId: "thank-you-main-header",

    getMainHeader() {
      return document.getElementById(this.mainHeaderId);
    },

    isGettingMessage: false,

    start() {
      if (!this.mainElement || this.getMainHeader() || this.isGettingMessage)
        return;

      // eslint-disable-next-line no-undef
      this.getMessage(Shopify.shop, (data) => {
        this.isGettingMessage = false;
        if (this.getMainHeader() || !data.message) return;

        // Create css element
        const style = document.createElement("link");
        style.href = `${this.appUrl}/assets/css/order-status.css`;
        style.rel = "stylesheet";
        document.head.appendChild(style);

        const mainHeader = document.createElement("div");
        mainHeader.setAttribute("id", this.mainHeaderId);
        mainHeader.innerHTML = data.message;
        mainHeader.classList.add("thank-you-message");
        this.mainElement.insertBefore(mainHeader, this.mainElement.children[0]);
      });
    },

    JSONP(url, parameters, callback) {
      const callbackName = `MyAppJSONPCallback${Date.now()}`;

      window[callbackName] = callback;

      //Convert the parameters into a querystring
      const qsParams = [`callback=${callbackName}`];
      Object.keys(parameters).forEach((key) => {
        qsParams.push(`${key}=${parameters[key]}`);
      });

      //Add a unique parameter to the querystring, to overcome browser caching.
      qsParams.push(`uid=${Date.now()}`);

      const queryString = "?" + qsParams.join("&");

      // Create a script element with the JSONP URL.
      const script = document.createElement("script");
      script.src = url + queryString;
      script.async = true;
      script.type = "text/javascript";

      //Append the script to the document's head to execute it.
      document.head.appendChild(script);
    },

    getMessage(shop, callback) {
      this.isGettingMessage = true;
      this.JSONP(`${this.appUrl}/api/messages/latest`, { shop }, (data) =>
        callback(data)
      );
    },
  };

  installer.start();
})();
