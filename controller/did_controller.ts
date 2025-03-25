import asyncHandler from "express-async-handler";
import { Request,Response } from "express";
import { signCredential,signPresentation,verifyCredential,verifyPresentation } from "../service/did_web";
import { sign } from "crypto";
interface VerifiableCredential {
    sub: string; // Subject DID (e.g., "did:web:ronex-ondimu.vercel.app")
    nbf: number; // Not Before timestamp
    exp: number; // Expiration timestamp
    vc: VC; // Verifiable Credential object
  }
  
  interface VC {
    '@context': string[]; // List of contexts
    type: string[]; // List of types (e.g., "VerifiableCredential")
    credentialSubject: CredentialSubject; // The main content of the VC
    proof: Proof; // Proof object containing signature and verification info
  }
  
  interface CredentialSubject {
    identity: Identity;
    degree: Degree;
    contact: Contact;
    image: string; // Base64 encoded image
  }
  
  interface Identity {
    fullName: string;
    birthDate: string;
    nationality: string;
    student_id: string;
  }
  
  interface Degree {
    type: string; // Degree type (e.g., "BachelorDegree")
    name: string; // Degree name (e.g., "Baccalauréat en musiques numériques")
  }
  
  interface Contact {
    email: string;
    phone: string;
  }
  
  interface Proof {
    type: string; // Proof type (e.g., "JsonWebKey2020")
    created: string; // Timestamp of the proof creation
    verificationMethod: string; // DID URL (e.g., "did:web:ronex-ondimu.vercel.app#owner")
    proofPurpose: string; // Purpose of the proof (e.g., "assertionMethod")
    jws: string; // JSON Web Signature (the actual signed value)
  }
  

const signVerificationCredential = asyncHandler(async(req:Request,res:Response)=>{
    const {payload,key} = req.body as {payload:VerifiableCredential,key:string};
    
    const did = 'did:web:ronex-ondimu.vercel.app';
    try{
        const credential = await signCredential(key,did,payload)
        res.status(200).json({credential});


    }catch(err:any){
        console.log(err)
        res.status(400).json({message:"Error signing credential"})
        return
    }
    

})

const signPresentationUser =  asyncHandler(async(req:Request,res:Response)=>{
    const {vcjwt, key} = req.body as {vcjwt:string, key:string};
    const did = 'did:web:ronex-ondimu.vercel.app';
    try{
        const presentation = await signPresentation(key,did,vcjwt)
        res.status(200).json({presentation});
        return

    }catch(err:any){
        console.log(err)
        res.status(400).json({message:"Error signing presentation"})
        return
    }
})
//verify presentation
const verifyPresentationInstitution = asyncHandler(async(req:Request,res:Response)=>{
    const {vpjwt, key} = req.body as {vpjwt:string, key:string};
    const did = 'did:web:ronex-ondimu.vercel.app';
    try{
        const result = await verifyPresentation(did,vpjwt)
        res.status(200).json({result});
        return
    }catch(err:any){
        console.log(err)
        res.status(400).json({message:"Error verifying presentation"})
        return
    }})
    const verifyCredentialInstitution = asyncHandler(async(req:Request,res:Response)=>{
        const {vcjwt, key} = req.body as {vcjwt:string, key:string};
        const did = 'did:web:ronex-ondimu.vercel.app';
        try{
            const result = await verifyCredential(did,vcjwt)
            res.status(200).json({result});
            return
        }catch(err:any){
            console.log(err)
            res.status(400).json({message:"Error verifying credential"})
            return
        }})

export {signVerificationCredential,signPresentationUser,verifyPresentationInstitution,verifyCredentialInstitution}