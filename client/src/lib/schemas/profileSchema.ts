import z, { string } from "zod";
import { requiredString } from "../util/util";

export const profileSchema = z.object({
    displayName: requiredString('displayName').min(3),
    bio:string().optional()
})

export type ProfileSchema = z.infer<typeof profileSchema>;