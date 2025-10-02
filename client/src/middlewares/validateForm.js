import { ZodError } from "zod";

export const validateForms = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: error.issues.map((err) => ({
                    campo: err.path[0],
                    message: err.message
                }))
            })
        }
    }
}