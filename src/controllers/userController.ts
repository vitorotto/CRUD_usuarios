import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

//função para criar novo usuário 
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, pass, admin } = req.body;
        // Verificar se já existe um usuário com o mesmo email
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe com este email" });
        }
        // Criar novo usuário
        await prisma.user.create({
            data: {
                name,
                email,
                pass,
                admin: admin || false // Default to false if not provided
            }
        });
        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar usuário" });
    }

}

// função para listar todos os usuários
export const listUsers = async (req: Request, res: Response) => {
    try {
        let users: Array<User> = [];

        if (req.query) {
            users = await prisma.user.findMany({
                where: {
                    name: req.query.name ? String(req.query.name) : undefined,
                    email: req.query.email ? String(req.query.email) : undefined
                }
            });
        } else {
            users = await prisma.user.findMany();
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar usuários" });
    }
}

// Função para editar usuários
export const editUsers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, pass, admin } = req.body;

        // Verificar se o usuário existe
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Atualizar usuário
        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                pass,
                admin
            }
        });

        res.status(201).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
}

// Função para deletar usuário
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // verificar se o usuário existe
        const user = prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        //deletar usuario
        await prisma.user.delete({
            where: { id }
        });

        res.status(200).json({ user: user, message: "Usuário deletado com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar usuário" });
    }
}

// Types
interface User {
    id: string;
    name: string | null;
    email: string;
    pass: string | null;
    admin: boolean;
}