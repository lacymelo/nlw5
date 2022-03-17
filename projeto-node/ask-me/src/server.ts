import 'reflect-metadata'
import express, { Request, Response, NextFunction, json } from "express"
import "express-async-errors"
import "./database"

import { routes } from "./routes"

const app = express()

//para aceitar requisições com json como entrada
app.use(express.json())

//exportando rotas
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3000, () => console.log("Server is running."))