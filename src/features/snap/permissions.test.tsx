import { getPermissions, SNAP_PERMISSIONS } from './permissions';
import { getMockSnap } from '../../utils/test-utils';

describe('SNAP_PERMISSIONS', () => {
  const { snap } = getMockSnap();

  describe('endowment:cronjob', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS['endowment:cronjob'](snap, {
          jobs: [
            {
              expression: '* * * * *',
              request: {
                method: 'foo',
              },
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "LmKljF",
            "message": "Allow {name} to perform actions that run periodically at fixed times, dates, or intervals. This can be used to trigger time-sensitive interactions or notifications.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "gRpHRD",
            "message": "Schedule and execute periodic actions",
          },
          "weight": 3,
        }
      `);
    });
  });

  describe('endowment:ethereum-provider', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS['endowment:ethereum-provider'](snap))
        .toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "CF9K8z",
            "message": "Allow {name} to communicate with MetaMask directly, in order for it to read data from the blockchain and suggest messages and transactions.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "SlMw/t",
            "message": "Access the Ethereum provider",
          },
          "weight": 3,
        }
      `);
    });
  });

  describe('endowment:keyring', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS['endowment:keyring'](snap, {
          allowedOrigins: ['https://example.com'],
        }),
      ).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "RiDn6i",
            "message": "Let {name} receive requests to add or remove accounts, plus sign and transact on behalf of these accounts.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "2cdGCS",
            "message": "Allow requests for adding and controlling Ethereum accounts",
          },
          "weight": 3,
        }
      `);
    });
  });

  describe('endowment:lifecycle-hooks', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS['endowment:lifecycle-hooks'](snap, {}))
        .toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "6Aw4uD",
            "message": "Allow {name} to use lifecycle hooks to run code at specific times during its lifecycle.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "w/DqW1",
            "message": "Use lifecycle hooks",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('endowment:name-lookup', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS['endowment:name-lookup'](snap, {
          chains: ['eip155:1'],
        }),
      ).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "CQGihP",
            "message": "Allow {name} to fetch and display address and domain lookups in different parts of the MetaMask UI.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "IYcBOX",
            "message": "Provide domain and address lookups",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('endowment:network-access', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS['endowment:network-access'](snap))
        .toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "q7xKA1",
            "message": "Allow {name} to access the internet. This can be used to both send and receive data with third-party servers.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "UwdbzV",
            "message": "Access the internet",
          },
          "weight": 3,
        }
      `);
    });
  });

  describe('endowment:page-home', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS['endowment:page-home'](snap, {}))
        .toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "VCSREr",
            "message": "Let {name} display a custom home screen in MetaMask. This can be used for user interfaces, configuration, and dashboards.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "aeShoc",
            "message": "Display a custom screen",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('endowment:rpc', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS['endowment:rpc'](snap, {
          dapps: true,
          snaps: true,
          allowedOrigins: ['https://example.com'],
        }),
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "PlkvKi",
              "message": "Allow other Snaps to send messages to {name} and receive a response from {name}.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "jUS4lF",
              "message": "Allow other Snaps to communicate directly with {name}",
              "values": Object {
                "name": "Snap",
              },
            },
            "weight": 3,
          },
          Object {
            "description": Object {
              "id": "2CWapA",
              "message": "Allow websites to send messages to website and receive a response from {name}.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "u1NNyL",
              "message": "Allow websites to communicate with {name}",
              "values": Object {
                "name": "Snap",
              },
            },
            "weight": 3,
          },
          Object {
            "description": Object {
              "id": "Mryfy4",
              "message": "Allow {origin} to send messages to {name} and receive a response from {name}.",
              "values": Object {
                "name": "Snap",
                "origin": "https://example.com",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "c2TypL",
              "message": "Allow {origin} to communicate with {name}",
              "values": Object {
                "name": "Snap",
                "origin": "https://example.com",
              },
            },
            "weight": 3,
          },
        ]
      `);

      expect(
        SNAP_PERMISSIONS['endowment:rpc'](snap, {
          dapps: false,
          snaps: false,
        }),
      ).toMatchInlineSnapshot(`Array []`);
    });
  });

  describe('endowment:signature-insight', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS['endowment:signature-insight'](snap, {}))
        .toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "lL5lxE",
            "message": "Allow {name} to decode signatures and show insights within the MetaMask UI. This can be used for anti-phishing and security solutions.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "R+1slK",
            "message": "Fetch and display signature insights",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('endowment:transaction-insight', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS['endowment:transaction-insight'](snap, {
          allowTransactionOrigin: true,
        }),
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "2msKlk",
              "message": "Allow {name} to decode transactions and show insights within the MetaMask UI. This can be used for anti-phishing and security solutions.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "rSJzao",
              "message": "Fetch and display transaction insights",
            },
            "weight": 4,
          },
          Object {
            "description": Object {
              "id": "kB/AEl",
              "message": "Allow {name} to see the origin (URI) of websites that suggest transactions. This can be used for anti-phishing and security solutions.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "RNFoRQ",
              "message": "See the origins of websites that suggest transactions",
            },
            "weight": 4,
          },
        ]
      `);

      expect(SNAP_PERMISSIONS['endowment:transaction-insight'](snap, {}))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "2msKlk",
              "message": "Allow {name} to decode transactions and show insights within the MetaMask UI. This can be used for anti-phishing and security solutions.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "rSJzao",
              "message": "Fetch and display transaction insights",
            },
            "weight": 4,
          },
        ]
      `);
    });
  });

  describe('endowment:webassembly', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS['endowment:webassembly'](snap))
        .toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "nIkdc5",
            "message": "Allow {name} to access low-level execution environments via WebAssembly.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "YXDMFP",
            "message": "Support for WebAssembly",
          },
          "weight": 3,
        }
      `);
    });
  });

  describe('eth_accounts', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.eth_accounts(snap)).toMatchInlineSnapshot(`
        Object {
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "egBBX/",
            "message": "See address, account balance, activity and suggest transactions to approve",
          },
          "weight": 2,
        }
      `);
    });
  });

  describe('snap_dialog', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.snap_dialog(snap)).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "5fHdU3",
            "message": "Allow {name} to display MetaMask popups with custom text, input field, and buttons to approve or reject an action. Can be used to create e.g., alerts, confirmations, and opt-in flows for a Snap.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "r+Az4l",
            "message": "Display dialog windows in MetaMask",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('snap_getBip32Entropy', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS.snap_getBip32Entropy(snap, [
          {
            path: ['m', `44'`, `1'`],
            curve: 'secp256k1',
          },
          {
            path: ['m', `44'`, `123456'`],
            curve: 'secp256k1',
          },
          {
            path: ['m', `44'`, `123456'`],
            curve: 'ed25519',
          },
        ]),
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "kWDIFp",
              "message": "Allow {name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, {name} can support a variety of blockchain protocols beyond Ethereum (EVMs).",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "TuvFzN",
              "message": "Manage {name} accounts",
              "values": Object {
                "name": "Testnet (all coins)",
              },
            },
            "weight": 1,
          },
          Object {
            "description": Object {
              "id": "kWDIFp",
              "message": "Allow {name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, {name} can support a variety of blockchain protocols beyond Ethereum (EVMs).",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "9PM7um",
              "message": "Manage accounts (Unknown network \\"m/{purpose}/{coinType}\\")",
              "values": Object {
                "coinType": "123456'",
                "purpose": "44'",
              },
            },
            "weight": 1,
          },
          Object {
            "description": Object {
              "id": "kWDIFp",
              "message": "Allow {name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, {name} can support a variety of blockchain protocols beyond Ethereum (EVMs).",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "9PM7um",
              "message": "Manage accounts (Unknown network \\"m/{purpose}/{coinType}\\")",
              "values": Object {
                "coinType": "123456'",
                "purpose": "44'",
              },
            },
            "weight": 1,
          },
        ]
      `);
    });
  });

  describe('snap_getBip44Entropy', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS.snap_getBip44Entropy(snap, [
          {
            coinType: 1,
          },
          {
            coinType: 123456,
          },
        ]),
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "kWDIFp",
              "message": "Allow {name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, {name} can support a variety of blockchain protocols beyond Ethereum (EVMs).",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "TuvFzN",
              "message": "Manage {name} accounts",
              "values": Object {
                "name": "Testnet (all coins)",
              },
            },
            "weight": 1,
          },
          Object {
            "description": Object {
              "id": "kWDIFp",
              "message": "Allow {name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, {name} can support a variety of blockchain protocols beyond Ethereum (EVMs).",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "qL6Mq4",
              "message": "Manage accounts (Unknown network \\"m/44'/{coinType}'\\")",
              "values": Object {
                "coinType": 123456,
              },
            },
            "weight": 1,
          },
        ]
      `);
    });
  });

  describe('snap_getBip32PublicKey', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS.snap_getBip32PublicKey(snap, [
          {
            path: ['m', `44'`, `1'`],
            curve: 'secp256k1',
          },
          {
            path: ['m', `44'`, `123456'`],
            curve: 'secp256k1',
          },
          {
            path: ['m', `44'`, `123456'`],
            curve: 'ed25519',
          },
        ]),
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "rh23nf",
              "message": "Allow {name} to view your public keys (and addresses) for $1. This does not grant any control of accounts or assets.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "P4MCkP",
              "message": "View your public key for {name}",
              "values": Object {
                "name": "Testnet (all coins)",
              },
            },
            "weight": 2,
          },
          Object {
            "description": Object {
              "id": "rh23nf",
              "message": "Allow {name} to view your public keys (and addresses) for $1. This does not grant any control of accounts or assets.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "erEYfR",
              "message": "View your public key (Unknown network \\"m/{purpose}/{coinType}\\")",
              "values": Object {
                "coinType": "123456'",
                "purpose": "44'",
              },
            },
            "weight": 2,
          },
          Object {
            "description": Object {
              "id": "rh23nf",
              "message": "Allow {name} to view your public keys (and addresses) for $1. This does not grant any control of accounts or assets.",
              "values": Object {
                "name": "Snap",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "erEYfR",
              "message": "View your public key (Unknown network \\"m/{purpose}/{coinType}\\")",
              "values": Object {
                "coinType": "123456'",
                "purpose": "44'",
              },
            },
            "weight": 2,
          },
        ]
      `);
    });
  });

  describe('snap_getEntropy', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.snap_getEntropy(snap)).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "6efhkn",
            "message": "Allow {name} to derive arbitrary keys unique to {name}, without exposing them. These keys are separate from your MetaMask account(s) and not related to your private keys or Secret Recovery Phrase. Other snaps cannot access this information.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "cvW5Wp",
            "message": "Derive arbitrary keys unique to {name}",
            "values": Object {
              "name": "Snap",
            },
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('snap_getLocale', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.snap_getLocale(snap)).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "gqxH9P",
            "message": "Let {name} access your preferred language from your MetaMask settings. This can be used to localize and display {name}'s content using your language.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "rSk5AY",
            "message": "View your preferred language",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('snap_manageAccounts', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.snap_manageAccounts(snap)).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "ndOYgj",
            "message": "Allow {name} to add or remove Ethereum accounts, then transact and sign with these accounts.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "M1fDSn",
            "message": "Add and control Ethereum accounts",
          },
          "weight": 3,
        }
      `);
    });
  });

  describe('snap_manageState', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.snap_manageState(snap)).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "3cLsND",
            "message": "Allow {name} to store, update, and retrieve data securely with encryption. Other Snaps cannot access this information.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "4FCCdL",
            "message": "Store and manage its data on your device",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('snap_notify', () => {
    it('returns the correct permission', () => {
      expect(SNAP_PERMISSIONS.snap_notify(snap)).toMatchInlineSnapshot(`
        Object {
          "description": Object {
            "id": "FB6LGt",
            "message": "Allow {name} to display notifications within MetaMask. A short notification text can be triggered by a Snap for actionable or time-sensitive information.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "RXCBkG",
            "message": "Show notifications",
          },
          "weight": 4,
        }
      `);
    });
  });

  describe('wallet_snap', () => {
    it('returns the correct permission', () => {
      expect(
        SNAP_PERMISSIONS.wallet_snap(snap, {
          'npm:foo': {
            version: 'bar',
          },
        }),
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "description": Object {
              "id": "9O1O0j",
              "message": "Allow the Snap to interact with {snapId}.",
              "values": Object {
                "snapId": "npm:foo",
              },
            },
            "icon": Object {
              "$$typeof": Symbol(react.forward_ref),
              "render": [Function],
            },
            "label": Object {
              "id": "dfKmiM",
              "message": "Connect to {snapId}",
              "values": Object {
                "snapId": "npm:foo",
              },
            },
            "weight": 4,
          },
        ]
      `);
    });
  });
});

describe('getPermissions', () => {
  it('returns a list of permissions for a Snap', () => {
    const { snap } = getMockSnap({
      permissions: {
        /* eslint-disable @typescript-eslint/naming-convention */
        snap_manageState: {},
        snap_getBip32PublicKey: [
          {
            path: ['m', `44'`, `1'`],
            curve: 'secp256k1',
          },
        ],
        /* eslint-enable @typescript-eslint/naming-convention */
      },
    });

    expect(getPermissions(snap, snap.permissions)).toMatchInlineSnapshot(`
      Array [
        Object {
          "description": Object {
            "id": "rh23nf",
            "message": "Allow {name} to view your public keys (and addresses) for $1. This does not grant any control of accounts or assets.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "P4MCkP",
            "message": "View your public key for {name}",
            "values": Object {
              "name": "Testnet (all coins)",
            },
          },
          "weight": 2,
        },
        Object {
          "description": Object {
            "id": "3cLsND",
            "message": "Allow {name} to store, update, and retrieve data securely with encryption. Other Snaps cannot access this information.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "4FCCdL",
            "message": "Store and manage its data on your device",
          },
          "weight": 4,
        },
      ]
    `);
  });

  it('ignores unknown permissions', () => {
    const { snap } = getMockSnap({
      permissions: {
        /* eslint-disable @typescript-eslint/naming-convention */
        snap_manageState: {},
        // @ts-expect-error - Testing an invalid permission.
        snap_foo: {},
        /* eslint-enable @typescript-eslint/naming-convention */
      },
    });

    expect(getPermissions(snap, snap.permissions)).toMatchInlineSnapshot(`
      Array [
        Object {
          "description": Object {
            "id": "3cLsND",
            "message": "Allow {name} to store, update, and retrieve data securely with encryption. Other Snaps cannot access this information.",
            "values": Object {
              "name": "Snap",
            },
          },
          "icon": Object {
            "$$typeof": Symbol(react.forward_ref),
            "render": [Function],
          },
          "label": Object {
            "id": "4FCCdL",
            "message": "Store and manage its data on your device",
          },
          "weight": 4,
        },
      ]
    `);
  });
});
