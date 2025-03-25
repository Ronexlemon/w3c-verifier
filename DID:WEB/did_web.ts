import { ES256KSigner, hexToBytes, Signer } from 'did-jwt';
import { createVerifiableCredentialJwt, createVerifiablePresentationJwt, JwtCredentialPayload, PresentationPayload, VerifiableCredential, verifyCredential, verifyPresentation } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'web-did-resolver';

interface Issuer {
    did: string;  
    signer: Signer;  
}
const key ='e9e2d59a8cdd45b3d455309e68b4433f1b6cf4d6b3dbba34bdbf9b855e5be07e' //'8eb63d435de4d634bc5f3df79c361e9233f55c9c2fca097758eefb018c4c61df';
const signer = ES256KSigner(hexToBytes(key))

// Prepare an issuer
const iissuer = {
    did: 'did:web:ronex-ondimu.vercel.app',
    signer: signer
}

class DID_WEB {
    public key?: string;
    public issuer?: Issuer;
    private resolver: Resolver;


    constructor({ did, key }: { did: string; key?: string }) {
        this.key = key;
        
        if (did && key) {
            this.issuer = {
                did: did,
                signer: ES256KSigner(hexToBytes(key)), 
            };
        }
        // Create a resolver
        this.resolver = new Resolver({
            ...getResolver(),
        });
    }

    // The issue signs a verifiable doc
    signCredential = async (payload: JwtCredentialPayload): Promise<string> => {
        if (!this.issuer?.signer) {
            throw new Error("Issuer signer is not defined.");
        }
        return await createVerifiableCredentialJwt(payload, iissuer);
    };

    // Method to sign a Verifiable Presentation (VP)
    signPresentation = async (vcJwt: string): Promise<string> => {
        if (!this.issuer?.signer) {
            throw new Error("Issuer signer is not defined.");
        }
        const vpPayload = {
            vp: {
                verifiableCredential: [vcJwt],
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiablePresentation'],
            },
        };
        return await createVerifiablePresentationJwt(vpPayload, iissuer);
    };

    // Method to verify a Verifiable Credential (VC)
    verifyCredential = async (vcJwt: string) => {
        return await verifyCredential(vcJwt, this.resolver);
    };

    // Method to verify a Verifiable Presentation (VP)
    verifyPresentation = async (vpJwt: string) => {
        return await verifyPresentation(vpJwt, this.resolver);
    };
}

export { DID_WEB };
