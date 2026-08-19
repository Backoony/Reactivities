import { format, type DateArg } from "date-fns";
import { z } from "zod";

export function formatDate(date : DateArg<Date>) {
    return format(date,'dd MMM yyyy h:mm a');
}

export const requiredString = (fieldName: string) => z
    .string({ required_error: `${fieldName}Title is required` })
    // .min(1, { message: `${fieldName}Title is required` })