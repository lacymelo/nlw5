import 'reflect-metadata'
import express, { Request, Response, NextFunction, json } from "express"
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import path from "path"
import "express-async-errors"
import "./database"

import { routes } from "./routes"

const app = express()

//para utilizar o html dentro do projeto
app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (req, res) => {
    return res.render("html/client.html")
})

const http = createServer(app) //Criando protocolo http
const io = new Server(http) //Criando protocolo ws

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id)
})

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

export { http, io }