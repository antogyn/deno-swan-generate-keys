import { encode } from "https://deno.land/std@0.165.0/encoding/base64.ts";

async function generateKeys() {
  const { privateKey, publicKey } = await crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"]
  );

  console.log("Private key (jwk)");
  console.log(await crypto.subtle.exportKey("jwk", privateKey));

  console.log("Public key (jwk)");
  console.log(await crypto.subtle.exportKey("jwk", publicKey));

  console.log("Private key (PEM, pkcs8)");
  console.log(await exportCryptoKeyPem(privateKey));
}

async function exportCryptoKeyPem(key: CryptoKey) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  const exportedAsString = String.fromCharCode(...new Uint8Array(exported));
  const exportedAsBase64 = encode(exportedAsString);
  const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
  return pemExported;
}

generateKeys();
