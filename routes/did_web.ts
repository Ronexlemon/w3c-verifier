import express  from "express";
const router = express.Router();
import { signVerificationCredential,signPresentationUser,verifyPresentationInstitution,verifyCredentialInstitution } from "../controller/did_controller";


router.post("/create",signVerificationCredential);
router.post("/createPresentation",signPresentationUser);
router.post("/verifyPresentation",verifyPresentationInstitution);
router.post("/verifyCredential",verifyCredentialInstitution);
export  default router