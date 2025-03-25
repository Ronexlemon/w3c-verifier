import { JwtCredentialPayload } from "did-jwt-vc";
import { DID_WEB } from "../DID:WEB/did_web";


const signCredential =async(key:string,did:string,payload:JwtCredentialPayload):Promise<string>=>{
    const didWeb = new DID_WEB({key:key,did:did});
    const credential = await didWeb.signCredential(payload);
    return credential;
}

const signPresentation =async(key:string,did:string,vcjwt:string):Promise<string>=>{
    const didWeb = new DID_WEB({key:key,did:did});
    const presentation = await didWeb.signPresentation(vcjwt);
    return presentation;
}

const verifyPresentation =async(did:string,vpjwt:string)=>{
    const didWeb = new DID_WEB({did:did});
    const presentation = await didWeb.verifyPresentation(vpjwt);
    return presentation;
}

const verifyCredential =async(did:string,vcjwt:string)=>{
    const didWeb = new DID_WEB({did:did});
    const credential = await didWeb.verifyPresentation(vcjwt);
    return credential;
}


export {signCredential,signPresentation,verifyCredential,verifyPresentation}