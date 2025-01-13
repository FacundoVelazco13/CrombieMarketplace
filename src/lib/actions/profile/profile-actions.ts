import { prisma } from "@/prisma/prisma";
import { User } from "next-auth";

export async function checkProfile(user: User) {
    if (!user) return null;

    let profile = null;

    const userDB = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (!userDB) return profile;

    profile = await prisma.profile.findUnique({
        where: {
            userId: userDB.id,
        },
    });

    if (!profile) profile = await generateProfileFromUser(userDB);

    return profile;
}
//Metodo poco practico para generar un profile a un usuario.
export async function generateProfileFromUser(user: User) {
    if (!user) return null;
    const profile = await prisma.profile.create({
        data: {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
    });
    return profile;
}