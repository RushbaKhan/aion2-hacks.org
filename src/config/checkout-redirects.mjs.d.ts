export declare const CHECKOUT_URLS: {
  readonly overwatch: string;
  readonly dma: string;
  readonly hwid: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;
