> ## Documentation Index 1
>
> Fetch the complete documentation index at: https://docs.solanamobile.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Installing Mobile Wallet Standard

> Use the **Mobile Wallet Standard** library to register Mobile Wallet Adapter as a wallet option into your web application.

## Installation

### 1. Install the package

You can add Mobile Wallet Adapter to your web application by installing:

```shell theme={null}
npm install @solana-mobile/wallet-standard-mobile
```

### 2. Register the wallet

In the root of your web application, invoke the `registerMwa` function.

<Warning>
  **CAUTION**

Ensure `registerMwa` is invoked in a non-SSR context. if you're using a framework with Server Side Rendering (e.g Next.js),
</Warning>

```typescript theme={null}
// 'use client' - If using Next.js, ensure it is registered in a non-SSR context.

import {
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
  registerMwa,
} from "@solana-mobile/wallet-standard-mobile";

registerMwa({
  appIdentity: {
    name: "My app",
    uri: "https://myapp.io",
    icon: "relative/path/to/icon.png", // resolves to https://myapp.io/relative/path/to/icon.png
  },
  authorizationCache: createDefaultAuthorizationCache(),
  chains: ["solana:devnet", "solana:mainnet"],
  chainSelector: createDefaultChainSelector(),
  onWalletNotFound: createDefaultWalletNotFoundHandler(),
});
```

Once registered, MWA will appear as a wallet option for users browsing on Android Chrome. The connection is handled locally via Android Intents (same as native Android apps).

> ## Documentation Index 2
>
> Fetch the complete documentation index at: https://docs.solanamobile.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Mobile Wallet Adapter UX Guidelines

> This guide will cover the best practices for using Mobile Wallet Adapter (MWA) in your web app.

This guide assumes:

- You are using `@solana/wallet-adapter-react`
- The user is browsing on an **Android Web environment**, where MWA is usually the only available wallet.

## Call `connect()` directly

You should explicitly handle two scenarios:

1. If MWA is already selected, you should always directly call `connect`.

2. If it is not selected, but available, `select` it as early as possible in your UI flow.

This will also fix connection related issues with Mobile Wallet Adapter.

### Example: Connect Button

```typescript theme={null}
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'

export default function ConnectButton() {
    const { connected, connect, wallet, wallets } = useWallet();
    const { setVisible: showWalletSelectionModal } = useWalletModal();

    const handleConnectClick = () => {
        // MWA is only available if user is on Android Web environments (e.g Android Chrome).
        if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
            // If already selected, immediately connect.
            await connect();
        } else if (mobileWalletAdapter) {
            // If MWA is not selected, but available, select it instead of showing modal.
            select(SolanaMobileWalletAdapterWalletName)
        } else {
            // Else, show modal as usual.
            showWalletSelectionModal(true)
        }
    }
    return <Button disabled={connected} onClick={handleConnectClick} />;
}
```

## Connect and Sign in a single user action

If your app uses MWA and requires a user to _Sign-in-with-Solana_ (e.g`connect` + `signMessage`), it needs to invoke both methods from a single user action.

### Why?

If `signMessage` is invoked programmatically (e.g in a `useEffect`), Android Chrome browser will block the navigation attempt in accordance with it's [trusted event policy](https://developer.chrome.com/docs/android/intents).

### Solution

To `connect` + `signMessage` in a single user action, you should directly call the `signIn()` method

Mobile Wallet Adapter always supports the `signIn` method which invokes a `connect` and `signMessage` all within a single method.

### Example: Sign In Button

```typescript theme={null}
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'

export default function SignInButton() {
    const { connected, signIn, wallet, wallets } = useWallet();
    const { setVisible: showWalletSelectionModal } = useWalletModal();

    const handleSignInButtonClick = () => {
        // MWA is only available if user is on Android Web environments (e.g Android Chrome).
        if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
            // If MWA is present, immediately sign in.
            const input: SolanaSignInInput = {
                domain: window.location.host,
                statement: "Sign in to My Web App",
                uri: window.location.origin,
            }
            const output = await signIn(input);
        } else {
            // Else, show modal as usual.
            showWalletSelectionModal(true)
        }
    }
    return <Button disabled={connected} onClick={handleSignInButtonClick} />;
}
```

## Change the displayed name

Throughout your UI, use the text `Use Installed Wallet` as the displayed name for the MWA option.

This descriptive text helps your users understand that this option will allow them to connect to an installed mobile wallet app (via MWA).

### Example: Wallet List Item Component

```typescript theme={null}
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-standard-mobile'

export default function WalletListItem({ wallet, onPress }){
    // If we are showing MWA, use a descriptive display name.
    const displayName = (wallet.adapter.name === SolanaMobileWalletAdapterWalletName)
                        ? `Use Installed Wallet` : wallet.adapter.name
    return (
    <Button onClick={onPress}>
        {displayName}
    </Button>
    );
};
```
