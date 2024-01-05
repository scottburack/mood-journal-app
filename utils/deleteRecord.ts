const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const deletedUser = await prisma.user.delete({
        where: { email: 'scott@publicgoods.com' },
    });
    console.log('Deleted user:', deletedUser);
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });