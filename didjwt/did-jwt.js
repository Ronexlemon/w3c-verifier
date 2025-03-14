import { createJWT, verifyJWT, ES256KSigner, hexToBytes, decodeJWT } from 'did-jwt';
import { Resolver } from 'did-resolver'
import { getResolver } from 'web-did-resolver'

// Create a singer by using a private key (hex).
const key ='e9e2d59a8cdd45b3d455309e68b4433f1b6cf4d6b3dbba34bdbf9b855e5be07e' //'8eb63d435de4d634bc5f3df79c361e9233f55c9c2fca097758eefb018c4c61df';
const signer = ES256KSigner(hexToBytes(key))

// Create a signed JWT
const jwt = await createJWT(
  { aud: 'did:web:ronex-ondimu.vercel.app', name: 'Bob Smith' },
  { issuer: 'did:web:ronex-ondimu.vercel.app', signer },
  { alg: 'ES256K' }
)

console.log(`//// JWT:\n${jwt}`)

// Decode the JWT
const decoded = decodeJWT(jwt)
console.log('\n//// JWT Decoded:\n',decoded)

// Verify the JWT by resolving its DID:WEB
const webResolver = getResolver()
const resolver = new Resolver({
  ...webResolver
})

verifyJWT(jwt, {
  resolver,
  audience: 'did:web:ronex-ondimu.vercel.app'
}).then(({ payload, doc, did, signer, jwt }) => {
  console.log('\n//// Verified:\n', payload)
})