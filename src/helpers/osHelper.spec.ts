import { getOs, messageReceiver, OS } from "./osHelper";

describe("messageReceiver", () => {
  it("should return 'window' when UIWebView is detected", () => {
    const userAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";

    const result = messageReceiver(userAgent);

    expect(result).toBe(window);
  });

  it("should return 'document' when UIWebView is not detected", () => {
    const userAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1";

    const result = messageReceiver(userAgent);

    expect(result).toBe(document);
  });
});